import { copyText, escapeHtml, getElement } from './shared';

type DiffOp = { type: 'equal' | 'insert' | 'delete'; value: string };

type LineDiffRow =
  | { kind: 'equal'; left: string; right: string }
  | { kind: 'insert'; right: string }
  | { kind: 'delete'; left: string }
  | { kind: 'replace'; left: string; right: string };

export function mountDiffChecker(root: HTMLElement): void {
  root.innerHTML = `
    <div class="tool-layout">
      <section class="panel">
        <div class="panel-head">
          <h2>Input text</h2>
          <div class="panel-actions">
            <button class="button button-ghost" data-example>Load Sample</button>
            <button class="button button-ghost" data-clear>Reset</button>
            <button class="button button-ghost" data-copy-left>Copy Left</button>
            <button class="button button-ghost" data-copy-right>Copy Right</button>
          </div>
        </div>
        <div class="diff-input-grid">
          <label class="field">
            <span>Left text</span>
            <textarea class="input-area diff-input" data-left spellcheck="false" placeholder="Original text"></textarea>
          </label>
          <label class="field">
            <span>Right text</span>
            <textarea class="input-area diff-input" data-right spellcheck="false" placeholder="Updated text"></textarea>
          </label>
        </div>
      </section>
      <section class="panel">
        <div class="panel-head">
          <h2>Diff result</h2>
          <button class="button button-ghost" data-copy-result>Copy Result</button>
        </div>
        <p class="status-message" data-status>Paste text on both sides to compare.</p>
        <div class="diff-result" data-result></div>
      </section>
    </div>
  `;

  const left = getElement<HTMLTextAreaElement>(root, '[data-left]');
  const right = getElement<HTMLTextAreaElement>(root, '[data-right]');
  const status = getElement<HTMLElement>(root, '[data-status]');
  const result = getElement<HTMLElement>(root, '[data-result]');
  const copyLeft = getElement<HTMLButtonElement>(root, '[data-copy-left]');
  const copyRight = getElement<HTMLButtonElement>(root, '[data-copy-right]');
  const copyResult = getElement<HTMLButtonElement>(root, '[data-copy-result]');
  let latestReport = '';
  let debounceTimer = 0;

  const sync = (): void => {
    const leftText = left.value;
    const rightText = right.value;

    if (!leftText && !rightText) {
      result.innerHTML = '<p class="empty-copy">Paste text on both sides to compare.</p>';
      status.textContent = 'Paste text on both sides to compare.';
      status.className = 'status-message';
      latestReport = '';
      return;
    }

    const rows = buildLineDiffRows(splitLines(leftText), splitLines(rightText));
    const changedRows = rows.filter((row) => row.kind !== 'equal').length;

    if (changedRows === 0) {
      result.innerHTML = '<p class="empty-copy">No differences found.</p>';
      status.textContent = 'No differences found.';
      status.className = 'status-message status-success';
      latestReport = 'No differences found.';
      return;
    }

    result.innerHTML = rows.map(renderDiffRow).join('');
    status.textContent = `${changedRows} changed line${changedRows === 1 ? '' : 's'} found.`;
    status.className = 'status-message status-success';
    latestReport = renderDiffReport(rows);
  };

  const scheduleSync = (): void => {
    const lineCount = Math.max(splitLines(left.value).length, splitLines(right.value).length);
    const delay = lineCount > 400 ? 180 : 0;
    window.clearTimeout(debounceTimer);
    debounceTimer = window.setTimeout(sync, delay);
  };

  left.addEventListener('input', scheduleSync);
  right.addEventListener('input', scheduleSync);
  getElement<HTMLButtonElement>(root, '[data-example]').addEventListener('click', () => {
    left.value = `name: developer-tools
version: 1.0.0
features:
  - json-formatter
  - regex-tester
  - unix-timestamp-converter`;
    right.value = `name: developer-tools
version: 1.1.0
features:
  - json-formatter
  - diff-checker
  - regex-tester
  - unix-timestamp-converter`;
    sync();
  });
  getElement<HTMLButtonElement>(root, '[data-clear]').addEventListener('click', () => {
    left.value = '';
    right.value = '';
    sync();
  });
  copyLeft.addEventListener('click', async () => copyText(left.value, copyLeft));
  copyRight.addEventListener('click', async () => copyText(right.value, copyRight));
  copyResult.addEventListener('click', async () => copyText(latestReport, copyResult));

  sync();
}

function splitLines(value: string): string[] {
  return value.replace(/\r\n/g, '\n').split('\n');
}

function buildLineDiffRows(left: string[], right: string[]): LineDiffRow[] {
  const ops = diffSequence(left, right);
  const rows: LineDiffRow[] = [];

  for (let index = 0; index < ops.length; index += 1) {
    const current = ops[index];
    const next = ops[index + 1];

    if (current.type === 'delete' && next?.type === 'insert') {
      rows.push({ kind: 'replace', left: current.value, right: next.value });
      index += 1;
      continue;
    }

    if (current.type === 'insert' && next?.type === 'delete') {
      rows.push({ kind: 'replace', left: next.value, right: current.value });
      index += 1;
      continue;
    }

    if (current.type === 'equal') {
      rows.push({ kind: 'equal', left: current.value, right: current.value });
    } else if (current.type === 'delete') {
      rows.push({ kind: 'delete', left: current.value });
    } else {
      rows.push({ kind: 'insert', right: current.value });
    }
  }

  return rows;
}

function diffSequence(left: string[], right: string[]): DiffOp[] {
  const leftLength = left.length;
  const rightLength = right.length;
  const table = Array.from({ length: leftLength + 1 }, () => Array<number>(rightLength + 1).fill(0));

  for (let i = leftLength - 1; i >= 0; i -= 1) {
    for (let j = rightLength - 1; j >= 0; j -= 1) {
      table[i][j] =
        left[i] === right[j] ? table[i + 1][j + 1] + 1 : Math.max(table[i + 1][j], table[i][j + 1]);
    }
  }

  const ops: DiffOp[] = [];
  let i = 0;
  let j = 0;

  while (i < leftLength && j < rightLength) {
    if (left[i] === right[j]) {
      ops.push({ type: 'equal', value: left[i] });
      i += 1;
      j += 1;
      continue;
    }

    if (table[i + 1][j] >= table[i][j + 1]) {
      ops.push({ type: 'delete', value: left[i] });
      i += 1;
    } else {
      ops.push({ type: 'insert', value: right[j] });
      j += 1;
    }
  }

  while (i < leftLength) {
    ops.push({ type: 'delete', value: left[i] });
    i += 1;
  }

  while (j < rightLength) {
    ops.push({ type: 'insert', value: right[j] });
    j += 1;
  }

  return ops;
}

function renderDiffRow(row: LineDiffRow): string {
  if (row.kind === 'equal') {
    return `
      <div class="diff-row">
        <div class="diff-cell">${visualizeWhitespace(escapeHtml(row.left))}</div>
        <div class="diff-cell">${visualizeWhitespace(escapeHtml(row.right))}</div>
      </div>
    `;
  }

  if (row.kind === 'delete') {
    return `
      <div class="diff-row">
        <div class="diff-cell diff-cell-delete">${visualizeWhitespace(escapeHtml(row.left))}</div>
        <div class="diff-cell diff-cell-empty">∅</div>
      </div>
    `;
  }

  if (row.kind === 'insert') {
    return `
      <div class="diff-row">
        <div class="diff-cell diff-cell-empty">∅</div>
        <div class="diff-cell diff-cell-insert">${visualizeWhitespace(escapeHtml(row.right))}</div>
      </div>
    `;
  }

  const charDiff = diffChars(row.left, row.right);
  const leftParts = charDiff
    .filter((part) => part.type !== 'insert')
    .map((part) =>
      part.type === 'delete'
        ? `<mark class="diff-char-delete">${visualizeWhitespace(escapeHtml(part.value))}</mark>`
        : visualizeWhitespace(escapeHtml(part.value)),
    )
    .join('');
  const rightParts = charDiff
    .filter((part) => part.type !== 'delete')
    .map((part) =>
      part.type === 'insert'
        ? `<mark class="diff-char-insert">${visualizeWhitespace(escapeHtml(part.value))}</mark>`
        : visualizeWhitespace(escapeHtml(part.value)),
    )
    .join('');

  return `
    <div class="diff-row">
      <div class="diff-cell diff-cell-delete">${leftParts || '&nbsp;'}</div>
      <div class="diff-cell diff-cell-insert">${rightParts || '&nbsp;'}</div>
    </div>
  `;
}

function diffChars(left: string, right: string): DiffOp[] {
  return diffSequence(Array.from(left), Array.from(right));
}

function visualizeWhitespace(value: string): string {
  return value.replaceAll(' ', '<span class="ws-marker">·</span>').replaceAll('\t', '<span class="ws-marker">→</span>');
}

function renderDiffReport(rows: LineDiffRow[]): string {
  return rows
    .filter((row) => row.kind !== 'equal')
    .map((row) => {
      if (row.kind === 'delete') {
        return `- ${row.left}`;
      }
      if (row.kind === 'insert') {
        return `+ ${row.right}`;
      }
      return `- ${row.left}\n+ ${row.right}`;
    })
    .join('\n');
}

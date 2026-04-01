import { clampNumber, copyText, generateUlid, getElement } from './shared';

export function mountIdGenerator(root: HTMLElement): void {
  root.innerHTML = `
    <div class="tool-layout">
      <section class="panel">
        <div class="panel-head">
          <h2>Generator</h2>
          <div class="panel-actions">
            <button class="button button-ghost" data-generate>Generate</button>
            <button class="button button-ghost" data-clear>Reset</button>
          </div>
        </div>
        <label class="field">
          <span>Identifier type</span>
          <select class="select" data-kind>
            <option value="uuid">UUID v4</option>
            <option value="ulid">ULID</option>
          </select>
        </label>
        <label class="field">
          <span>Count</span>
          <input class="text-input" data-count type="number" min="1" max="20" value="5" />
        </label>
      </section>
      <section class="panel">
        <div class="panel-head">
          <h2>Generated values</h2>
          <button class="button button-ghost" data-copy>Copy All</button>
        </div>
        <p class="status-message" data-status>Choose the type and generate a batch.</p>
        <ol class="generated-list" data-output></ol>
      </section>
    </div>
  `;

  const kind = getElement<HTMLSelectElement>(root, '[data-kind]');
  const count = getElement<HTMLInputElement>(root, '[data-count]');
  const output = getElement<HTMLOListElement>(root, '[data-output]');
  const status = getElement<HTMLElement>(root, '[data-status]');
  const copyButton = getElement<HTMLButtonElement>(root, '[data-copy]');

  const render = (): string[] => {
    const batchSize = clampNumber(Number(count.value), 1, 20);
    count.value = String(batchSize);
    const items = Array.from({ length: batchSize }, () =>
      kind.value === 'ulid' ? generateUlid() : crypto.randomUUID(),
    );
    output.innerHTML = items
      .map(
        (item) => `
          <li>
            <code>${item}</code>
            <button class="button button-ghost button-tiny" data-copy-one="${item}">Copy</button>
          </li>
        `,
      )
      .join('');
    status.textContent = `${items.length} ${kind.value === 'ulid' ? 'ULID values' : 'UUID values'} generated.`;
    status.className = 'status-message status-success';
    output.querySelectorAll<HTMLButtonElement>('[data-copy-one]').forEach((button) => {
      button.addEventListener('click', async () => {
        await copyText(button.dataset.copyOne ?? '', button);
      });
    });
    return items;
  };

  let current = render();

  getElement<HTMLButtonElement>(root, '[data-generate]').addEventListener('click', () => {
    current = render();
  });
  getElement<HTMLButtonElement>(root, '[data-clear]').addEventListener('click', () => {
    output.innerHTML = '';
    status.textContent = 'Choose the type and generate a batch.';
    status.className = 'status-message';
    current = [];
  });
  copyButton.addEventListener('click', async () => {
    await copyText(current.join('\n'), copyButton);
  });
}

import { base64ToUtf8, copyText, getElement, utf8ToBase64 } from './shared';

export function mountBase64Tool(root: HTMLElement): void {
  root.innerHTML = `
    <div class="tool-layout">
      <section class="panel">
        <div class="panel-head">
          <h2>Input</h2>
          <div class="panel-actions">
            <button class="button button-ghost" data-swap>Swap mode</button>
            <button class="button button-ghost" data-example>Example</button>
            <button class="button button-ghost" data-clear>Reset</button>
          </div>
        </div>
        <div class="segmented">
          <button class="segment is-active" data-mode="encode">Encode</button>
          <button class="segment" data-mode="decode">Decode</button>
        </div>
        <textarea class="input-area" data-input spellcheck="false" placeholder="Enter plain text or Base64"></textarea>
      </section>
      <section class="panel">
        <div class="panel-head">
          <h2>Output</h2>
          <button class="button button-ghost" data-copy>Copy Output</button>
        </div>
        <p class="status-message" data-status>Choose a mode and paste a value to convert it.</p>
        <textarea class="output-box" data-output readonly></textarea>
      </section>
    </div>
  `;

  const input = getElement<HTMLTextAreaElement>(root, '[data-input]');
  const output = getElement<HTMLTextAreaElement>(root, '[data-output]');
  const status = getElement<HTMLElement>(root, '[data-status]');
  const copyButton = getElement<HTMLButtonElement>(root, '[data-copy]');
  const modeButtons = Array.from(root.querySelectorAll<HTMLButtonElement>('[data-mode]'));
  let mode: 'encode' | 'decode' = 'encode';

  const sync = (): void => {
    const raw = input.value;

    if (!raw) {
      output.value = '';
      status.textContent = 'Choose a mode and paste a value to convert it.';
      status.className = 'status-message';
      return;
    }

    try {
      output.value = mode === 'encode' ? utf8ToBase64(raw) : base64ToUtf8(raw.trim());
      status.textContent =
        mode === 'encode' ? 'Text encoded as Base64.' : 'Base64 decoded as UTF-8 text.';
      status.className = 'status-message status-success';
    } catch (error) {
      output.value = '';
      status.textContent = error instanceof Error ? error.message : 'Unable to convert this value.';
      status.className = 'status-message status-error';
    }
  };

  input.addEventListener('input', sync);
  getElement<HTMLButtonElement>(root, '[data-example]').addEventListener('click', () => {
    input.value = mode === 'encode' ? 'Seoul -> 서울 -> 개발자 도구' : utf8ToBase64('Seoul -> 서울 -> 개발자 도구');
    sync();
  });
  getElement<HTMLButtonElement>(root, '[data-clear]').addEventListener('click', () => {
    input.value = '';
    output.value = '';
    sync();
  });
  getElement<HTMLButtonElement>(root, '[data-swap]').addEventListener('click', () => {
    mode = mode === 'encode' ? 'decode' : 'encode';
    modeButtons.forEach((button) => {
      button.classList.toggle('is-active', button.dataset.mode === mode);
    });
    input.value = output.value || input.value;
    sync();
  });
  copyButton.addEventListener('click', async () => {
    await copyText(output.value, copyButton);
  });
  modeButtons.forEach((button) => {
    button.addEventListener('click', () => {
      mode = button.dataset.mode === 'decode' ? 'decode' : 'encode';
      modeButtons.forEach((candidate) => {
        candidate.classList.toggle('is-active', candidate === button);
      });
      sync();
    });
  });
}

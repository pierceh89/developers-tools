import { base64UrlDecode, copyText, getElement, renderClaimItems } from './shared';

export function mountJwtDecoder(root: HTMLElement): void {
  root.innerHTML = `
    <div class="tool-layout">
      <section class="panel">
        <div class="panel-head">
          <h2>JWT</h2>
          <div class="panel-actions">
            <button class="button button-ghost" data-example>Example</button>
            <button class="button button-ghost" data-clear>Reset</button>
          </div>
        </div>
        <textarea class="input-area" data-input spellcheck="false" placeholder="Paste a JWT token"></textarea>
        <p class="notice">Decode and inspect only. Signature verification is out of scope for this page.</p>
      </section>
      <section class="panel">
        <div class="panel-head">
          <h2>Decoded output</h2>
          <button class="button button-ghost" data-copy>Copy Payload</button>
        </div>
        <p class="status-message" data-status>Paste a standard three-part JWT to inspect it.</p>
        <div class="stack">
          <div class="mini-panel">
            <h3>Header</h3>
            <pre class="output-area" data-header></pre>
          </div>
          <div class="mini-panel">
            <h3>Payload</h3>
            <pre class="output-area" data-payload></pre>
          </div>
          <div class="mini-panel">
            <h3>Signature</h3>
            <pre class="output-area" data-signature></pre>
          </div>
          <div class="mini-panel">
            <h3>Time claims</h3>
            <dl class="claim-list" data-claims></dl>
          </div>
        </div>
      </section>
    </div>
  `;

  const input = getElement<HTMLTextAreaElement>(root, '[data-input]');
  const status = getElement<HTMLElement>(root, '[data-status]');
  const header = getElement<HTMLElement>(root, '[data-header]');
  const payload = getElement<HTMLElement>(root, '[data-payload]');
  const signature = getElement<HTMLElement>(root, '[data-signature]');
  const claims = getElement<HTMLElement>(root, '[data-claims]');
  const copyButton = getElement<HTMLButtonElement>(root, '[data-copy]');
  const example =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkF2ZXJ5IFN0b25lIiwiaWF0IjoxNzA0MDY3MjAwLCJleHAiOjE3MDQwNzA4MDB9.signature';

  const sync = (): void => {
    const token = input.value.trim();
    header.textContent = '';
    payload.textContent = '';
    signature.textContent = '';
    claims.innerHTML = '';

    if (!token) {
      status.textContent = 'Paste a standard three-part JWT to inspect it.';
      status.className = 'status-message';
      return;
    }

    try {
      const parts = token.split('.');
      if (parts.length !== 3) {
        throw new Error('A JWT must contain exactly three dot-separated parts.');
      }

      const decodedHeader = JSON.parse(base64UrlDecode(parts[0]));
      const decodedPayload = JSON.parse(base64UrlDecode(parts[1]));
      header.textContent = JSON.stringify(decodedHeader, null, 2);
      payload.textContent = JSON.stringify(decodedPayload, null, 2);
      signature.textContent = parts[2] || '(empty signature segment)';
      claims.innerHTML = renderClaimItems(decodedPayload);
      status.textContent = 'JWT decoded successfully. Remember: the signature is not verified here.';
      status.className = 'status-message status-success';
    } catch (error) {
      status.textContent = error instanceof Error ? error.message : 'Invalid JWT.';
      status.className = 'status-message status-error';
    }
  };

  input.addEventListener('input', sync);
  getElement<HTMLButtonElement>(root, '[data-example]').addEventListener('click', () => {
    input.value = example;
    sync();
  });
  getElement<HTMLButtonElement>(root, '[data-clear]').addEventListener('click', () => {
    input.value = '';
    sync();
  });
  copyButton.addEventListener('click', async () => {
    await copyText(payload.textContent ?? '', copyButton);
  });
}

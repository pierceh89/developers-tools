import { copyText, formatDate, getElement, toDatetimeLocalValue } from './shared';

export function mountTimestampTool(root: HTMLElement): void {
  root.innerHTML = `
    <div class="tool-layout">
      <section class="panel">
        <div class="panel-head">
          <h2>Timestamp to date</h2>
          <div class="panel-actions">
            <button class="button button-ghost" data-now>Use current time</button>
            <button class="button button-ghost" data-clear>Reset</button>
          </div>
        </div>
        <label class="field">
          <span>Unix timestamp</span>
          <input class="text-input" data-timestamp type="text" inputmode="numeric" placeholder="1711845600" />
        </label>
        <label class="checkbox">
          <input data-utc type="checkbox" />
          <span>Display results in UTC</span>
        </label>
        <div class="stack">
          <div class="mini-panel">
            <h3>Readable date</h3>
            <p class="output-copy" data-readable></p>
          </div>
          <div class="mini-panel">
            <h3>Detected input</h3>
            <p class="output-copy" data-detected></p>
          </div>
        </div>
      </section>
      <section class="panel">
        <div class="panel-head">
          <h2>Date to timestamp</h2>
          <button class="button button-ghost" data-copy>Copy seconds</button>
        </div>
        <label class="field">
          <span>Date and time</span>
          <input class="text-input" data-datetime type="datetime-local" />
        </label>
        <p class="status-message" data-status>Use either side. The values update in place.</p>
        <div class="stack">
          <div class="mini-panel">
            <h3>Unix seconds</h3>
            <p class="output-copy" data-seconds></p>
          </div>
          <div class="mini-panel">
            <h3>Unix milliseconds</h3>
            <p class="output-copy" data-milliseconds></p>
          </div>
        </div>
      </section>
    </div>
  `;

  const timestampInput = getElement<HTMLInputElement>(root, '[data-timestamp]');
  const datetimeInput = getElement<HTMLInputElement>(root, '[data-datetime]');
  const utcToggle = getElement<HTMLInputElement>(root, '[data-utc]');
  const readable = getElement<HTMLElement>(root, '[data-readable]');
  const detected = getElement<HTMLElement>(root, '[data-detected]');
  const seconds = getElement<HTMLElement>(root, '[data-seconds]');
  const milliseconds = getElement<HTMLElement>(root, '[data-milliseconds]');
  const status = getElement<HTMLElement>(root, '[data-status]');
  const copyButton = getElement<HTMLButtonElement>(root, '[data-copy]');

  const updateFromTimestamp = (): void => {
    const raw = timestampInput.value.trim();
    if (!raw) {
      readable.textContent = '';
      detected.textContent = '';
      seconds.textContent = '';
      milliseconds.textContent = '';
      status.textContent = 'Use either side. The values update in place.';
      status.className = 'status-message';
      return;
    }

    try {
      if (!/^-?\d+$/.test(raw)) {
        throw new Error('Timestamp input must be an integer.');
      }

      const timestamp = Number(raw);
      const useMilliseconds = raw.length > 10;
      const date = new Date(useMilliseconds ? timestamp : timestamp * 1000);

      if (Number.isNaN(date.getTime())) {
        throw new Error('Timestamp is out of range.');
      }

      readable.textContent = formatDate(date, utcToggle.checked);
      detected.textContent = useMilliseconds ? 'Milliseconds input detected' : 'Seconds input detected';
      seconds.textContent = String(Math.floor(date.getTime() / 1000));
      milliseconds.textContent = String(date.getTime());
      datetimeInput.value = toDatetimeLocalValue(date);
      status.textContent = 'Timestamp converted successfully.';
      status.className = 'status-message status-success';
    } catch (error) {
      readable.textContent = '';
      detected.textContent = '';
      seconds.textContent = '';
      milliseconds.textContent = '';
      status.textContent = error instanceof Error ? error.message : 'Unable to parse the timestamp.';
      status.className = 'status-message status-error';
    }
  };

  const updateFromDatetime = (): void => {
    const raw = datetimeInput.value;
    if (!raw) {
      status.textContent = 'Use either side. The values update in place.';
      status.className = 'status-message';
      return;
    }

    const date = new Date(raw);
    if (Number.isNaN(date.getTime())) {
      status.textContent = 'Please provide a valid date and time.';
      status.className = 'status-message status-error';
      return;
    }

    timestampInput.value = String(Math.floor(date.getTime() / 1000));
    readable.textContent = formatDate(date, utcToggle.checked);
    detected.textContent = 'Date input converted';
    seconds.textContent = String(Math.floor(date.getTime() / 1000));
    milliseconds.textContent = String(date.getTime());
    status.textContent = 'Date converted to Unix time successfully.';
    status.className = 'status-message status-success';
  };

  timestampInput.addEventListener('input', updateFromTimestamp);
  datetimeInput.addEventListener('input', updateFromDatetime);
  utcToggle.addEventListener('change', () => {
    if (timestampInput.value.trim()) {
      updateFromTimestamp();
      return;
    }
    if (datetimeInput.value) {
      updateFromDatetime();
    }
  });
  getElement<HTMLButtonElement>(root, '[data-now]').addEventListener('click', () => {
    const now = new Date();
    timestampInput.value = String(Math.floor(now.getTime() / 1000));
    updateFromTimestamp();
  });
  getElement<HTMLButtonElement>(root, '[data-clear]').addEventListener('click', () => {
    timestampInput.value = '';
    datetimeInput.value = '';
    updateFromTimestamp();
  });
  copyButton.addEventListener('click', async () => {
    await copyText(seconds.textContent ?? '', copyButton);
  });

  const initial = new Date();
  timestampInput.value = String(Math.floor(initial.getTime() / 1000));
  updateFromTimestamp();
}

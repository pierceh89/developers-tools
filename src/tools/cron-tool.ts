import { copyText, escapeHtml, getElement } from './shared';

type CronFieldName = 'minute' | 'hour' | 'day' | 'month' | 'weekday';

type CronFieldRule = {
  min: number;
  max: number;
  aliases?: Record<string, number>;
};

type CronParseResult = {
  expression: string;
  fields: Record<CronFieldName, string>;
  errors: string[];
  description: string;
};

export function mountCronTool(root: HTMLElement): void {
  root.innerHTML = `
    <div class="tool-layout">
      <section class="panel">
        <div class="panel-head">
          <h2>Parser</h2>
          <div class="panel-actions">
            <button class="button button-ghost" data-example>Example</button>
            <button class="button button-ghost" data-clear>Reset</button>
          </div>
        </div>
        <label class="field">
          <span>Cron expression (5 fields)</span>
          <input class="text-input" data-expression type="text" placeholder="*/15 9-17 * * 1-5" />
        </label>
        <div class="status-row">
          <p class="status-message" data-status>Enter a cron expression or use presets and builder fields.</p>
          <button class="button button-ghost" data-copy-expression>Copy Expression</button>
        </div>
        <div class="mini-panel">
          <h3>Human-readable summary</h3>
          <p class="output-copy" data-description>—</p>
        </div>
        <div class="mini-panel">
          <h3>Validation details</h3>
          <div class="match-list" data-errors>
            <p class="empty-copy">No validation errors.</p>
          </div>
        </div>
      </section>
      <section class="panel">
        <div class="panel-head">
          <h2>Builder</h2>
          <button class="button button-ghost" data-copy-fields>Copy Generated</button>
        </div>
        <label class="field">
          <span>Preset</span>
          <select class="select" data-preset>
            <option value="">Custom</option>
            <option value="* * * * *">Every minute</option>
            <option value="0 * * * *">Top of every hour</option>
            <option value="0 0 * * *">Daily at 00:00</option>
            <option value="0 9 * * 1-5">Weekdays at 09:00</option>
          </select>
        </label>
        <div class="stack">
          <label class="field">
            <span>Minute</span>
            <input class="text-input" data-field="minute" type="text" placeholder="*" />
          </label>
          <label class="field">
            <span>Hour</span>
            <input class="text-input" data-field="hour" type="text" placeholder="*" />
          </label>
          <label class="field">
            <span>Day of month</span>
            <input class="text-input" data-field="day" type="text" placeholder="*" />
          </label>
          <label class="field">
            <span>Month</span>
            <input class="text-input" data-field="month" type="text" placeholder="*" />
          </label>
          <label class="field">
            <span>Day of week</span>
            <input class="text-input" data-field="weekday" type="text" placeholder="*" />
          </label>
        </div>
      </section>
    </div>
  `;

  const expressionInput = getElement<HTMLInputElement>(root, '[data-expression]');
  const status = getElement<HTMLElement>(root, '[data-status]');
  const description = getElement<HTMLElement>(root, '[data-description]');
  const errors = getElement<HTMLElement>(root, '[data-errors]');
  const preset = getElement<HTMLSelectElement>(root, '[data-preset]');
  const fieldInputs = {
    minute: getElement<HTMLInputElement>(root, '[data-field="minute"]'),
    hour: getElement<HTMLInputElement>(root, '[data-field="hour"]'),
    day: getElement<HTMLInputElement>(root, '[data-field="day"]'),
    month: getElement<HTMLInputElement>(root, '[data-field="month"]'),
    weekday: getElement<HTMLInputElement>(root, '[data-field="weekday"]'),
  };
  let isSyncing = false;
  let lastParsed: CronParseResult = parseCronExpression('* * * * *');

  const syncFromExpression = (): void => {
    if (isSyncing) {
      return;
    }
    isSyncing = true;
    const parsed = parseCronExpression(expressionInput.value.trim());
    lastParsed = parsed;
    description.textContent = parsed.description;

    if (parsed.errors.length > 0) {
      status.textContent = 'Invalid cron expression. Check field-level errors.';
      status.className = 'status-message status-error';
      errors.innerHTML = parsed.errors.map((item) => `<p class="empty-copy">${escapeHtml(item)}</p>`).join('');
    } else {
      status.textContent = 'Valid cron expression.';
      status.className = 'status-message status-success';
      errors.innerHTML = '<p class="empty-copy">No validation errors.</p>';
      fieldInputs.minute.value = parsed.fields.minute;
      fieldInputs.hour.value = parsed.fields.hour;
      fieldInputs.day.value = parsed.fields.day;
      fieldInputs.month.value = parsed.fields.month;
      fieldInputs.weekday.value = parsed.fields.weekday;
      preset.value = expressionMatchesPreset(parsed.expression) ? parsed.expression : '';
    }
    isSyncing = false;
  };

  const syncFromBuilder = (): void => {
    if (isSyncing) {
      return;
    }
    isSyncing = true;
    const expression = [
      fieldInputs.minute.value.trim() || '*',
      fieldInputs.hour.value.trim() || '*',
      fieldInputs.day.value.trim() || '*',
      fieldInputs.month.value.trim() || '*',
      fieldInputs.weekday.value.trim() || '*',
    ].join(' ');
    expressionInput.value = expression;
    isSyncing = false;
    syncFromExpression();
  };

  expressionInput.addEventListener('input', syncFromExpression);
  Object.values(fieldInputs).forEach((input) => {
    input.addEventListener('input', syncFromBuilder);
  });
  preset.addEventListener('change', () => {
    if (!preset.value) {
      return;
    }
    expressionInput.value = preset.value;
    syncFromExpression();
  });
  getElement<HTMLButtonElement>(root, '[data-example]').addEventListener('click', () => {
    expressionInput.value = '*/15 9-17 * * 1-5';
    syncFromExpression();
  });
  getElement<HTMLButtonElement>(root, '[data-clear]').addEventListener('click', () => {
    expressionInput.value = '* * * * *';
    preset.value = '';
    syncFromExpression();
  });
  getElement<HTMLButtonElement>(root, '[data-copy-expression]').addEventListener('click', async (event) => {
    await copyText(expressionInput.value.trim(), event.currentTarget as HTMLButtonElement);
  });
  getElement<HTMLButtonElement>(root, '[data-copy-fields]').addEventListener('click', async (event) => {
    await copyText(lastParsed.expression, event.currentTarget as HTMLButtonElement);
  });

  expressionInput.value = '* * * * *';
  syncFromExpression();
}

function parseCronExpression(expression: string): CronParseResult {
  const trimmed = expression.trim();
  const fields = trimmed.split(/\s+/);
  const emptyFields: Record<CronFieldName, string> = {
    minute: '*',
    hour: '*',
    day: '*',
    month: '*',
    weekday: '*',
  };

  if (!trimmed) {
    return {
      expression: '* * * * *',
      fields: emptyFields,
      errors: ['Expression is empty. Expected 5 fields.'],
      description: 'Invalid expression.',
    };
  }

  if (fields.length !== 5) {
    return {
      expression: trimmed,
      fields: emptyFields,
      errors: [`Expected 5 fields, but received ${fields.length}.`],
      description: 'Invalid expression.',
    };
  }

  const named: Record<CronFieldName, string> = {
    minute: fields[0],
    hour: fields[1],
    day: fields[2],
    month: fields[3],
    weekday: fields[4],
  };

  const errors: string[] = [];
  const rules: Record<CronFieldName, CronFieldRule> = {
    minute: { min: 0, max: 59 },
    hour: { min: 0, max: 23 },
    day: { min: 1, max: 31 },
    month: {
      min: 1,
      max: 12,
      aliases: { jan: 1, feb: 2, mar: 3, apr: 4, may: 5, jun: 6, jul: 7, aug: 8, sep: 9, oct: 10, nov: 11, dec: 12 },
    },
    weekday: {
      min: 0,
      max: 7,
      aliases: { sun: 0, mon: 1, tue: 2, wed: 3, thu: 4, fri: 5, sat: 6 },
    },
  };

  (Object.keys(named) as CronFieldName[]).forEach((field) => {
    const fieldErrors = validateCronField(named[field], rules[field]);
    fieldErrors.forEach((error) => errors.push(`${field}: ${error}`));
  });

  return {
    expression: fields.join(' '),
    fields: named,
    errors,
    description: errors.length > 0 ? 'Invalid expression.' : describeCron(named),
  };
}

function validateCronField(value: string, rule: CronFieldRule): string[] {
  const parts = value.split(',');
  const errors: string[] = [];

  parts.forEach((part) => {
    const token = part.trim().toLowerCase();
    if (!token) {
      errors.push('contains an empty token.');
      return;
    }

    if (token === '*') {
      return;
    }

    if (token.includes('/')) {
      const [base, stepRaw] = token.split('/');
      if (!stepRaw || !/^\d+$/.test(stepRaw) || Number(stepRaw) < 1) {
        errors.push(`has an invalid step value in "${part}".`);
        return;
      }
      if (base === '*') {
        return;
      }
      if (!isValidRangeOrValue(base, rule)) {
        errors.push(`has an invalid range "${part}".`);
      }
      return;
    }

    if (!isValidRangeOrValue(token, rule)) {
      errors.push(`has an invalid token "${part}".`);
    }
  });

  return errors;
}

function isValidRangeOrValue(token: string, rule: CronFieldRule): boolean {
  if (token.includes('-')) {
    const [startRaw, endRaw] = token.split('-');
    const start = parseCronValue(startRaw, rule);
    const end = parseCronValue(endRaw, rule);
    return start !== null && end !== null && start <= end;
  }
  return parseCronValue(token, rule) !== null;
}

function parseCronValue(value: string, rule: CronFieldRule): number | null {
  const normalized = value.trim().toLowerCase();
  if (rule.aliases && normalized in rule.aliases) {
    return rule.aliases[normalized];
  }
  if (!/^\d+$/.test(normalized)) {
    return null;
  }
  const parsed = Number(normalized);
  if (parsed < rule.min || parsed > rule.max) {
    return null;
  }
  return parsed;
}

function describeCron(fields: Record<CronFieldName, string>): string {
  return [
    `Minute: ${describeCronField(fields.minute, 'minute')}.`,
    `Hour: ${describeCronField(fields.hour, 'hour')}.`,
    `Day of month: ${describeCronField(fields.day, 'day')}.`,
    `Month: ${describeCronField(fields.month, 'month')}.`,
    `Day of week: ${describeCronField(fields.weekday, 'weekday')}.`,
  ].join(' ');
}

function describeCronField(value: string, label: CronFieldName): string {
  if (value === '*') {
    return 'every value';
  }
  if (value.includes(',')) {
    return `specific values (${value})`;
  }
  if (value.startsWith('*/')) {
    return `every ${value.slice(2)} ${label === 'day' ? 'days' : `${label}s`}`;
  }
  if (value.includes('/')) {
    return `stepped range (${value})`;
  }
  if (value.includes('-')) {
    return `range ${value}`;
  }
  return `value ${value}`;
}

function expressionMatchesPreset(expression: string): boolean {
  return ['* * * * *', '0 * * * *', '0 0 * * *', '0 9 * * 1-5'].includes(expression);
}

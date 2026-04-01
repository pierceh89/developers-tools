export function getElement<T extends Element>(root: ParentNode, selector: string): T {
  const element = root.querySelector<T>(selector);
  if (!element) {
    throw new Error(`Missing element for selector: ${selector}`);
  }
  return element;
}

export async function copyText(value: string, trigger: HTMLButtonElement): Promise<void> {
  if (!value) {
    return;
  }

  const label = trigger.textContent ?? 'Copy';

  try {
    await navigator.clipboard.writeText(value);
    trigger.textContent = 'Copied';
  } catch {
    trigger.textContent = 'Copy failed';
  }

  window.setTimeout(() => {
    trigger.textContent = label;
  }, 1200);
}

export type HashAlgorithm = 'md5' | 'sha-1' | 'sha-256' | 'sha-512';

export async function digestText(value: string, algorithm: HashAlgorithm): Promise<string> {
  if (algorithm === 'md5') {
    return md5(value);
  }

  const subtleAlgorithm = algorithm.toUpperCase();
  const bytes = new TextEncoder().encode(value);
  const digest = await crypto.subtle.digest(subtleAlgorithm, bytes);
  return bytesToHex(new Uint8Array(digest));
}

export function bytesToHex(bytes: Uint8Array): string {
  return Array.from(bytes, (byte) => byte.toString(16).padStart(2, '0')).join('');
}

export function utf8ToBase64(value: string): string {
  const bytes = new TextEncoder().encode(value);
  let binary = '';
  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });
  return btoa(binary);
}

export function base64ToUtf8(value: string): string {
  try {
    const binary = atob(value);
    const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));
    return new TextDecoder().decode(bytes);
  } catch {
    throw new Error('Input is not valid Base64.');
  }
}

export function base64UrlDecode(value: string): string {
  const normalized = value.replace(/-/g, '+').replace(/_/g, '/');
  const padding = normalized.length % 4 === 0 ? '' : '='.repeat(4 - (normalized.length % 4));
  return base64ToUtf8(`${normalized}${padding}`);
}

export function renderClaimItems(payload: Record<string, unknown>): string {
  const keys: Array<'exp' | 'iat' | 'nbf'> = ['exp', 'iat', 'nbf'];
  const items = keys
    .filter((key) => typeof payload[key] === 'number')
    .map((key) => {
      const value = payload[key] as number;
      return `<div><dt>${key}</dt><dd>${value} -> ${formatDate(new Date(value * 1000), true)}</dd></div>`;
    });

  return items.length > 0 ? items.join('') : '<div><dt>Time claims</dt><dd>No exp, iat, or nbf claims found.</dd></div>';
}

export function formatDate(date: Date, utc: boolean): string {
  const formatter = new Intl.DateTimeFormat('en-US', {
    dateStyle: 'full',
    timeStyle: 'long',
    timeZone: utc ? 'UTC' : undefined,
  });
  return `${formatter.format(date)}${utc ? ' (UTC)' : ' (local)'}`;
}

export function toDatetimeLocalValue(date: Date): string {
  const local = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
  return local.toISOString().slice(0, 16);
}

export function clampNumber(value: number, min: number, max: number): number {
  if (Number.isNaN(value)) {
    return min;
  }
  return Math.min(Math.max(value, min), max);
}

export function generateUlid(): string {
  const encoding = '0123456789ABCDEFGHJKMNPQRSTVWXYZ';
  let timestamp = Date.now();
  let output = '';

  for (let index = 0; index < 10; index += 1) {
    output = encoding[timestamp % 32] + output;
    timestamp = Math.floor(timestamp / 32);
  }

  const random = crypto.getRandomValues(new Uint8Array(16));
  for (let index = 0; index < 16; index += 1) {
    output += encoding[random[index] % 32];
  }

  return output;
}

export function withGlobalFlag(regex: RegExp): RegExp {
  const flags = regex.flags.includes('g') ? regex.flags : `${regex.flags}g`;
  return new RegExp(regex.source, flags);
}

export function highlightMatches(text: string, matches: RegExpMatchArray[]): string {
  if (matches.length === 0) {
    return escapeHtml(text);
  }

  let cursor = 0;
  let output = '';

  matches.forEach((match) => {
    const start = match.index ?? 0;
    const value = match[0];
    const end = start + value.length;
    output += escapeHtml(text.slice(cursor, start));
    output += `<mark>${escapeHtml(value)}</mark>`;
    cursor = end;
  });
  output += escapeHtml(text.slice(cursor));
  return output;
}

export function escapeHtml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function md5(input: string): string {
  const rotateLeft = (value: number, amount: number): number =>
    ((value << amount) | (value >>> (32 - amount))) >>> 0;
  const add = (a: number, b: number): number => ((a >>> 0) + (b >>> 0)) >>> 0;

  const f = (x: number, y: number, z: number): number => (x & y) | (~x & z);
  const g = (x: number, y: number, z: number): number => (x & z) | (y & ~z);
  const h = (x: number, y: number, z: number): number => x ^ y ^ z;
  const i = (x: number, y: number, z: number): number => y ^ (x | ~z);

  const text = new TextEncoder().encode(input);
  const bitLength = text.length * 8;
  const withPaddingLength = (((text.length + 8) >>> 6) + 1) * 64;
  const bytes = new Uint8Array(withPaddingLength);
  bytes.set(text);
  bytes[text.length] = 0x80;

  const bitLengthLow = bitLength >>> 0;
  const bitLengthHigh = Math.floor(bitLength / 0x100000000);
  const view = new DataView(bytes.buffer);
  view.setUint32(withPaddingLength - 8, bitLengthLow, true);
  view.setUint32(withPaddingLength - 4, bitLengthHigh, true);

  let a0 = 0x67452301;
  let b0 = 0xefcdab89;
  let c0 = 0x98badcfe;
  let d0 = 0x10325476;

  const s = [
    7, 12, 17, 22, 7, 12, 17, 22, 7, 12, 17, 22, 7, 12, 17, 22, 5, 9, 14, 20, 5, 9, 14, 20, 5, 9, 14, 20, 5, 9,
    14, 20, 4, 11, 16, 23, 4, 11, 16, 23, 4, 11, 16, 23, 4, 11, 16, 23, 6, 10, 15, 21, 6, 10, 15, 21, 6, 10,
    15, 21, 6, 10, 15, 21,
  ];
  const k = Array.from({ length: 64 }, (_, index) => Math.floor(Math.abs(Math.sin(index + 1)) * 2 ** 32) >>> 0);

  for (let offset = 0; offset < bytes.length; offset += 64) {
    const chunk = new Uint32Array(16);
    for (let index = 0; index < 16; index += 1) {
      chunk[index] = view.getUint32(offset + index * 4, true);
    }

    let a = a0;
    let b = b0;
    let c = c0;
    let d = d0;

    for (let index = 0; index < 64; index += 1) {
      let mix: number;
      let blockIndex: number;

      if (index < 16) {
        mix = f(b, c, d);
        blockIndex = index;
      } else if (index < 32) {
        mix = g(b, c, d);
        blockIndex = (5 * index + 1) % 16;
      } else if (index < 48) {
        mix = h(b, c, d);
        blockIndex = (3 * index + 5) % 16;
      } else {
        mix = i(b, c, d);
        blockIndex = (7 * index) % 16;
      }

      const next = d;
      d = c;
      c = b;
      const sum = add(add(a, mix), add(k[index], chunk[blockIndex]));
      b = add(b, rotateLeft(sum, s[index]));
      a = next;
    }

    a0 = add(a0, a);
    b0 = add(b0, b);
    c0 = add(c0, c);
    d0 = add(d0, d);
  }

  const output = new Uint8Array(16);
  const outputView = new DataView(output.buffer);
  outputView.setUint32(0, a0, true);
  outputView.setUint32(4, b0, true);
  outputView.setUint32(8, c0, true);
  outputView.setUint32(12, d0, true);
  return bytesToHex(output);
}

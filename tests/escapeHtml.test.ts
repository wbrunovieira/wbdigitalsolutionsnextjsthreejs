import { describe, it, expect } from 'vitest';
import { escapeHtml } from '../src/lib/escapeHtml';

describe('escapeHtml', () => {
  it('escapes the five HTML-significant characters', () => {
    expect(escapeHtml(`<b>"x"&'y'`)).toBe('&lt;b&gt;&quot;x&quot;&amp;&#039;y&#039;');
  });

  it('neutralizes an injected tag', () => {
    expect(escapeHtml('<img src=x onerror=alert(1)>')).not.toContain('<');
  });

  it('leaves a normal value unchanged', () => {
    expect(escapeHtml('ana@example.com')).toBe('ana@example.com');
  });

  it('coerces non-strings', () => {
    expect(escapeHtml(undefined)).toBe('undefined');
    expect(escapeHtml(42)).toBe('42');
  });
});

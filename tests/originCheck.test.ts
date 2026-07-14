import { describe, it, expect } from 'vitest';
import { isTrustedOrigin } from '../src/lib/originCheck';
import type { NextApiRequest } from 'next';

const req = (headers: Record<string, string>) =>
  ({ headers } as unknown as NextApiRequest);

describe('isTrustedOrigin', () => {
  it('allows an allow-listed Origin', () => {
    expect(isTrustedOrigin(req({ origin: 'https://www.wbdigitalsolutions.com' }))).toBe(true);
    expect(isTrustedOrigin(req({ origin: 'https://brunodev.wbdigitalsolutions.com' }))).toBe(true);
  });

  it('rejects a cross-site Origin', () => {
    expect(isTrustedOrigin(req({ origin: 'https://evil.example.com' }))).toBe(false);
  });

  it('rejects a look-alike Origin (suffix trick)', () => {
    expect(isTrustedOrigin(req({ origin: 'https://wbdigitalsolutions.com.evil.com' }))).toBe(false);
  });

  it('falls back to Referer when no Origin is present', () => {
    expect(isTrustedOrigin(req({ referer: 'https://www.wbdigitalsolutions.com/contact' }))).toBe(true);
    expect(isTrustedOrigin(req({ referer: 'https://evil.example.com/x' }))).toBe(false);
  });

  it('allows localhost over http (dev)', () => {
    expect(isTrustedOrigin(req({ origin: 'http://localhost:3000' }))).toBe(true);
  });

  it('allows when neither Origin nor Referer is present (other layers apply)', () => {
    expect(isTrustedOrigin(req({}))).toBe(true);
  });
});

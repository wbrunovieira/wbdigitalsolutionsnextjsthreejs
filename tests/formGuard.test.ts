import { describe, it, expect } from 'vitest';
import { passesBotGuard } from '../src/lib/formGuard';

const human = () => ({ _t: Date.now() - 5000 }); // filled 5s ago, no honeypot

describe('passesBotGuard', () => {
  it('passes a plausible human submission', () => {
    expect(passesBotGuard(human())).toBe(true);
  });

  it('fails when the honeypot is filled', () => {
    expect(passesBotGuard({ ...human(), _hp: 'bot' })).toBe(false);
  });

  it('fails when _t is missing (non-omittable timing)', () => {
    expect(passesBotGuard({})).toBe(false);
  });

  it('fails when _t is not a number', () => {
    expect(passesBotGuard({ _t: '123' })).toBe(false);
    expect(passesBotGuard({ _t: NaN })).toBe(false);
  });

  it('fails when the form was submitted too fast (< 3s)', () => {
    expect(passesBotGuard({ _t: Date.now() - 500 })).toBe(false);
  });

  it('still allows a page left open for hours (< 24h)', () => {
    expect(passesBotGuard({ _t: Date.now() - 8 * 60 * 60 * 1000 })).toBe(true);
  });

  it('fails on an absurdly old / replayed timestamp (> 24h)', () => {
    expect(passesBotGuard({ _t: Date.now() - 25 * 60 * 60 * 1000 })).toBe(false);
  });

  it('fails on a future timestamp', () => {
    expect(passesBotGuard({ _t: Date.now() + 10000 })).toBe(false);
  });
});

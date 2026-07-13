import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { rateLimit, getClientIp, __resetRateLimitStore } from '../src/lib/rateLimit';
import type { NextApiRequest } from 'next';

beforeEach(() => {
  __resetRateLimitStore();
  vi.useFakeTimers();
  vi.setSystemTime(new Date('2026-01-01T00:00:00Z'));
});

afterEach(() => {
  vi.useRealTimers();
});

describe('rateLimit (fixed window, default 5 / 10 min)', () => {
  it('allows exactly 5 and blocks the 6th', () => {
    const results = Array.from({ length: 6 }, () => rateLimit('k'));
    expect(results.slice(0, 5).every((r) => r.allowed)).toBe(true);
    expect(results[5].allowed).toBe(false);
  });

  it('decrements remaining and reports 0 once blocked', () => {
    expect(rateLimit('k').remaining).toBe(4);
    expect(rateLimit('k').remaining).toBe(3);
    rateLimit('k');
    rateLimit('k');
    rateLimit('k'); // 5th
    expect(rateLimit('k').remaining).toBe(0); // 6th, blocked
  });

  it('gives a Retry-After that is positive and within the window', () => {
    for (let i = 0; i < 5; i += 1) rateLimit('k');
    const blocked = rateLimit('k');
    expect(blocked.allowed).toBe(false);
    expect(blocked.retryAfterSeconds).toBeGreaterThan(0);
    expect(blocked.retryAfterSeconds).toBeLessThanOrEqual(600);
  });

  it('keeps separate budgets per key', () => {
    for (let i = 0; i < 5; i += 1) rateLimit('a');
    expect(rateLimit('a').allowed).toBe(false); // a exhausted
    expect(rateLimit('b').allowed).toBe(true); // b untouched
  });

  it('resets after the window elapses', () => {
    for (let i = 0; i < 5; i += 1) rateLimit('k');
    expect(rateLimit('k').allowed).toBe(false);
    vi.advanceTimersByTime(10 * 60 * 1000 + 1); // just past the 10-min window
    expect(rateLimit('k').allowed).toBe(true);
  });

  it('honors a custom max', () => {
    expect(rateLimit('k', { max: 2 }).allowed).toBe(true);
    expect(rateLimit('k', { max: 2 }).allowed).toBe(true);
    expect(rateLimit('k', { max: 2 }).allowed).toBe(false);
  });
});

describe('getClientIp', () => {
  const req = (headers: Record<string, string | string[]>) =>
    ({ headers, socket: { remoteAddress: '10.0.0.9' } } as unknown as NextApiRequest);

  it('takes the first hop of x-forwarded-for', () => {
    expect(getClientIp(req({ 'x-forwarded-for': '203.0.113.7, 70.41.3.18' }))).toBe('203.0.113.7');
  });

  it('handles an array-valued header', () => {
    expect(getClientIp(req({ 'x-forwarded-for': ['198.51.100.2', 'x'] }))).toBe('198.51.100.2');
  });

  it('falls back to the socket address when no header is present', () => {
    expect(getClientIp(req({}))).toBe('10.0.0.9');
  });
});

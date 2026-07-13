import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createMocks, type RequestMethod } from 'node-mocks-http';
import type { NextApiRequest, NextApiResponse } from 'next';

// Mock nodemailer so no real SMTP connection is made.
const { sendMail } = vi.hoisted(() => ({ sendMail: vi.fn() }));
vi.mock('nodemailer', () => ({
  default: { createTransport: () => ({ sendMail }) },
  createTransport: () => ({ sendMail }),
}));

import handler from '../src/pages/api/send-email';
import { __resetRateLimitStore } from '../src/lib/rateLimit';

async function call(
  method: RequestMethod,
  body: Record<string, unknown> = {},
  headers: Record<string, string> = {},
) {
  const { req, res } = createMocks({ method, body, headers });
  await handler(req as unknown as NextApiRequest, res as unknown as NextApiResponse);
  return res;
}

const valid = { name: 'Ana Souza', email: 'ana@example.com', message: 'Quero um orcamento de site.' };

beforeEach(() => {
  sendMail.mockReset();
  sendMail.mockResolvedValue({ messageId: 'test-id' });
  __resetRateLimitStore();
});

describe('send-email handler', () => {
  it('rejects non-POST with 405', async () => {
    const res = await call('GET');
    expect(res._getStatusCode()).toBe(405);
  });

  it('sends on a valid POST (200)', async () => {
    const res = await call('POST', valid);
    expect(res._getStatusCode()).toBe(200);
    expect(sendMail).toHaveBeenCalled();
  });

  it('rejects an invalid email format with 400 and does not send', async () => {
    const res = await call('POST', { ...valid, email: 'not-an-email' });
    expect(res._getStatusCode()).toBe(400);
    expect(sendMail).not.toHaveBeenCalled();
  });

  it('rejects missing required fields with 400', async () => {
    const res = await call('POST', { email: 'ana@example.com' });
    expect(res._getStatusCode()).toBe(400);
  });

  it('rate-limits the 6th request from the same IP with 429', async () => {
    const ip = { 'x-forwarded-for': '203.0.113.50' };
    for (let i = 0; i < 5; i += 1) {
      const ok = await call('POST', valid, ip);
      expect(ok._getStatusCode()).toBe(200);
    }
    const blocked = await call('POST', valid, ip);
    expect(blocked._getStatusCode()).toBe(429);
    expect(blocked.getHeader('Retry-After')).toBeDefined();
  });

  it('keeps a separate budget per IP', async () => {
    const a = { 'x-forwarded-for': '203.0.113.1' };
    const b = { 'x-forwarded-for': '203.0.113.2' };
    for (let i = 0; i < 5; i += 1) await call('POST', valid, a);
    expect((await call('POST', valid, a))._getStatusCode()).toBe(429);
    expect((await call('POST', valid, b))._getStatusCode()).toBe(200);
  });
});

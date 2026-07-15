import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createMocks, type RequestMethod } from 'node-mocks-http';
import type { NextApiRequest, NextApiResponse } from 'next';

const { sendMail } = vi.hoisted(() => ({ sendMail: vi.fn() }));
vi.mock('nodemailer', () => ({
  default: { createTransport: () => ({ sendMail }) },
  createTransport: () => ({ sendMail }),
}));

import handler from '../src/pages/api/newsletter';
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

const valid = { email: 'ana@example.com', name: 'Ana', company: 'Acme', _t: Date.now() - 5000 };

beforeEach(() => {
  sendMail.mockReset();
  sendMail.mockResolvedValue({ messageId: 'test-id' });
  __resetRateLimitStore();
});

describe('newsletter handler', () => {
  it('subscribes on a valid POST (200) and sends', async () => {
    const res = await call('POST', valid);
    expect(res._getStatusCode()).toBe(200);
    expect(sendMail).toHaveBeenCalled();
  });

  it('escapes HTML in the admin notification (name/company)', async () => {
    await call('POST', { ...valid, name: '<b>x</b>', company: '<i>c</i>' });
    const adminHtml = sendMail.mock.calls[0][0].html as string;
    expect(adminHtml).toContain('&lt;b&gt;x&lt;/b&gt;');
    expect(adminHtml).not.toContain('<b>x</b>');
  });

  it('rejects a cross-site Origin with 403 and does not send', async () => {
    const res = await call('POST', valid, { origin: 'https://evil.example.com' });
    expect(res._getStatusCode()).toBe(403);
    expect(sendMail).not.toHaveBeenCalled();
  });

  it('silently drops a submission with no _t (bot guard) without sending', async () => {
    const res = await call('POST', { email: 'a@b.co' });
    expect(res._getStatusCode()).toBe(200);
    expect(sendMail).not.toHaveBeenCalled();
  });

  it('rejects an invalid email with 400', async () => {
    const res = await call('POST', { ...valid, email: 'nope' });
    expect(res._getStatusCode()).toBe(400);
  });
});

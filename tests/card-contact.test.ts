import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createMocks, type RequestMethod } from 'node-mocks-http';
import type { NextApiRequest, NextApiResponse } from 'next';

// Mock nodemailer (the handler does `require('nodemailer')`).
const { sendMail } = vi.hoisted(() => ({ sendMail: vi.fn() }));
vi.mock('nodemailer', () => ({
  default: { createTransport: () => ({ sendMail }) },
  createTransport: () => ({ sendMail }),
}));

import handler from '../src/pages/api/card-contact';

async function call(
  method: RequestMethod,
  body: Record<string, unknown> = {},
  headers: Record<string, string> = {}
) {
  const { req, res } = createMocks({ method, body, headers });
  await handler(req as unknown as NextApiRequest, res as unknown as NextApiResponse);
  return res;
}

const ORIGIN = 'https://card.wbdigitalsolutions.com';

beforeEach(() => {
  sendMail.mockReset();
  sendMail.mockResolvedValue({ messageId: 'test-id' });
  delete process.env.CARD_SHARE_TOKEN;
  delete process.env.CARD_ORIGIN;
  delete process.env.CARD_CONTACT_EMAIL;
});

describe('card-contact webhook', () => {
  it('answers the CORS preflight (OPTIONS) with 204 and the allowed origin', async () => {
    const res = await call('OPTIONS');
    expect(res._getStatusCode()).toBe(204);
    expect(res.getHeader('Access-Control-Allow-Origin')).toBe(ORIGIN);
    expect(res.getHeader('Access-Control-Allow-Methods')).toContain('POST');
  });

  it('rejects non-POST methods with 405', async () => {
    const res = await call('GET');
    expect(res._getStatusCode()).toBe(405);
    expect(sendMail).not.toHaveBeenCalled();
  });

  it('silently accepts (200) but does not send when the honeypot is filled', async () => {
    const res = await call('POST', { name: 'Maria', email: 'a@b.com', _hp: 'i-am-a-bot' });
    expect(res._getStatusCode()).toBe(200);
    expect(sendMail).not.toHaveBeenCalled();
  });

  it('silently accepts (200) but does not send when submitted too fast (timing)', async () => {
    const res = await call('POST', { name: 'Maria', email: 'a@b.com', _t: Date.now() });
    expect(res._getStatusCode()).toBe(200);
    expect(sendMail).not.toHaveBeenCalled();
  });

  it('returns 400 when name is missing', async () => {
    const res = await call('POST', { email: 'a@b.com' });
    expect(res._getStatusCode()).toBe(400);
    expect(sendMail).not.toHaveBeenCalled();
  });

  it('returns 400 when both email and phone are missing', async () => {
    const res = await call('POST', { name: 'Maria' });
    expect(res._getStatusCode()).toBe(400);
    expect(sendMail).not.toHaveBeenCalled();
  });

  it('drops obvious random-string spam without sending', async () => {
    const res = await call('POST', { name: 'ASDFGHJKL', email: 'a@b.com' });
    expect(res._getStatusCode()).toBe(200);
    expect(sendMail).not.toHaveBeenCalled();
  });

  it('enforces the shared token when configured (401 without header)', async () => {
    process.env.CARD_SHARE_TOKEN = 'secret';
    const res = await call('POST', { name: 'Maria', email: 'a@b.com' });
    expect(res._getStatusCode()).toBe(401);
    expect(sendMail).not.toHaveBeenCalled();
  });

  it('passes when the correct token header is sent', async () => {
    process.env.CARD_SHARE_TOKEN = 'secret';
    const res = await call('POST', { name: 'Maria Silva', email: 'a@b.com' }, { 'x-card-token': 'secret' });
    expect(res._getStatusCode()).toBe(200);
    expect(sendMail).toHaveBeenCalled();
  });

  it('accepts phone-only submissions (no email)', async () => {
    const res = await call('POST', { name: 'João', phone: '+55 11 99999-0000' });
    expect(res._getStatusCode()).toBe(200);
    expect(sendMail).toHaveBeenCalledOnce();
  });

  it('sends to Bruno and attaches a valid .vcf of the visitor', async () => {
    const res = await call('POST', {
      name: 'Maria Silva Santos',
      phone: '+1 555 123 4567',
      email: 'maria@ex.com',
      note: 'oi; tudo bem',
    });

    expect(res._getStatusCode()).toBe(200);
    expect(res._getJSONData().success).toBe(true);
    expect(res.getHeader('Access-Control-Allow-Origin')).toBe(ORIGIN);
    // Bruno notification (calls[0]) + visitor thank-you (calls[1], valid email).
    expect(sendMail).toHaveBeenCalledTimes(2);

    const mail = sendMail.mock.calls[0][0];
    expect(mail.to).toBe('bruno@wbdigitalsolutions.com');
    expect(mail.replyTo).toBe('maria@ex.com');
    expect(mail.subject).toContain('Maria Silva Santos');

    expect(mail.attachments).toHaveLength(1);
    const att = mail.attachments[0];
    expect(att.filename).toBe('Maria_Silva_Santos.vcf');
    expect(att.contentType).toContain('text/vcard');

    const vcf: string = att.content;
    expect(vcf).toContain('BEGIN:VCARD');
    expect(vcf).toContain('END:VCARD');
    expect(vcf).toContain('FN:Maria Silva Santos');
    expect(vcf).toContain('N:Silva Santos;Maria;;;');
    expect(vcf).toContain('TEL;TYPE=CELL:+1 555 123 4567');
    expect(vcf).toContain('EMAIL;TYPE=WORK:maria@ex.com');
    // vCard escaping: the semicolon in the note must be escaped
    expect(vcf).toContain('NOTE:oi\\; tudo bem');
  });

  it('includes company in the email body and the vCard ORG', async () => {
    const res = await call('POST', { name: 'Maria', email: 'maria@ex.com', company: 'ACME Ltda' });
    expect(res._getStatusCode()).toBe(200);
    const mail = sendMail.mock.calls[0][0];
    expect(mail.html).toContain('ACME Ltda');
    expect(mail.text).toContain('Empresa: ACME Ltda');
    expect(mail.attachments[0].content).toContain('ORG:ACME Ltda');
  });

  it('returns 500 when the mailer fails', async () => {
    sendMail.mockRejectedValueOnce(new Error('smtp down'));
    const res = await call('POST', { name: 'Maria', email: 'a@b.com' });
    expect(res._getStatusCode()).toBe(500);
    expect(res._getJSONData().success).toBe(false);
  });

  it('respects CARD_CONTACT_EMAIL override', async () => {
    process.env.CARD_CONTACT_EMAIL = 'leads@wbdigitalsolutions.com';
    const res = await call('POST', { name: 'Maria', email: 'a@b.com' });
    expect(res._getStatusCode()).toBe(200);
    expect(sendMail.mock.calls[0][0].to).toBe('leads@wbdigitalsolutions.com');
  });

  it('reflects an allowed non-default origin listed in CARD_ORIGIN', async () => {
    process.env.CARD_ORIGIN = 'https://card.wbdigitalsolutions.com,http://localhost:3000';
    const res = await call('OPTIONS', {}, { origin: 'http://localhost:3000' });
    expect(res.getHeader('Access-Control-Allow-Origin')).toBe('http://localhost:3000');
  });

  it('falls back to the canonical origin for a disallowed origin', async () => {
    const res = await call('OPTIONS', {}, { origin: 'https://evil.example.com' });
    expect(res.getHeader('Access-Control-Allow-Origin')).toBe(ORIGIN);
  });

  it('sends a thank-you to the visitor in the form language (pt-BR)', async () => {
    await call('POST', { name: 'Maria', email: 'maria@ex.com', language: 'pt-BR' });
    expect(sendMail).toHaveBeenCalledTimes(2);
    const reply = sendMail.mock.calls[1][0];
    expect(reply.to).toBe('maria@ex.com');
    expect(reply.subject).toBe('Que bom te conhecer! 🙌');
    expect(reply.html).toContain('https://card.wbdigitalsolutions.com');
    expect(reply.html).toContain('Salvar contato');
    expect(reply.html).toContain('Oi Maria! 👋');
  });

  it('translates the thank-you per language field (en/es/it)', async () => {
    await call('POST', { name: 'John', email: 'john@ex.com', language: 'en' });
    expect(sendMail.mock.calls[1][0].subject).toBe('Great to connect! 🙌');

    sendMail.mockClear();
    await call('POST', { name: 'Carlos', email: 'c@ex.com', language: 'es' });
    expect(sendMail.mock.calls[1][0].subject).toBe('¡Un gusto conocerte! 🙌');

    sendMail.mockClear();
    await call('POST', { name: 'Giulia', email: 'g@ex.com', language: 'it' });
    expect(sendMail.mock.calls[1][0].subject).toContain('Che piacere conoscerti');
  });

  it('falls back to Accept-Language when no language field is sent', async () => {
    await call('POST', { name: 'Giulia', email: 'g@ex.com' }, { 'accept-language': 'it-IT,it;q=0.9' });
    expect(sendMail.mock.calls[1][0].subject).toContain('Che piacere conoscerti');
  });

  it('does NOT send a thank-you for an invalid email (only the Bruno notification)', async () => {
    const res = await call('POST', { name: 'Maria', email: 'not-an-email' });
    expect(res._getStatusCode()).toBe(200);
    expect(sendMail).toHaveBeenCalledTimes(1);
    expect(sendMail.mock.calls[0][0].to).toBe('bruno@wbdigitalsolutions.com');
  });

  it('does NOT send a thank-you for phone-only submissions', async () => {
    await call('POST', { name: 'João', phone: '+55 11 90000-0000' });
    expect(sendMail).toHaveBeenCalledTimes(1);
    expect(sendMail.mock.calls[0][0].to).toBe('bruno@wbdigitalsolutions.com');
  });
});

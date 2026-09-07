import type { NextApiRequest, NextApiResponse } from 'next';

// Comma-separated allowlist read at request time, e.g.
// "https://card.wbdigitalsolutions.com,http://localhost:3000,https://card-x.vercel.app"
function allowedOrigins(): string[] {
  return (process.env.CARD_ORIGIN || 'https://card.wbdigitalsolutions.com')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
}

export function destEmail(): string {
  return process.env.CARD_CONTACT_EMAIL || 'bruno@wbdigitalsolutions.com';
}

export function setCors(req: NextApiRequest, res: NextApiResponse) {
  // Access-Control-Allow-Origin can't be a list — echo the request origin when
  // it's allowed, otherwise fall back to the canonical card origin.
  const list = allowedOrigins();
  const origin = req.headers.origin;
  const allow = origin && list.includes(origin) ? origin : list[0];
  res.setHeader('Access-Control-Allow-Origin', allow);
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, x-card-token');
  res.setHeader('Vary', 'Origin');
}

import type { NextApiRequest } from 'next';

// Origins allowed to POST to the public email endpoints. Browsers send an `Origin`
// header on POST (same- and cross-origin), so a CSRF form auto-submitted from a
// third-party site carries THAT site's origin and is rejected here.
//
// This is a CHEAP, browser-only CSRF layer — a scripted attacker can forge the
// Origin header with curl, so it is NOT a strong control on its own. It exists to
// stop drive-by cross-site form submissions for free; the rate limiter, honeypot
// and timing checks are the other layers.
const ALLOWED_ORIGINS = [
  'https://www.wbdigitalsolutions.com',
  'https://wbdigitalsolutions.com',
  'https://brunodev.wbdigitalsolutions.com',
  'https://brunov.wbdigitalsolutions.com',
  'https://card.wbdigitalsolutions.com',
];

function hostAllowed(value: string): boolean {
  try {
    const url = new URL(value);
    // Allow localhost over http for local development.
    if (url.protocol === 'http:' && (url.hostname === 'localhost' || url.hostname === '127.0.0.1')) {
      return true;
    }
    return ALLOWED_ORIGINS.includes(`${url.protocol}//${url.host}`);
  } catch {
    return false;
  }
}

// True if the request may proceed. Rejects ONLY when an Origin (or, failing that,
// a Referer) is present AND not allow-listed — a positive cross-site signal. When
// neither header is present we cannot judge, so we allow and rely on the other
// layers (this avoids false-rejecting legitimate clients that strip these headers).
export function isTrustedOrigin(req: NextApiRequest): boolean {
  const origin = req.headers.origin;
  if (typeof origin === 'string' && origin.length > 0) {
    return hostAllowed(origin);
  }
  const referer = req.headers.referer;
  if (typeof referer === 'string' && referer.length > 0) {
    return hostAllowed(referer);
  }
  return true;
}

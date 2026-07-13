import type { NextApiRequest } from 'next';

// Simple in-memory, per-IP fixed-window rate limiter.
// (Fixed window: `resetAt` is set once per window, so a burst of up to 2x max
// can straddle a window boundary — acceptable for this anti-spam use.)
//
// Scope: a single warm serverless instance (no shared store). This is
// defense-in-depth for the unauthenticated email endpoints, layered on top of
// the existing honeypot / timing bot checks. On Vercel Fluid Compute instances
// are reused across requests, so this catches typical bot bursts; a distributed
// attacker spread across cold starts / multiple instances can still bypass it
// (accepted trade-off — see docs/plans/security-remediation.md Step 2). Upgrade
// path is Upstash Redis for a globally-shared limit.

const DEFAULT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const DEFAULT_MAX = 5; // requests per window per IP
const SWEEP_THRESHOLD = 5000; // purge expired entries once the Map grows past this

interface Bucket {
  count: number;
  resetAt: number;
}

// Map<key, Bucket>. Lives for the lifetime of the warm lambda instance.
const buckets = new Map<string, Bucket>();

// Drop expired buckets so the Map cannot grow unbounded on a long-lived instance.
function sweep(now: number): void {
  if (buckets.size < SWEEP_THRESHOLD) return;
  for (const [key, bucket] of buckets) {
    if (bucket.resetAt <= now) buckets.delete(key);
  }
}

// Client IP for keying. On Vercel `x-forwarded-for` is OVERWRITTEN with the real
// public client IP (external XFF is not forwarded, to prevent spoofing), so it is
// a single trustworthy hop here — hence `[0]`. This limiter's non-spoofability
// DEPENDS on that: do not "harden" it to trust an XFF chain, or forged IPs would
// bypass the limit and could balloon the Map. If a reverse proxy is ever fronted,
// prefer `x-real-ip`.
export function getClientIp(req: NextApiRequest): string {
  const xff = req.headers['x-forwarded-for'];
  const raw = Array.isArray(xff) ? xff[0] : xff;
  const ip = raw?.split(',')[0]?.trim();
  return ip || req.socket?.remoteAddress || 'unknown';
}

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  retryAfterSeconds: number;
}

// Records one hit for `key` and reports whether it is within the limit.
export function rateLimit(
  key: string,
  opts: { max?: number; windowMs?: number } = {},
): RateLimitResult {
  const max = opts.max ?? DEFAULT_MAX;
  const windowMs = opts.windowMs ?? DEFAULT_WINDOW_MS;
  const now = Date.now();
  sweep(now);

  const bucket = buckets.get(key);

  // No bucket, or the previous window has elapsed: start a fresh window.
  if (!bucket || bucket.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, remaining: max - 1, retryAfterSeconds: 0 };
  }

  // Over the limit within the active window.
  if (bucket.count >= max) {
    return {
      allowed: false,
      remaining: 0,
      retryAfterSeconds: Math.max(1, Math.ceil((bucket.resetAt - now) / 1000)),
    };
  }

  bucket.count += 1;
  return { allowed: true, remaining: max - bucket.count, retryAfterSeconds: 0 };
}

// Test-only: clear all buckets so each test starts from a clean limiter.
export function __resetRateLimitStore(): void {
  buckets.clear();
}

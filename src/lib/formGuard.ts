// Shared bot heuristics for the public email endpoints: a hidden honeypot field
// plus a minimum fill-time gate. Unlike the old per-endpoint inline checks, the
// timing gate here is NON-OMITTABLE: a missing or non-numeric `_t` is treated as a
// bot, not skipped. Callers should treat a failed guard as a silent success (return
// 200 without sending) so bots learn nothing.

const MIN_FILL_MS = 3000; // forms filled faster than this are bots
// Upper bound is generous on purpose: a real visitor may leave the page open for
// hours before submitting. It only rejects clearly stale/replayed timestamps; a
// forged future/too-fast timestamp is already caught by MIN_FILL_MS.
const MAX_AGE_MS = 24 * 60 * 60 * 1000;

// True when the submission passes the honeypot + timing heuristics.
export function passesBotGuard(body: Record<string, unknown>): boolean {
  // Honeypot: a hidden field only bots fill.
  if (body._hp) return false;

  // Timing: require a numeric client start timestamp and a plausible elapsed time.
  const t = body._t;
  if (typeof t !== 'number' || !Number.isFinite(t)) return false;

  const elapsed = Date.now() - t;
  if (elapsed < MIN_FILL_MS) return false; // too fast
  if (elapsed > MAX_AGE_MS) return false; // stale or forged future timestamp

  return true;
}

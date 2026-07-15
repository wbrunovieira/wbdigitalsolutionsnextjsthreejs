// Escape a value for safe interpolation into HTML text or attribute contexts
// (email templates). Mirrors the escaping in contactEmail.js / card-contact.ts;
// intended to become the single shared helper (see security-redteam-followup Step 4).
export function escapeHtml(value: unknown): string {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

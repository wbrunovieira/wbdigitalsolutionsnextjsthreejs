// Escape a value for a vCard field (RFC 6350): backslash, newline, comma, semicolon.
const vesc = (s: string) =>
  String(s).replace(/\\/g, '\\\\').replace(/\n/g, '\\n').replace(/,/g, '\\,').replace(/;/g, '\\;');

// Build a vCard (.vcf) for the visitor so Bruno can save the contact in one tap.
export function buildVCard(
  { name, phone, email, company, note }: { name: string; phone?: string; email?: string; company?: string; note?: string },
) {
  const parts = String(name).trim().split(/\s+/);
  const given = parts[0] || '';
  const family = parts.slice(1).join(' ');
  // Mirror the card's known-working bruno.vcf: FN before N, TYPE=WORK email, no REV.
  const lines = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    `FN:${vesc(name)}`,
    `N:${vesc(family)};${vesc(given)};;;`,
  ];
  if (company) lines.push(`ORG:${vesc(company)}`);
  if (phone) lines.push(`TEL;TYPE=CELL,VOICE:${vesc(phone)}`);
  if (email) lines.push(`EMAIL;TYPE=WORK:${vesc(email)}`);
  if (note) lines.push(`NOTE:${vesc(note)}`);
  lines.push('URL:https://card.wbdigitalsolutions.com');
  lines.push('END:VCARD');
  return lines.join('\r\n') + '\r\n';
}

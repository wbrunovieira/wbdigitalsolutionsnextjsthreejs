---
name: domain-dns
description: Access and manage DNS for wbdigitalsolutions.com across Cloudflare (current DNS provider, since 2026-07-11) and Vercel (previous provider, still where the site/project is hosted). Use when adding/editing/auditing DNS records, checking nameservers/registrar/expiry, debugging why a subdomain or email fails to resolve, or continuing the GoDaddy->Cloudflare registrar transfer. Encodes credential locations, account/zone IDs, and the zero-downtime record-parity approach.
---

# Domain DNS (wbdigitalsolutions.com)

## Current state (as of 2026-07-11)

| What | Value |
|---|---|
| Registrar | **GoDaddy** (registrar transfer to Cloudflare IN PROGRESS; expires 2026-07-18 until the transfer's +1yr lands) |
| **DNS provider** | **Cloudflare** (authoritative). Nameservers: `jeff.ns.cloudflare.com`, `leanna.ns.cloudflare.com` |
| Previous DNS | Vercel (`ns1/ns2.vercel-dns.com`) — migrated off 2026-07-11, zero downtime |
| Site host | still **Vercel** (records point at Vercel: apex A `76.76.21.21`, subdomains CNAME `cname.vercel-dns.com`, wildcard CNAME `cname.vercel-dns-017.com`) |
| Email | Google Workspace MX + Amazon SES (MX/DKIM/SPF/DMARC) — never break these |
| Self-hosted apps | ~26 subdomains A -> `45.90.123.190` (VPS): crm, chatbot, n8n, calendar-*, etc. |

## Credentials

- **Cloudflare**: token + IDs in `~/.wb-cf.env` (chmod 600, NOT in repo). Contains `CF_API_TOKEN` (DNS-edit scoped to this zone), `CF_ACCOUNT_ID=2300286ccac82a1a2b1b2f01d95cb9c0`, `CF_ZONE_ID=358257964c932415fbe249e27837b566`. Load with `set -a; source ~/.wb-cf.env; set +a`.
  - NOTE: the migration token (`flat-boat-831e`) may be revoked after the registrar transfer completes — if API calls 403, the user must mint a new "Edit zone DNS" token scoped to this zone and update `~/.wb-cf.env`.
- **Vercel**: CLI token at `~/Library/Application Support/com.vercel.cli/auth.json` (`jq -r .token`). DNS for this domain lives under Vercel team **brunoteam** = `team_lCYn19RTwOtCpYsksrKzhN5Q` (NOT the site's `bruno-vieiras-projects` team).

## Cloudflare: read / edit DNS

```bash
set -a; source ~/.wb-cf.env; set +a
# List all records
curl -s "https://api.cloudflare.com/client/v4/zones/$CF_ZONE_ID/dns_records?per_page=200" \
  -H "Authorization: Bearer $CF_API_TOKEN" | jq -r '.result[] | "\(.type)\t\(.name)\t\(.content)\tproxied=\(.proxied)"'
# Add a record (ALWAYS proxied:false unless deliberately fronting through Cloudflare)
curl -s -X POST "https://api.cloudflare.com/client/v4/zones/$CF_ZONE_ID/dns_records" \
  -H "Authorization: Bearer $CF_API_TOKEN" -H "Content-Type: application/json" \
  --data '{"type":"A","name":"sub.wbdigitalsolutions.com","content":"45.90.123.190","ttl":60,"proxied":false}'
# Delete: DELETE .../dns_records/{id}
```

## Vercel: export DNS (source of truth for the pre-migration zone)

```bash
TOKEN=$(jq -r .token "$HOME/Library/Application Support/com.vercel.cli/auth.json")
TEAM=team_lCYn19RTwOtCpYsksrKzhN5Q
curl -s -H "Authorization: Bearer $TOKEN" \
  "https://api.vercel.com/v4/domains/wbdigitalsolutions.com/records?limit=100&teamId=$TEAM" \
  | jq '.records | length'
```
CLI equivalent: `vercel dns ls wbdigitalsolutions.com` (paginate with `--next <ts>`). Vercel `MX` uses field `mxPriority`; the apex is served as `ALIAS`/wildcard `ALIAS` -> `cname.vercel-dns-017.com`.

## Check registrar / lock / expiry / nameservers (no creds needed)

```bash
whois wbdigitalsolutions.com | grep -iE 'Registrar:|Registry Expiry|Domain Status|Name Server'
dig +short NS wbdigitalsolutions.com @1.1.1.1
curl -s https://rdap.godaddy.com/v1/domain/WBDIGITALSOLUTIONS.COM | jq '.status'   # registrar lock truth
```
`clientTransferProhibited` present = locked; `ok`/`["active"]` = unlocked. Cloudflare's transfer UI caches lock state and can lag hours behind RDAP.

## Zero-downtime rules (learned the hard way)

1. **Keep every Vercel/VPS-facing record grey / `proxied:false` (DNS-only).** Orange-proxying changes the origin IP the client sees, breaks the VPS at `45.90.123.190`, breaks Vercel SSL, and skews Vercel Analytics.
2. **Migrating DNS providers** = replicate ALL records exactly, then validate the new provider answers identically BEFORE switching nameservers: `dig @<new-ns> <name> <type>` vs `dig @<old-ns> ...`. During NS propagation both providers serve, so identical zones = zero downtime. Apex `ALIAS` -> keep the explicit apex A `76.76.21.21`; wildcard `ALIAS` -> CNAME `*`. Cloudflare auto-adds its own CAA entries (benign; Let's Encrypt = Vercel's CA stays allowed).
3. **During a registrar transfer**, do NOT edit the GoDaddy registrant name/org/email (60-day transfer lock) and leave WHOIS privacy off until it completes.
4. **Keep the domain attached to the Vercel project** so the site + Vercel Analytics keep working; only DNS/registrar move.

See also the `deploy` skill (Vercel project/deploy facts) and the `domain-cloudflare-migration` memory (live transfer status).

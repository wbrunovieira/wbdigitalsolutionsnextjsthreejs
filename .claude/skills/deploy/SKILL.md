---
name: deploy
description: Ship this site to production and manage its Vercel infrastructure. Use when the user asks to deploy, push to production, add/verify a subdomain, watch a deployment, or read Vercel build/runtime logs. Encodes the battle-tested cross-team domain recipe (domain owned by team "brunoteam", project in "bruno-vieiras-projects") and the monitoring workflow that must ALWAYS follow a deploy.
---

# Deploy (GitHub → Vercel)

## Project facts

| What | Value |
|---|---|
| GitHub repo | `git@github.com:wbrunovieira/wbdigitalsolutionsnextjsthreejs.git` (branch `main`) |
| Deploy trigger | **Push to `main` auto-deploys** (Git integration). No `vercel deploy` needed. |
| Vercel project | `wbdigitalsolutionsnextjsthreejs` in scope **`bruno-vieiras-projects`** |
| projectId / teamId | `prj_7f0DQePgCQqWyR4e9D9eT9BERgqK` / `team_DJXzqoYxGsCcP4abRaobj4DQ` |
| Domain owner | `wbdigitalsolutions.com` lives in ANOTHER team: **`brunoteam`**, with **Vercel nameservers** (Vercel manages DNS) |
| Production URLs | www.wbdigitalsolutions.com (+ subdomains: brunodev, brunov, card, land3, chatbot on a VPS, ...) |
| CLI auth token | `~/Library/Application Support/com.vercel.cli/auth.json` (for REST calls; the `vercel api` beta DROPS POST bodies, use curl) |

**NEVER run `pnpm build` locally** while the user's dev server may be running (corrupts the shared `.next`). Vercel builds remotely; validate locally with `npx tsc --noEmit` only.

## Standard deploy flow

1. Working tree clean, `tsc --noEmit` green, commits done.
2. `git push origin main` → this IS the deploy.
3. **ALWAYS monitor the deployment** (never assume the push worked):

```bash
# latest deployments + state (READY / BUILDING / ERROR)
vercel ls --scope bruno-vieiras-projects | head -8

# details + URL of the newest one
vercel inspect <deployment-url> --scope bruno-vieiras-projects

# build logs (essential when state = ERROR)
vercel inspect <deployment-url> --logs --scope bruno-vieiras-projects | tail -50

# runtime logs (live tail of the production deployment; Ctrl-C-able, use timeout)
vercel logs <deployment-url> --scope bruno-vieiras-projects
```

4. Smoke-test production before declaring success:

```bash
curl -s -o /dev/null -w "%{http_code}\n" https://www.wbdigitalsolutions.com
curl -s -o /dev/null -w "%{http_code}\n" https://brunodev.wbdigitalsolutions.com
curl -s -o /dev/null -w "%{http_code}\n" https://brunov.wbdigitalsolutions.com
# spot-check content actually changed (grep a string from the new release)
```

If the build FAILED: read the build logs, fix, commit, push again. Report the real error to the user; never say "deployed" without seeing state READY + a 200 smoke test.

## Adding a subdomain (cross-team recipe — this exact sequence worked)

`vercel domains add` and `vercel alias` REFUSE cross-team (403 `domain_not_owned` / "don't have access"), because the domain and the project live in different teams. The working path:

```bash
# 1) CNAME in the domain owner's Vercel DNS (brunoteam)
vercel dns add wbdigitalsolutions.com <sub> CNAME cname.vercel-dns.com --scope brunoteam

# 2) Attach the domain to the project via REST (vercel api beta drops POST bodies — use curl)
TOKEN=$(python3 -c "import json,pathlib;print(json.load(open(pathlib.Path.home()/'Library/Application Support/com.vercel.cli/auth.json'))['token'])")
curl -s -X POST "https://api.vercel.com/v10/projects/prj_7f0DQePgCQqWyR4e9D9eT9BERgqK/domains?teamId=team_DJXzqoYxGsCcP4abRaobj4DQ" \
  -H "Authorization: Bearer $TOKEN" -H "Content-Type: application/json" \
  -d '{"name":"<sub>.wbdigitalsolutions.com"}'
# response has verified:false + a TXT challenge in .verification[]

# 3) Create the _vercel TXT challenge in brunoteam DNS (value from step 2)
vercel dns add wbdigitalsolutions.com _vercel TXT "vc-domain-verify=<sub>.wbdigitalsolutions.com,<code>" --scope brunoteam

# 4) Trigger verification (expect verified:true)
curl -s -X POST "https://api.vercel.com/v9/projects/prj_7f0DQePgCQqWyR4e9D9eT9BERgqK/domains/<sub>.wbdigitalsolutions.com/verify?teamId=team_DJXzqoYxGsCcP4abRaobj4DQ" \
  -H "Authorization: Bearer $TOKEN"

# 5) Smoke test (SSL is issued automatically, allow ~10-30s)
curl -sL -o /dev/null -w "%{http_code}\n" https://<sub>.wbdigitalsolutions.com
```

If the subdomain must serve a specific page, add a host-based rewrite in `next.config.js` `beforeFiles` (see the brunodev/brunov entries) BEFORE deploying.

## Scope gotchas (they cost an hour once)

- The CLI has a sticky "current scope" (the ✔ in `vercel teams ls`); a wrong scope makes project commands 404. Pass `--scope` explicitly on every command.
- Domain OWNERSHIP listing: `vercel domains ls --scope brunoteam`. DNS records: `vercel dns ls wbdigitalsolutions.com --scope brunoteam`.
- Project's attached domains (the source of truth for what serves where):
  `curl -s "https://api.vercel.com/v9/projects/<projectId>/domains?teamId=<teamId>" -H "Authorization: Bearer $TOKEN"`
- Subdomains pointing to the VPS (`45.90.123.190`: chatbot, agenda, api.crm, ...) are A records in the same DNS zone — do not touch them.

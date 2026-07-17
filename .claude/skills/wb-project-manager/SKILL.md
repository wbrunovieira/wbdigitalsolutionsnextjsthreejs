---
name: wb-project-manager
description: Manage this repo's pending work as issues/milestones in the WB Project Manager app (project "Site Wb Digital Solutions") via its REST API. Use whenever the task is tracking project work for this site: creating/listing/updating issues, moving an issue's status as work progresses, or organizing milestones/sprints. Encodes the base URL, auth (key file location), all workspace/project/status IDs, the SLA auto-effects on status change, and every route. STANDING RULE: keep issue status in sync with the actual work (In Progress when you start, Done when it ships).
---

# WB Project Manager API

Track pending work for the **Site Wb Digital Solutions** project entirely via REST.
Read this whole file before acting.

## The standing rule (why this skill exists)

Whenever you pick up, start, or finish a tracked task, **update its issue status**:
- Starting work  -> move the issue to **In Progress** (`statusId` below).
- Shipped/verified -> move it to **Done**.
Status changes drive SLA metrics automatically (see below), so keeping the board
truthful is the whole point. Do not leave finished work sitting in Todo/In Progress.

## Auth (required on every call)

- **Base URL:** `https://projects.wbdigitalsolutions.com`
- **API key** lives at **`~/.wb_pm_key`** (chmod 600, outside the repo). Load it into a
  shell var and never echo it or paste it into a message/commit:
  ```bash
  BASE=https://projects.wbdigitalsolutions.com
  KEY=$(cat ~/.wb_pm_key)          # never print $KEY
  ```
  Every request carries `-H "Authorization: Bearer $KEY"`.
- Missing/wrong key -> **401**. Do NOT parse the 401 body; trust only the status code.
- **403** = the key's user is not a member of that workspace (should not happen here).
- You operate as **Bruno Vieira** (`cmge96f1y0000wa7olxm69prv`) = default assignee/creator.

Verify the key works:
```bash
BASE=https://projects.wbdigitalsolutions.com; KEY=$(cat ~/.wb_pm_key)
curl -s -o /dev/null -w "%{http_code}\n" -H "Authorization: Bearer $KEY" \
  "$BASE/api/issues?projectId=cmhc0c1ga002bwac4lm87kyw2"   # 200 = ok
```

## Reference IDs

| What | ID |
|---|---|
| Workspace (WB Digital Solutions) | `cmge96f200001wa7ouziczg0w` |
| Project (Site Wb Digital Solutions) | `cmhc0c1ga002bwac4lm87kyw2` |
| User (Bruno Vieira) | `cmge96f1y0000wa7olxm69prv` |

**Statuses** — use the `statusId` when creating/updating an issue, and the `type` when
filtering on GET (the two are NOT interchangeable, see Gotchas):

| Name | statusId | type |
|---|---|---|
| Backlog | `cmge9i3pt0005walququqw1rx` | `BACKLOG` |
| Todo | `cmge9i3pv0007walqv7is970v` | `TODO` |
| In Progress | `cmge9i3pv0009walqbwhmule6` | `IN_PROGRESS` |
| Done | `cmge9i3pw000bwalqn1glwrn4` | `DONE` |
| Canceled | `cmge9i3pw000dwalqi5qgpguo` | `CANCELED` |

- **Priorities:** `URGENT` | `HIGH` | `MEDIUM` | `LOW` | `NO_PRIORITY`
- **Issue types:** `FEATURE` | `MAINTENANCE` | `BUG` | `IMPROVEMENT` (default `FEATURE`)

## SLA auto-effects on status change (server-computed, do not set manually)

A `PATCH` that changes `statusId` makes the server compute SLA fields itself:
- -> `IN_PROGRESS` (first time): sets `firstResponseAt`.
- -> `DONE`: sets `resolvedAt` and `resolutionTimeMinutes` (business hours: Mon-Fri 9-18h).
- `DONE` -> anything else (reopen): increments `reopenCount`, clears `resolvedAt`.

## Issues

**List** — `GET /api/issues`. Optional query params: `workspaceId`, `projectId`,
`assigneeId`, `priority`, and `status` (here `status` is the **TYPE**, e.g. `IN_PROGRESS`).
```bash
curl -s -H "Authorization: Bearer $KEY" \
  "$BASE/api/issues?projectId=cmhc0c1ga002bwac4lm87kyw2&status=TODO"
```

**Get one** — `GET /api/issues/{id}` (returns status, assignee, labels, comments).

**Create** — `POST /api/issues`. Required: `title`, `workspaceId`, `statusId`.
Optional: `description`, `projectId`, `milestoneId`, `featureId`, `assigneeId`,
`priority`, `type`, `reportedAt`, `labelIds[]`. `identifier` (#104...) is auto-generated.
```bash
curl -s -X POST "$BASE/api/issues" \
  -H "Authorization: Bearer $KEY" -H "Content-Type: application/json" \
  -d '{
    "title": "Implementar página de contato",
    "description": "Form com validação e envio por e-mail",
    "workspaceId": "cmge96f200001wa7ouziczg0w",
    "projectId": "cmhc0c1ga002bwac4lm87kyw2",
    "statusId": "cmge9i3pv0007walqv7is970v",
    "priority": "HIGH",
    "type": "FEATURE"
  }'
```

**Update / change status** — `PATCH /api/issues/{id}` (partial; send only changed fields).
Fields that accept `null` to clear: `description`, `projectId`, `milestoneId`,
`featureId`, `assigneeId`, `reportedAt`. Changing `statusId` triggers the SLA above.
```bash
# Move to In Progress
curl -s -X PATCH "$BASE/api/issues/ISSUE_ID" \
  -H "Authorization: Bearer $KEY" -H "Content-Type: application/json" \
  -d '{"statusId": "cmge9i3pv0009walqbwhmule6"}'
```

**Delete** — `DELETE /api/issues/{id}`.

**Bulk create (<= 100)** — `POST /api/issues/bulk`. Body:
`{ "workspaceId": "...", "issues": [ {title, statusId, projectId, ...}, ... ] }`.
```bash
curl -s -X POST "$BASE/api/issues/bulk" \
  -H "Authorization: Bearer $KEY" -H "Content-Type: application/json" \
  -d '{
    "workspaceId": "cmge96f200001wa7ouziczg0w",
    "issues": [
      {"title":"Setup do repositório","statusId":"cmge9i3pv0007walqv7is970v","projectId":"cmhc0c1ga002bwac4lm87kyw2","type":"FEATURE"},
      {"title":"Configurar CI","statusId":"cmge9i3pt0005walququqw1rx","projectId":"cmhc0c1ga002bwac4lm87kyw2","priority":"MEDIUM"}
    ]
  }'
```

**Reorder within a status column** — `POST /api/issues/reorder`. Body:
`{ "issueId": "...", "statusType": "TODO", "sortedIssueIds": ["id1","id2",...] }`
(pass the FULL ordered list of IDs in that column).

## Milestones

- **List** — `GET /api/milestones?projectId=cmhc0c1ga002bwac4lm87kyw2`
- **Create** — `POST /api/milestones`. Required: `name`, `projectId`. Optional:
  `description`, `startDate`, `targetDate` (ISO 8601, e.g. `2026-08-15T00:00:00.000Z`).
  ```bash
  curl -s -X POST "$BASE/api/milestones" \
    -H "Authorization: Bearer $KEY" -H "Content-Type: application/json" \
    -d '{
      "name": "Sprint 1 — Fundação",
      "description": "Setup, layout base e páginas institucionais",
      "projectId": "cmhc0c1ga002bwac4lm87kyw2",
      "targetDate": "2026-08-15T00:00:00.000Z"
    }'
  ```
- **Get / Update / Delete** — `GET|PATCH|DELETE /api/milestones/{id}`. PATCH accepts
  partial: `name`, `description`, `startDate`, `targetDate`.
- **Reorder** — `POST /api/milestones/reorder`.

## Recommended flow (starting from a blank project)

1. `POST /api/milestones` to create the sprints/milestones under the project.
2. `POST /api/issues/bulk` to seed the initial issues (with `projectId`, optional `milestoneId`).
3. As work moves, `PATCH /api/issues/{id}` changing `statusId` — SLA records itself.
4. `GET /api/issues?projectId=...&status=IN_PROGRESS` to watch the board.

## Gotchas

- **`status` on GET is the TYPE (`IN_PROGRESS`); `statusId` on POST/PATCH is the cuid.**
  They are different values for the same column. Mixing them up is the #1 mistake.
- Dates are ISO 8601. `milestoneId`/`assigneeId`/etc. accept `null` to disassociate.
- Bulk is capped at 100 issues per request.
- On 401, trust the status code, not the body. 403 = wrong workspace membership.

## Note on the key

The canonical key file is `~/.wb-project-manager-api-key`; `~/.wb_pm_key` is just the
short alias this skill reads. If `~/.wb_pm_key` is missing, restore it with
`cp ~/.wb-project-manager-api-key ~/.wb_pm_key && chmod 600 ~/.wb_pm_key` (or ask Bruno
for the key if neither exists). It is delivered out-of-band and never lives in the repo.

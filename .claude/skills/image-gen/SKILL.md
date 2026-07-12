---
name: image-gen
description: Generate premium brand images (blog heroes, OG cards, illustrations) for WB Digital Solutions via Google Vertex AI (Gemini 3 Pro Image, aka "Nano Banana Pro"), billed per image to the wbdigitalsolutions Google Cloud card. Use when the user wants to create/generate/regenerate an image, blog hero, OG/social card, or illustration. Encodes the exact auth + API call that works here, the brand art direction, and the save-to-repo workflow.
---

# Image generation (Vertex AI · Gemini 3 Pro Image / Nano Banana Pro)

The working path (rediscovered 2026-07-12). NOT AI Studio API keys (those are on
a depleted prepay project) and NOT third-party APIs. It is **Vertex AI**, billed
pay-as-you-go to the card on the wbdigitalsolutions Google Cloud billing account.

## The exact setup that works

| What | Value |
|---|---|
| Auth | `gcloud`, account `bruno@wbdigitalsolutions.com` (token via `gcloud auth print-access-token`) |
| Project | `gen-lang-client-0038461395` ("Default Gemini Project") — has Vertex API enabled + billing linked |
| Model | `gemini-3-pro-image-preview` |
| Endpoint | `https://aiplatform.googleapis.com/v1/projects/gen-lang-client-0038461395/locations/global/publishers/google/models/gemini-3-pro-image-preview:generateContent` (location `global` works) |
| Billing | pay-as-you-go, card on billing account `01B1D9-0E139F-3CCF3E` (a few R$ per image) |

**If the token fails** with "Reauthentication failed / cannot prompt during
non-interactive execution": the gcloud session expired. The user must run an
interactive login themselves — tell them to type `! gcloud auth login` in the
session and pick `bruno@wbdigitalsolutions.com`. Only then can the token be minted.

## Generate (Python, stdlib only)

```python
import json, base64, subprocess, urllib.request, os
PROJECT="gen-lang-client-0038461395"; MODEL="gemini-3-pro-image-preview"
PROMPT="<your prompt>"
tok=subprocess.check_output(["gcloud","auth","print-access-token"]).decode().strip()
body={"contents":[{"role":"user","parts":[{"text":PROMPT}]}],
      "generationConfig":{"responseModalities":["IMAGE"],"imageConfig":{"aspectRatio":"16:9"}}}
url=f"https://aiplatform.googleapis.com/v1/projects/{PROJECT}/locations/global/publishers/google/models/{MODEL}:generateContent"
req=urllib.request.Request(url,data=json.dumps(body).encode(),
    headers={"Authorization":f"Bearer {tok}","Content-Type":"application/json"})
r=json.loads(urllib.request.urlopen(req,timeout=180).read())
parts=r["candidates"][0]["content"]["parts"]
img=next(p["inlineData"]["data"] for p in parts if "inlineData" in p)
open("out.png","wb").write(base64.b64decode(img))
```

- `aspectRatio`: "16:9" (hero), "1:1", "4:3", "3:2", "1.91:1" etc.
- Editing an existing image: add an `inlineData` part (base64 PNG + mimeType) to
  the `parts` alongside the text prompt (same endpoint) to have it edit rather
  than generate from scratch. The banana extension also has `edit.py`.
- Cost tracking / a plain fallback generator also live in the claude-seo banana
  extension: `~/.claude/skills/seo/extensions/banana/scripts/generate.py` (but it
  targets AI Studio prepay by default; for card billing use the Vertex call above).

## Brand art direction (apply to every image so they read as one system)

- **Style:** cinematic editorial 3D / premium photoreal, "Apple-keynote elegance", 50mm, shallow DoF, volumetric warm light.
- **Palette:** deep aubergine/purple background (#1a0826 → #350545 / #792990), warm amber-gold accent (#ffb947) as the intelligence/focus light, soft lavender (#aaa6c3) secondary. Balance amber AND purple (don't let amber dominate).
- **Mood:** intelligent, calm, human-centered, optimistic. Real and grounded, NOT mystical.
- **Always avoid (negative):** robot, android, humanoid machine, glowing brain, plasma/energy orb, mystical floating sphere, blue circuit board, binary code, garbled fake text on documents/screens (the #1 AI tell — make text abstract/blurred), UI-card clutter, cheesy stock, watermark, any text.
- **Messaging note (from the AI-agents post):** show AI as a REAL tool integrated
  into a workspace (a screen, a laptop, software organizing work), NOT magic; and
  include a calm human to carry "augments, does not replace." A glowing energy orb
  reads as magic and works against a demystifying message.

## Save into the repo (scratchpad is temporary!)

Generated PNGs land in scratchpad. To keep one, optimize + move into the project:

```bash
sips -s format jpeg -Z 1600 scratchpad/out.png --out public/img/blog/<name>.jpg      # in-post, 16:9
# OG 1200x630: resize width to 1200 then center-crop height to 630
sips -s format jpeg -z 675 1200 scratchpad/out.png --out /tmp/og.jpg
sips -c 630 1200 /tmp/og.jpg --out public/img/blog/og-<name>.jpg
```

To preview an image in the user's OWN browser (not the automated one): `open -a "Google Chrome" <path>`.

## Review before shipping

For a flagship/hero image, spawn a senior-art-director agent (general-purpose,
give it the file path to Read) to critique for AI tells (garbled text, scale,
brand balance, concept clarity) and suggest a refined regen prompt. Two rounds
took the AI-agents hero from abstract → premium & on-message.

Related: [[seo-ops]] (blog/SEO program), the `deploy` skill (shipping).

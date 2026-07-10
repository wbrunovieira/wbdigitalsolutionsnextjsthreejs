# Plan: /3d-showcase visual & UX overhaul

Status: PLANNED (not started) · Created 2026-07-10 · Owner: Bruno

Consolidates a two-agent review (senior UI/UX + senior Three.js/R3F technical
art) of the live `/3d-showcase` page, ranked by impact. The scene's engineering
exists; composition and the 2D overlay are rough. Screenshots that seeded this
review captured the two failure modes clearly: colliding floating type + a flat
dark room, and a scattered, off-brand HUD.

Existing notes in `src/components/3d-showcase/docs/IMPROVEMENTS.md` /
`ideias.md` are not duplicated here — this complements them.

---

## Tier 1 — reads as "broken" (do first)

1. **Floating service words have no spatial system** [medium · TOP]. Each desk
   word is placed at a *local* `[0,1.5,-1]` (`Desk.tsx:82`) but desks sit at
   different world positions/rotations (`OfficeScene.tsx:170,185,208`) and all
   words face +Z → they pile onto each other and the desks. Each word is also
   rendered **3×** (black offset copies for fake depth, `Desk.tsx:83-147`) →
   ghosting + z-fight. Fix: one `Text3D` (real bevel/outline, no copies) +
   `<Billboard>` so words face the camera + a single shared `fontSize` and a
   fixed "type lane" Y anchored per-desk.
2. **"Press the Button" label clipped off-screen + oversized cartoon hand**
   [medium]. `PointerHand.tsx` renders a 192px `Html` hand + label at
   `distanceFactor={8}`; the A.I. desk at `x=5` pushes it off-frame. Fix: replace
   with a native-3D affordance at the button (pulsing emissive ring / make the
   `Button3D` itself pulse when idle) or a world-unit `<Billboard><Sprite>` at
   ~1/4 size; drop the redundant label (the HUD already says "Click buttons").
3. **Dead black "TV" + unreadable code screen + dead component** [medium]. The
   black panel is the **window** glass over nothing (`Room.tsx:408-418`) — no
   skybox behind it. The back-wall code screen (`Room.tsx:260-377`) is tiny green
   text on near-black, illegible. `Monitor.tsx` (a crisp `Html transform` code
   panel) is **imported nowhere** — dead code. Fix: put an HDRI/gradient behind
   the window; make the code screen emissive + larger unlit text, or wire up the
   existing `Monitor.tsx`.

## Tier 2 — the premium jump

4. **Lighting is flat, no environment map** [medium]. `Lighting.tsx` =
   `ambientLight 0.8` + weak lights, no IBL, so `metalness>0` materials have
   nothing to reflect (read as cardboard). Fix: `<Environment preset="city">` +
   3-point rig (amber key `#ffb947`, purple fill `#792990`, rim) + ambient ~0.25;
   `<SoftShadows>`/`<AccumulativeShadows>` desktop-only.
5. **No bloom — emissives don't glow** [medium]. Lots of `emissive` set but no
   postprocessing. Fix: `<EffectComposer><Bloom>` (@react-three/postprocessing),
   desktop-only, `material-toneMapped={false}` on brand emissives. Biggest cheap
   "wow" once lighting lands.
6. **Materials/floor don't ground objects** [medium]. Flat-color desks/walls, a
   non-reflective floor. Fix: `<MeshReflectorMaterial>` floor + `<ContactShadows>`
   under desks (replace the fake emissive ring decals); add micro normal/roughness
   maps + a little `clearcoat` on desks.
7. **HUD = three unrelated visual languages, off-brand palette** [medium]. Exit
   (heavy purple gradient), language chips (cheap gray), Controls (glass) — none
   use brand tokens (it's Tailwind `purple-600`, not `#792990`), no brand font.
   Fix: one `<HudPanel>` glass token (`bg-[#350545]/60 backdrop-blur-md
   rounded-xl border-white/10`), brand colors, Plus Jakarta; keep only Exit loud.

## Tier 3 — structure, conversion, polish, perf

8. **No onboarding + unbranded loader** [medium]. Drops straight into the room;
   loader is white "Loading 3D Environment…" text. Fix: a branded entry overlay
   (logo + "Explore our services in 3D" + a "Start" button that doubles as the
   first-gesture mount trigger) and a branded loader (`wb-loadbar` keyframe /
   `useProgress`). **Fold cookie consent into this overlay** (see note below).
9. **No conversion path** [medium]. Only exit is "Exit → /websites" for everyone.
   Fix: a context-aware yellow CTA using the already-tracked `activeButton`
   (A.I. desk active → "Explore A.I. →" to `/ai`); keep Exit as neutral back.
10. **i18n incomplete on mobile** [quick]. Hardcoded PT strings ("Toque e
    arraste", "Sites/Automação/I.A." at `index.tsx` L172/176/214/223/232) — breaks
    the 4-locale rule. Move into `getTexts()`.
11. **Mobile is a mouse-look premise** [medium]. Decide: curated tap-through
    (buttons become primary UX, autoplay orbit) vs a "best on desktop"
    interstitial. Also single-source `isMobile` (recomputed in both `index.tsx`
    and `OfficeScene.tsx`).
12. **Perf/mobile hygiene** [medium]. Canvas has no `dpr` cap, `shadows` +
    `frameloop="always"`, 2048² shadows on mobile, and `FloatingParticles` makes
    **200 individual sphere meshes** placed *outside* the walls (invisible cost).
    Fix: `dpr={[1,2]}`, `shadows={!isMobile}`, `AdaptiveDpr`/`AdaptiveEvents`,
    particles → `<Points>`/`<Instances>` (1 draw); memoize/dispose geometries
    (CLAUDE.md rule not honored); move `Date.now()` scanline into `useFrame`
    (`HolographicInfo.tsx:347`).
13. **A11y** [quick-medium]. `aria-label`/`aria-pressed` on language chips + icon
    buttons, `aria-hidden` on decorative SVGs, visible `focus-visible` rings.

## HolographicInfo vs wall screen [quick]
The active-desk hologram panel (`OfficeScene.tsx:181`, desk+`[0,5.5,0]`) lands in
front of the back-wall code screen → two big text blocks in one sightline.
Anchor the hologram to its own desk (Billboard, lower Y) or move its bullets into
the HUD.

---

## Cookie-consent note (a UI-agent suggestion was REJECTED)

The review's original #1 ("add `/3d-showcase` to the `CookieConsent` bypass like
`/dev` and `/vendas`") is **wrong and was dropped**:
- `CookieConsent` persists the choice in `localStorage['wb-consent-v2']` and
  `return null`s once chosen (`CookieConsent.tsx:165-186`) — so a visitor who
  consented anywhere on the site **does not** see the banner here. It only shows
  to a first-time visitor landing *directly* on `/3d-showcase`.
- `/3d-showcase` is a **WB company page on www** that loads GA4/Pixel/Clarity, so
  under LGPD/GDPR the banner **must** appear until a choice is made. Bypassing it
  = compliance violation. (`/dev`,`/vendas` bypass is different: personal CV
  subdomains with cookieless analytics.)
- The only legit improvement, and only for the narrow direct-lander case: **fold
  the consent into the onboarding overlay (item 8)** so first-timers get a branded
  gate instead of a bar over the scene. Not urgent.

---

## Suggested sequencing
Quick wins first: **10** (PT strings), **7** (HUD glass+brand), kill the "Watch the
ball bounce!" line + auto-collapse Controls. Then the visual combo that fixes
"looks broken": **1** (word layout) + **4** (lighting/Environment) → **5** (bloom)
+ **6** (reflector floor). Then de-clutter: **2** (markers) + **3** (window/screen).
Then polish/perf: **8** (onboarding+consent), **9** (CTA), **12** (perf), **13**
(a11y), **11** (mobile decision).

Key files: `OfficeScene.tsx` (rig/camera/canvas + all HUD JSX is in
`pages/3d-showcase/index.tsx`), `Desk.tsx:82-148` (word placement), `Lighting.tsx`,
`Room.tsx` (floor `:169-189`, wall screen `:260-377`, window `:408-418`),
`PointerHand.tsx`, `FloatingParticles.tsx`, dead `Monitor.tsx`.

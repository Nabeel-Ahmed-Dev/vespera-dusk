# Vespera Dusk — Plan

## Product summary

**Vespera Dusk** is a single-page marketing landing for a luxury fragrance. The page is a sunset: scrolling is time passing from golden hour into night; the bottle is the sun we follow down. Desktop Figma (`4:2`) is the layout source of truth; mobile (`24:2`) is a visual reference; motion notes live at `13:2`. Prefer `design-handoff/` over live Figma when MCP quota is exhausted. All copy is placeholder until content is finalized.

**Stack (locked for this project):** Next.js 16.4.6 App Router · React 19.3.1 · Tailwind CSS 4.3.5 (CSS-first) · TypeScript 5.9.3 · ESLint 9 · GSAP 3.15.1 · `@gsap/react` 2.1.2 · Lenis 1.3.27. Do not bump versions without an explicit decision. Read `AGENTS.md` before writing Next.js code.

**Process:** Karpathy-style — small, verifiable steps; one step = one branch = one reviewable change; human approves before merge. See `docs/workflow.md`.

---

## Roadmap

### Step 1 — Scaffold + harness + assets

| | |
|---|---|
| **Status** | **Done** (this commit) |
| **Goal** | Lock the project harness so later steps share one plan, workflow, design tokens reference, motion spec, and Cursor rules. |
| **Scope** | `docs/plan.md`, `docs/workflow.md`, `docs/design.md`, `docs/motion-spec.md`, `.cursor/rules/*.mdc`. Scaffold already present; design handoff in `design-handoff/`; images in `public/images/`. |
| **Out of scope** | UI, sections, animations, font wiring, tokens in CSS, content file, version bumps. |
| **Acceptance** | All harness docs and rules exist; Step 1 marked done; no UI code added in this step. |
| **Verify** | `pnpm lint && pnpm build` (scaffold still green); confirm files listed above exist. |

### Step 2 — Design tokens, fonts, content

| | |
|---|---|
| **Goal** | Establish visual foundation and a single source of placeholder copy. |
| **Scope** | `@theme` tokens in `globals.css`; `next/font` — Cormorant Garamond 300/400/500 + italics (display), Manrope 400–800 (body), Montserrat 600 (logo); `src/content/site.ts` for all placeholder copy. |
| **Out of scope** | Section layouts, motion, new dependencies. |
| **Acceptance** | Tokens match `docs/design.md`; fonts load via `next/font`; every placeholder string lives in `site.ts` only. |
| **Verify** | `pnpm lint && pnpm build`; spot-check rendered font families in browser. |

### Step 3 — Static desktop layout

| | |
|---|---|
| **Goal** | Ship the full desktop composition with no animation. |
| **Scope** | Nav, Hero, Story, Scent Pyramid, Craft/Vessel, Social Proof, Offer/Buy, Guarantee+FAQ, Final CTA+Footer — static markup/styles only. |
| **Out of scope** | Motion, mobile breakpoints polish beyond basic flow, interactivity beyond static links/toggles stubs if needed for layout. |
| **Acceptance** | All sections present and match desktop Figma/`design-handoff` structure at desktop widths. |
| **Verify** | `pnpm lint && pnpm build`; browser check at ~1440px against handoff. |

### Step 4 — Mobile 390 layout

| | |
|---|---|
| **Goal** | Match the 390-wide mobile composition. |
| **Scope** | Responsive layout for all sections at 390px; visual ref = mobile Figma `24:2` + `design-handoff/web/mobile_v2.html`. |
| **Out of scope** | Motion, custom cursor, magnetic CTAs. |
| **Acceptance** | Page reads correctly at 390 width; no horizontal overflow; section order preserved. |
| **Verify** | `pnpm lint && pnpm build`; browser check at 390×844. |

### Step 5 — Motion foundation

| | |
|---|---|
| **Goal** | Wire scroll and GSAP infrastructure without section-specific flourishes. |
| **Scope** | Lenis driven by `gsap.ticker`; plugin registration in `src/lib/gsap.ts`; `gsap.matchMedia` for desktop / mobile / reduced-motion; scroll-linked sunset gradient via CSS vars. |
| **Out of scope** | Preloader, bottle tilt, SplitText reveals, marquee, drawers, cursor. |
| **Acceptance** | Smooth Lenis+GSAP scroll; gradient scrubs Hero→Notes; reduced-motion path exists; no ScrollSmoother. |
| **Verify** | `pnpm lint && pnpm build`; scroll gradient in browser; toggle `prefers-reduced-motion`. |

### Step 6 — Preloader + Hero

| | |
|---|---|
| **Goal** | First impression: load ritual and hero bottle/DUSK motion. |
| **Scope** | Preloader (clock 00:00→18:47, DUSK mask rise, gold curtain; skip via `sessionStorage`); hero bottle idle/tilt/scrub; DUSK SplitText; liquid light sweep on hero bottle. |
| **Out of scope** | Story/Notes/Craft/Proof/Offer motion. |
| **Acceptance** | Matches `docs/motion-spec.md` Hero + Load; repeat visits skip preloader. |
| **Verify** | `pnpm lint && pnpm build`; fresh session + repeat session browser checks. |

### Step 7 — Story + Scent Pyramid reveals

| | |
|---|---|
| **Goal** | Narrative and notes sections animate on scroll. |
| **Scope** | Story SplitText line masks, image clip reveal, stats/clock/count-up, N° 01 badge; Scent Pyramid band fills, note pills, hover highlight. |
| **Out of scope** | Craft, Social Proof, Offer, FAQ, cursor. |
| **Acceptance** | Spec behaviors for Story + Scent Pyramid; mobile uses shorter/simpler reveals if needed. |
| **Verify** | `pnpm lint && pnpm build`; scroll through both sections desktop + 390. |

### Step 8 — Craft, Social Proof, magnetic CTAs, cursor

| | |
|---|---|
| **Goal** | Mid-page craft/proof polish and pointer affordances. |
| **Scope** | Craft/Vessel scrub + parallax + dividers; press marquee; Draggable+Inertia reviews; star fill; magnetic CTAs; custom cursor (desktop/fine pointer only). |
| **Out of scope** | Offer drawer/stock, sticky buy bar, FAQ, Final CTA motion. |
| **Acceptance** | Spec behaviors; mobile: no cursor/tilt/magnetic; marquee → plain scroll on touch. |
| **Verify** | `pnpm lint && pnpm build`; desktop pointer + touch device/emulation checks. |

### Step 9 — Offer, sticky buy, FAQ, Final CTA

| | |
|---|---|
| **Goal** | Conversion block motion and checkout-adjacent UI. |
| **Scope** | Size toggle price roll + price/ml; stock meter 71%; Add-to-bag drawer ($8 sample); sticky buy bar; FAQ accordion; Final CTA zoom/vignette/letter stagger; giant VESPERA footer parallax; Offer bottle light sweep. |
| **Out of scope** | Real payments, backend, a11y/perf final pass (Step 10). |
| **Acceptance** | Spec behaviors; sticky bar shows/hides per rules; FAQ opens with promise highlight. |
| **Verify** | `pnpm lint && pnpm build`; interact size toggle, drawer, FAQ, sticky bar. |

### Step 10 — Accessibility, reduced motion, performance

| | |
|---|---|
| **Goal** | Ship WCAG 2.2–minded, calm, and performant. |
| **Scope** | Reduced-motion: scrubs → 0.3s opacity fades; no parallax/marquee/idle/preloader; honey focus rings; keyboard for accordion/carousel/toggles; animate only transform/opacity/clip-path; `next/image` bottle PNGs with hero `priority`. |
| **Out of scope** | New features or visual redesign. |
| **Acceptance** | Keyboard paths work; reduced-motion respected; no layout-thrashing animations; Lighthouse/perf sanity pass. |
| **Verify** | `pnpm lint && pnpm build`; keyboard-only pass; `prefers-reduced-motion`; spot-check Network/Performance. |

# Vespera Dusk — Motion Spec

From UI Designer GSAP plan. Implement from Step 5 onward; this doc is the contract.

## Concept

The page is a sunset. Scrolling is time passing — golden hour into night. The bottle is the sun we follow down.

## Stack & feel

| | |
|---|---|
| **Plugins** | ScrollTrigger, SplitText, Observer / Draggable + InertiaPlugin (reviews); Flip optional for size toggle |
| **Smooth scroll** | Lenis driven by `gsap.ticker` — **not** ScrollSmoother |
| **React** | `useGSAP` + `gsap.context`; register plugins once in `src/lib/gsap.ts` |
| **Breakpoints** | `gsap.matchMedia` for desktop / mobile / reduced-motion |
| **Feel** | `expo.out` reveals; `power2.inOut` scrubs; elastic **only** on magnetic buttons; `scrub: 1` |
| **Perf** | Animate only `transform` / `opacity` / `clip-path`; `next/image` for bottle PNGs with `priority` on hero |

---

## Load / Preloader

- Clock counts `00:00` → `18:47` while **DUSK** letters rise out of a mask.
- Gold curtain wipes up.
- Duration **1.6s**, ease `expo.out`.
- Skip on repeat visits (`sessionStorage`).

---

## Global background

- Scroll-linked gradient `#E7C07F` → `#A9681F` → `#0E0B08` from **Hero** to **Notes** via CSS vars in a scrubbed ScrollTrigger.
- Text colour flips at midpoint.
- **Proof** and **Offer** go ivory.
- **Final CTA** returns to night.

---

## Hero

### Bottle

- Idle bob `±6px`, `4s` yoyo.
- `±6°` tilt toward cursor (`quickTo`).
- Scroll scrub `0–100vh`: rotate `0` → `-14°`, scale `1` → `0.82`, sinking into Story.

### DUSK

- SplitText chars.
- **D, U** drift left; **S, K** drift right at `0.6–1.2×` speed, then fade.
- Scrubbed stagger `0.04`.

### Liquid light sweep (Hero & Offer bottle)

- Masked diagonal gradient crosses glass every `6s` and on hover.
- `1.2s` `sine.inOut`, `mix-blend-mode: screen`.

---

## Story

- SplitText lines in overflow masks: `yPercent 100` → `0`, `0.9s`, stagger `0.12`, `expo.out`.
- Italic line from `x: 40`.
- Image: `clip-path` inset reveal bottom → top + zoom `1.15` → `1`.
- Stats: `18:47` ticks like a clock; `22%` and `12h+` count up once.
- **N° 01** badge rotates `360°` every `20s`.

---

## Scent Pyramid

- Bands fill bottom-up (**Base → Heart → Top**): `scaleY` from bottom, `0.6s`, stagger `0.15`.
- Note pills fade up, stagger `0.04`.
- Hover row highlights that band, dims others.

---

## Craft / Vessel

- Label close-up: scale `1.15` → `1` scrub.
- Inset photo parallax `-80px`.
- Divider lines: `scaleX 0` → `1` per row, `0.8s` `power2.out`.

---

## Social Proof

- Press marquee: infinite `40s` loop; slows on hover via `timeScale`.
- Reviews: Draggable carousel with inertia.
- Stars fill L → R on enter.

---

## CTAs (magnetic)

- Magnetic within `80px`, strength `0.3`; label counter-moves.
- Hover: honey fill rises from bottom, `0.4s` `elastic.out(1, 0.4)`.

---

## Sticky buy bar

- `y: 80` → `0`, `0.45s` `power3.out` once hero CTA leaves viewport.
- Hidden while Offer is in view.

---

## Offer

- Size toggle rolls price digits `$125` ↔ `$185`, `0.5s`; updates price/ml.
- Stock meter fills to `71%` on enter, `1.2s`.
- Add to bag opens drawer offering `$8` sample.
- (Bottle light sweep — see Hero.)

---

## FAQ / Guarantee

- Height auto-animate; `+` rotates to `−`; `0.35s` `power2.out`.
- Opening **What if it isn't for me?** highlights the 30-day promise.

---

## Final CTA + Footer

- BG image zoom `1.1` → `1`; vignette deepens to night.
- **Wear the hour.** letter-by-letter stagger `0.03`.
- Giant **VESPERA** footer rises with parallax.

---

## Cursor

- `8px` honey dot grows to `64px` with **View** / **Drag** label over media.
- Desktop / fine pointer only.

---

## Mobile

- No cursor, tilt, or magnetic.
- Keep bottle scrub & DUSK split with shorter distances.
- Marquee becomes plain scroll on touch.
- Swap pinning for simple reveals if janky.

---

## Reduced motion

- Every scrub becomes a `0.3s` opacity fade.
- No parallax, marquee, idle loops, or preloader.
- Honey focus rings; full keyboard access to accordion, carousel, toggles (WCAG 2.2).

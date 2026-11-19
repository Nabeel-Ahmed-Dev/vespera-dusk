# Step 7e: Hero + nav layout to match desktop Figma (4:2)

Branch: `step-07e-hero-layout` (already checked out). Work ONLY on this branch. Do not commit, push, create branches or start a dev server; just edit files and report.

## Rules (read first)
- LAYOUT ONLY for the Nav and the Hero at the `lg` breakpoint (>= 1024px). Every new class below is `lg:`-prefixed unless the brief says otherwise, so mobile/tablet (< 1024px) must render exactly as today.
- Do NOT change any copy (`src/content/site.ts` is untouched), any GSAP/motion code (everything inside `useGSAP`, refs, `js-*` classes, `data-*` attributes), or the existing hero seam fade (the `linear-gradient(180deg,transparent_72%,#A9681F_100%)` layer in Hero.tsx and the existing `html[data-sunset="live"] [data-section="hero"]` block in globals.css stay byte-identical).
- Only touch these 3 files: `src/components/sections/Nav.tsx`, `src/components/sections/Hero.tsx`, `src/app/globals.css`. No other file, no new dependencies, no refactors.
- Apply each change below exactly (old -> new class strings). Keep class order as written.

## Figma reference values (desktop frame 4:2, 1440 x 960)
- Edge inset 48px. Nav row: top 28, height 39. Logo 16px Montserrat (0.4em). Links start x=474, 13px, 40px apart. Bag -> Shop button gap 28. Shop button 200 x 39, 13px label, dot 6px #E0AE5C (honey4), 10px dot-to-text.
- Hero: meta labels 11px. Promise block x=48, y=742, w=380: tagline Cormorant italic 34px / 37px line, description 15px / 24px, 16px below tagline.
- Hero CTA block x=1012, y=742, w=380, left-aligned column, 18px gaps: scarcity (8px amber7 dot, 10px gap, 11px label) -> row [ADD TO BAG button 201 x 49] + 14px + [Discover link 45px tall, 12px left padding, underline night/60] -> perks.
- Scroll cue 11px at y=912 (35px above hero bottom, 32px below the promise block). Side meta 11px, rotated, centred at x=26.5 and vertically centred on the hero (Nabeel kept it centred instead of the Figma 225.5px-above-bottom position).
- Background: base #A9681F with a glow ellipse 50% x 47% centred at 50% 53% (stops #F6DCA8 0%, #EED29E 28%, #DFB06A 56%, #C4893E 78%, #A9681F 100%), so the sides darken to #A9681F.

## A. `src/components/sections/Nav.tsx`
A1. Inner wrapper div:
old: `relative mx-auto flex h-[72px] w-full max-w-[1440px] items-center justify-between px-6 sm:px-8 lg:grid lg:grid-cols-[1fr_auto_1fr] lg:px-16`
new: `relative mx-auto flex h-[72px] w-full max-w-[1440px] items-center justify-between px-6 sm:px-8 lg:grid lg:h-auto lg:grid-cols-[calc(100%*426/1344)_auto_1fr] lg:px-12 lg:pt-7`

A2. Logo `<a href="#hero">`: append ` lg:min-h-0 lg:text-[16px] lg:leading-4` to the end of its className (keep everything else).

A3. Links `<ul>`: `hidden items-center gap-8 lg:flex` -> `hidden items-center gap-10 lg:flex`

A4. Actions div: `flex items-center justify-self-end gap-4 lg:gap-5` -> `flex items-center justify-self-end gap-4 lg:gap-7`

A5. Bag `<a href="#offer">` (the text link, not the Button): append ` lg:min-h-0` to the end of its className.

A6. Shop `<Button>`: `className="h-11 px-5 text-[11px]"` -> `className="lg:h-[39px] lg:w-[200px] lg:px-0"` (the wrapper is `hidden lg:block`, so nothing changes below lg).

A7. Dot span inside that Button: `mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-honey3` -> `mr-2.5 inline-block h-1.5 w-1.5 rounded-full bg-honey4`

## B. `src/components/sections/Hero.tsx` (JSX only; do not touch anything above `return (`)
B1. `<SectionShell id="hero" ...>` className. Keep the existing string and insert one `lg:` background right before ` text-night`, so it becomes exactly:
`min-h-screen overflow-hidden bg-[linear-gradient(180deg,transparent_72%,#A9681F_100%),radial-gradient(ellipse_at_50%_40%,#F6DCA8_0%,#D9A355_58%,#A9681F_100%)] lg:bg-[linear-gradient(180deg,transparent_72%,#A9681F_100%),radial-gradient(ellipse_50%_47%_at_50%_53%,#F6DCA8_0%,#EED29E_28%,#DFB06A_56%,#C4893E_78%,#A9681F_100%)] text-night`

B2. Root div (`ref={rootRef}`): replace `lg:px-16 lg:pb-4` with `lg:px-12 lg:pb-[35px]` (rest unchanged).

B3. Desktop top metas: both `<Label className="text-night/60">` -> `<Label className="text-night/60 lg:text-[11px] lg:leading-[13px]">`

B4. Side meta layout shell div:
old: `pointer-events-none absolute top-1/2 left-8 hidden -translate-x-1/2 -translate-y-1/2 -rotate-90 lg:block`
new: `pointer-events-none absolute top-1/2 left-[26.5px] hidden -translate-x-1/2 -translate-y-1/2 -rotate-90 lg:block`
Update the JSX comment above it to: `{/* Layout shell: vertically centred on the 100dvh hero (kept centred by Nabeel over Figma 4:2), rotated with Tailwind. GSAP only fades the inner label. */}`
Its inner `<Label>`: `js-hero-enter js-hero-vertical block whitespace-nowrap text-night/50` -> `js-hero-enter js-hero-vertical block whitespace-nowrap text-night/50 lg:text-[11px] lg:leading-[13px]`

B5. Bottom row container:
old: `relative z-20 mt-2 flex flex-col items-center gap-5 lg:mt-0 lg:grid lg:grid-cols-[1.1fr_0.9fr] lg:items-end lg:gap-5`
new: `relative z-20 mt-2 flex flex-col items-center gap-5 lg:mt-0 lg:flex-row lg:items-start lg:justify-between lg:gap-5`

B6. Promise div: `max-w-xl text-center lg:text-left` -> `max-w-xl text-center lg:w-[380px] lg:max-w-none lg:text-left`

B7. Tagline span (`ref={taglineRef}`): append ` lg:text-[34px] lg:leading-[37px]` to the end of its className.

B8. Description `<p ref={descRef}>`:
old: `js-hero-enter js-headline-line mt-3 hidden max-w-md text-sm leading-relaxed text-night/70 lg:block`
new: `js-hero-enter js-headline-line mt-3 hidden max-w-md text-sm leading-relaxed text-night/70 lg:mt-4 lg:block lg:max-w-none lg:text-[15px] lg:leading-6`

B9. CTA column div:
old: `flex w-full flex-col items-center gap-4 lg:items-end lg:gap-2.5`
new: `flex w-full flex-col items-center gap-4 lg:w-[380px] lg:items-start lg:gap-[18px]`

B10. Inside that column, wrap the `<Button ... js-hero-cta>` AND the Discover `<a ref={discoverRef}>` together in ONE new div, placed where the Button is now (first child of the column). New child order inside the column: [new wrapper div: Button, Discover link], stock `<Label>`, perks `<p>`. The wrapper:
`<div className="contents lg:order-2 lg:flex lg:items-center lg:gap-[14px]">`
(`contents` keeps today's mobile/tablet order via each child's `order-*` class; on lg it becomes the button row.)
- Button className old: `js-hero-enter js-hero-cta order-1 h-14 w-full min-w-0 lg:order-2 lg:w-auto lg:min-w-[240px]`
  new: `js-hero-enter js-hero-cta order-1 h-14 w-full min-w-0 lg:order-none lg:h-[49px] lg:w-[201px] lg:px-0`
- Discover link className old: `js-hero-enter order-3 hidden min-h-11 items-center text-[13px] font-medium text-night/75 underline decoration-night/30 underline-offset-4 sm:inline-flex`
  new: `js-hero-enter order-3 hidden min-h-11 items-center text-[13px] font-medium text-night/75 underline decoration-night/30 underline-offset-4 sm:inline-flex lg:order-none lg:h-[45px] lg:min-h-0 lg:pl-3 lg:decoration-night/60 lg:underline-offset-[9px]`
- Keep all other props (href, magnetic, ref, children) exactly as they are.

B11. Stock `<Label>`:
old: `js-hero-enter js-hero-stock order-2 flex items-center justify-center gap-2 text-[9px] text-night/85 lg:order-1 lg:text-[10px]`
new: `js-hero-enter js-hero-stock order-2 flex items-center justify-center gap-2 text-[9px] text-night/85 lg:order-1 lg:gap-2.5 lg:text-[11px] lg:leading-[13px]`
Its dot span: `inline-block h-1.5 w-1.5 rounded-full bg-amber7` -> `inline-block h-1.5 w-1.5 rounded-full bg-amber7 lg:h-2 lg:w-2`

B12. Perks `<p>`: unchanged.

B13. Scroll hint `<Label>`:
old: `js-hero-enter js-hero-scroll mt-6 hidden text-center text-night/45 sm:block lg:mt-2`
new: `js-hero-enter js-hero-scroll mt-6 hidden text-center text-night/45 sm:block lg:mt-8 lg:text-[11px] lg:leading-[13px]`

## C. `src/app/globals.css`
Do not edit the existing `html[data-sunset="live"] [data-section="hero"]` block. Directly AFTER it (before the `[data-section="story"]` block) add exactly:

```css
/*
 * Desktop (Figma 4:2): the glow is a 50% x 47% ellipse centred at 50% 53%
 * that reaches #A9681F at the sides. The seam layer is the same as above.
 */
@media (min-width: 64rem) {
  html[data-sunset="live"] [data-section="hero"] {
    background-image: linear-gradient(
        180deg,
        transparent 72%,
        var(--sunset-bg, #e7c07f) 100%
      ),
      radial-gradient(
        ellipse 50% 47% at 50% 53%,
        #f6dca8 0%,
        #eed29e 28%,
        #dfb06a 56%,
        #c4893e 78%,
        #a9681f 100%
      );
  }
}
```

## D. Out of scope (do NOT change)
Bottle / DUSK wordmark / "# 01" sizes and positions, the meta row's vertical position, perks text, all colors except the two dots and the Discover underline above, Button.tsx, Label.tsx, SectionShell.tsx, every other section (their 64px insets stay for later PRs), motion timings, copy.

## E. Verify and report
Run `npx eslint src/components/sections/Nav.tsx src/components/sections/Hero.tsx` and `npx tsc --noEmit`; both must pass. Report the exact diff summary (each changed className) and the command results. Do not run `npm run build` or `npm run dev`.

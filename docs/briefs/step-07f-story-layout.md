# Step 7f: Story layout to match desktop Figma (4:2)

Branch: `step-07f-story-layout` (already checked out). Work ONLY on this branch. Do not commit, push, create branches or start a dev server; just edit files and report.

## Rules (read first)
- LAYOUT ONLY for the Story section at the `lg` breakpoint (>= 1024px). Every new class below is `lg:`-prefixed unless the brief says otherwise, so mobile/tablet (< 1024px) must render exactly as today.
- Only touch ONE file: `src/components/sections/Story.tsx`, and only its JSX (everything after `return (`). Do NOT touch `useGSAP`, refs, `js-*` classes, `data-*` attributes, the section background class, copy (`site.ts`), globals.css or any other file.
- Apply each change below exactly (old -> new class strings). Keep class order as written. No refactors, no new dependencies.

## Figma reference values (Story frame 5:2, 1440 x 1280)
- Section 1280 tall, edge inset 48. Labels 11px at y=120 (13px line box). Headline starts y=170.
- Headline: Cormorant 300, 99px, 104px line pitch, no letter-spacing, 3 lines, full width; line 2 indented 180px. Scales with the viewport below 1440 (6.875vw, 12.5vw).
- Below the headline (58px gap): two columns, left 680 / gap 72 / right 592.
- Right: image 592 x 640 at x=800, y=540; caption (11px label) 20px under the image; badge 140px circle, left edge 70px left of the image, bottom edge 10px below the image (straddles the bottom-left corner, clear of the caption).
- Left: body at x=228 (180px into the 680 column, 26.47%), 430 wide, 18px / 29px, 60px below the image top; attribution 28px under the body, Cormorant italic 22px / 27px, left-aligned at x=228; stats at the bottom, ending 71px above the image bottom: 3 columns of 200 with 40px gaps, number 72px (line-height 1), 1px rule (cream/20) 8px under the number box, label 13px / 20px 8px under the rule. No top border on the stats row.
- Badge text: N(deg) 01 34px italic / 41px line; FIRST EDITION 8px label / 10px line.

## Changes in `src/components/sections/Story.tsx` (JSX only)
1. Root div (`ref={rootRef}`):
old: `mx-auto w-full max-w-[1440px] px-6 py-16 sm:px-8 sm:py-20 lg:px-16 lg:py-32`
new: `mx-auto w-full max-w-[1440px] px-6 py-16 sm:px-8 sm:py-20 lg:px-12 lg:pt-[120px] lg:pb-[67px]`

2. Labels row div:
old: `mb-8 flex items-start justify-between gap-8 sm:mb-10 lg:mb-14`
new: `mb-8 flex items-start justify-between gap-8 sm:mb-10 lg:mb-[37px]`
Story label: `<Label className="text-cream/60">` -> `<Label className="text-cream/60 lg:text-[11px] lg:leading-[13px]">`
Aside label: `<Label className="hidden text-cream/50 lg:block">` -> `<Label className="hidden text-cream/50 lg:block lg:text-[11px] lg:leading-[13px]">`

3. Grid div:
old: `grid grid-cols-1 gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-x-20 lg:gap-y-10`
new: `grid grid-cols-1 gap-8 lg:grid-cols-[680fr_592fr] lg:gap-x-[72px] lg:gap-y-[58px]`

4. `<h2 ref={headlineRef}>`:
old: `order-1 max-w-3xl font-display text-[clamp(2.5rem,11vw,2.875rem)] leading-[1.02] font-light tracking-[-0.01em] lg:col-start-1 lg:row-start-1 lg:text-[clamp(2.5rem,5.5vw,5.5rem)]`
new: `order-1 max-w-3xl font-display text-[clamp(2.5rem,11vw,2.875rem)] leading-[1.02] font-light tracking-[-0.01em] lg:col-span-2 lg:col-start-1 lg:row-start-1 lg:max-w-none lg:text-[min(99px,6.875vw)] lg:leading-[1.05] lg:tracking-normal`
Only the SECOND mask wrapper (the `<span className="block overflow-hidden">` that contains `site.story.headlineItalic`) changes to:
`<span className="block overflow-hidden lg:pl-[min(180px,12.5vw)]">`
The first and third wrappers and all inner `js-headline-line` spans stay exactly as they are.

5. `<figure>`:
old: `order-2 relative lg:col-start-2 lg:row-span-3 lg:row-start-1 lg:mt-8`
new: `order-2 relative lg:col-start-2 lg:row-start-2 lg:self-start`

6. Image clip div (`ref={imageRef}`):
old: `js-story-image relative aspect-[4/5] overflow-hidden`
new: `js-story-image relative aspect-[4/5] overflow-hidden lg:aspect-[592/640]`
On its `<Image>` only change `sizes="(max-width: 1023px) 100vw, 40vw"` -> `sizes="(max-width: 1023px) 100vw, 592px"`. Nothing else on the Image.

7. Badge div (`ref={badgeRef}`):
old: `js-edition-badge absolute right-4 bottom-4 flex h-24 w-24 flex-col items-center justify-center rounded-full bg-honey3 text-night will-change-transform`
new: `js-edition-badge absolute right-4 bottom-4 flex h-24 w-24 flex-col items-center justify-center rounded-full bg-honey3 text-night will-change-transform lg:right-auto lg:bottom-[23px] lg:left-[-70px] lg:h-[140px] lg:w-[140px]`
(The badge stays a child of the figure. On lg the figure is the image plus the 33px caption block, so bottom 23px = 10px below the image. Do NOT use translate classes on the badge; GSAP rotates it.)
Badge number span: `font-display text-2xl italic` -> `font-display text-2xl italic lg:text-[34px] lg:leading-[41px]`
Badge label: `<Label className="mt-0.5 text-[7px] text-night">` -> `<Label className="mt-0.5 text-[7px] text-night lg:text-[8px] lg:leading-[10px]">`

8. Caption label: `<Label className="mt-4 text-cream/45">` -> `<Label className="mt-4 text-cream/45 lg:mt-5 lg:text-[11px] lg:leading-[13px]">`

9. Left column div:
old: `order-3 flex flex-col lg:col-start-1 lg:row-start-2`
new: `order-3 flex flex-col lg:col-start-1 lg:row-start-2 lg:pt-[60px] lg:pb-[104px]`
(pb 104 = 71px above the image bottom + the 33px caption block.)

10. Body `<p ref={bodyRef}>`:
old: `js-headline-line max-w-lg text-[15px] leading-relaxed text-cream/70 lg:ml-auto`
new: `js-headline-line max-w-lg text-[15px] leading-relaxed text-cream/70 lg:ml-[26.47%] lg:max-w-[430px] lg:text-[18px] lg:leading-[29px]`

11. Attribution `<p ref={attributionRef}>`:
old: `mt-6 max-w-lg font-display text-xl italic text-honey3 lg:ml-auto`
new: `mt-6 max-w-lg font-display text-xl italic text-honey3 lg:mt-7 lg:mb-10 lg:ml-[26.47%] lg:max-w-[430px] lg:text-[22px] lg:leading-[27px]`

12. Stats row div (`ref={statsRef}`):
old: `mt-10 grid grid-cols-3 gap-3.5 border-t border-cream/15 pt-6 sm:gap-6 lg:mt-16 lg:pt-8`
new: `mt-10 grid grid-cols-3 gap-3.5 border-t border-cream/15 pt-6 sm:gap-6 lg:mt-auto lg:grid-cols-[repeat(3,minmax(0,200px))] lg:gap-10 lg:border-t-0 lg:pt-0`

13. Stat value div (`data-stat-value`):
old: `font-display text-[clamp(1.75rem,8vw,2.375rem)] leading-none text-honey3 lg:text-[clamp(2rem,3.5vw,3.25rem)]`
new: `font-display text-[clamp(1.75rem,8vw,2.375rem)] leading-none text-honey3 lg:text-[min(72px,5vw)]`
Directly AFTER that value div (before the label `<p>`), add a new rule element (desktop only):
`<div aria-hidden className="hidden h-px w-full bg-cream/20 lg:mt-2 lg:block" />`

14. Stat label `<p>`:
old: `mt-2 text-[11px] leading-snug text-cream/55 lg:mt-3`
new: `mt-2 text-[11px] leading-snug text-cream/55 lg:mt-2 lg:text-[13px] lg:leading-5`

## Out of scope (do NOT change)
Motion code and timings, copy, colours (except the new rule's cream/20), the section background, mobile/tablet layout, other sections, globals.css.

## Verify and report
Run `npx eslint src/components/sections/Story.tsx` and `npx tsc --noEmit`; both must pass. Report each changed className and the command results. Do not run `npm run build` or `npm run dev`.

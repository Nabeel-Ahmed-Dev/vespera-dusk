# Step 7d: match all copy and missing content items to desktop Figma (4:2)

Branch: `step-07d-figma-copy` (already checked out). Work ONLY on this branch. Do not commit, push, or create branches; just edit files and report.

## Rules (read first)
- COPY + MISSING CONTENT ONLY. No layout work: do not change spacing, sizes, grids, positions, fonts or colors except the few markup additions listed below (each one is spelled out exactly).
- Use the EXACT strings below, character for character: em dashes (—), en dashes (–), curly quotes (“ ”), straight apostrophes ('), arrows (→), the middle dot (·) and the star (★). Do not "fix" or reword anything.
- Where Figma shows uppercase, the site uses the `Label` component (CSS `uppercase`). Keep that: store those strings in sentence case as given below.
- All copy lives in `src/content/site.ts`. Update the TypeScript types in that file when a shape changes.
- Reuse existing classes. Keep every existing `data-*` / `js-*` attribute. New items rendered inside an existing `.map()` automatically keep their siblings' attributes; that is required.
- Do not touch: Nav, the Scent Pyramid, Story layout, StickyBuyBar, the footer link groups, or any GSAP/motion code.
- When done: run `npm run lint` and `npx tsc --noEmit` (do NOT start a dev server and do NOT run `npm run dev`; one is already running). Report every file changed.

## A. Text changes in `src/content/site.ts` (current → new)

| # | Section / key | Current | New (exact) |
|---|---|---|---|
| A1 | `hero.stock` | `347 of 1,200 Batch 01 bottles left` | `Batch 01 — 347 of 1,200 bottles left` |
| A2 | `story.stats[1].label` | `Extrait-level concentration` | `Extrait-level concentration of oils` |
| A3 | `story.stats[2].label` | `First light to last` | `From the first light to the last` |
| A4 | `craft.body` | `Heavy faceted glass, a hand-cut stopper that catches light like the sun's last edge, and a label applied by hand.` | `Each bottle is pressed from heavy, faceted glass and crowned with a hand-cut stopper that catches light like the sun's last edge. The label is applied by hand — slightly imperfect, entirely ours.` |
| A5 | `craft.details[0].description` | `Hand-cut, 24 facets.` | `Hand-cut, 24 facets — it throws light across the room.` |
| A6 | `craft.details[1].description` | `Substantial in the hand.` | `Substantial in the hand, steady on the vanity.` |
| A7 | `craft.details[2].description` | `Each Batch 01 bottle, 1–1,200.` | `Every Batch 01 bottle carries its own number, 1–1,200.` |
| A8 | `craft.details[3].description` | `100 ml refills at 30% less.` | `100 ml refills at 30% less — keep the vessel forever.` |
| A9 | `socialProof.ratingLabel` | `from 2,184 verified reviews` | `Average from 2,184 verified reviews. 94% would buy it again.` |
| A10 | `socialProof.reviews[0].quote` (Amira K.) | `“I get stopped every single evening. Expensive, but warm — never loud.”` | `“I get stopped every single evening. It smells expensive, but warm — never loud.”` |
| A11 | `socialProof.reviews[0].meta` (Amira K.) | `Verified buyer` | `Verified buyer · Wears it to dinner` |
| A12 | `socialProof.reviews` (Sofia M.) `meta` | `Verified buyer` | `Verified buyer · Discovery sample → 100 ml` |
| A13 | `socialProof.disclaimer` | `All quotes, names, ratings & press are placeholders` | `All quotes, names & press are placeholders` |
| A14 | `offer.sizes[1].perMl` (100 ml) | `$1.85 / ml · best value` | `$1.85 / ml — best value` |
| A15 | `offer.sample` | `Not sure yet? Try the 2 ml vial first — $8, credited to your bottle.` | `Not sure yet? Try the 2 ml Discovery vial first — $8, fully credited toward your bottle.` |
| A16 | `offer.payments` | `or 4 interest-free payments of $46.25` | `or 4 interest-free payments of $46.25 · Ships in 24 h` |
| A17 | `offer.stockClaimed` | `71% claimed` | `Batch 01 — 71% claimed` |
| A18 | `faq.items[0].question` | `How long does it last?` | `How long does Dusk #01 last?` |
| A19 | `faq.items[0].answer` | `Around 10–12 hours on skin and longer on fabric.` | `Around 10–12 hours on skin and longer on fabric. The base of oud and amber is designed to stay close and warm well into the night.` |
| A20 | `faq.items[2].question` | `Can I try it first?` | `Can I try it before buying the full bottle?` |

Leave `faq.items[1]` and `faq.items[3]` (questions and answers) unchanged; their wording already matches.

## B. New / restructured content

### B1. Social Proof: 3rd review (Daniel R.) — `site.ts` + nothing else in data order
Insert as the SECOND item of `socialProof.reviews` (order must be Amira K., Daniel R., Sofia M.):
- quote: `“The saffron opening is pure gold, then it melts into skin. Lasts until morning.”`
- author: `Daniel R.`
- meta: `Verified buyer · 100 ml`
- stars: `5`

Component `src/components/sections/SocialProof.tsx`: the reviews grid is currently `lg:grid-cols-[0.7fr_1fr_1fr]` (rating card + 2 reviews). With 3 reviews, change ONLY that token to `lg:grid-cols-[0.7fr_1fr_1fr_1fr]` so all four cards stay on one row. No other grid change.

### B2. Social Proof: press names (6, Figma order)
`socialProof.press` becomes exactly, in this order:
`VOGUE`, `Harper's BAZAAR`, `ELLE`, `Wallpaper*`, `GQ`, `Le Monde`
(They render through the existing `uppercase` marquee spans; per-brand wordmark styling is a later step.)

The mobile/tablet row (the `lg:hidden` div above the marquee) cannot fit 6 names on one line at 390px. Make this minimal change so nothing overflows:
- on that div replace `justify-between gap-3` with `flex-wrap justify-center gap-x-5 gap-y-3` and replace `sm:gap-4` with `sm:gap-x-6`;
- on its child `<span>` replace `shrink min-w-0` with `whitespace-nowrap`.
Do not change the desktop marquee markup except that it now receives 6 names.

### B3. Social Proof: "AS SEEN IN*" label
Add to `site.ts`: `socialProof.pressLabel: "As seen in*"`.
In `SocialProof.tsx`, directly BEFORE the mobile press row div, add:
`<Label className="mt-10 text-night/55 sm:mt-12 lg:mt-14">{site.socialProof.pressLabel}</Label>`
Then change the mobile press row's `mt-10` → `mt-4` and `sm:mt-12` → `sm:mt-4`, and the desktop marquee wrapper's `mt-14` → `mt-4`, so the label sits just above the strip.

### B4. Social Proof: "Read all reviews →" link
Add to `site.ts`: `socialProof.reviewsLink: "Read all reviews →"`.
In the rating card, directly after the `<p>` that renders `ratingLabel` (inside the same wrapper div), add:
`<a href="#reviews" className="mt-3 inline-block text-[13px] font-medium underline decoration-night/30 underline-offset-4">{site.socialProof.reviewsLink}</a>`

### B5. Social Proof: placeholder footnote
Add to `site.ts`: `socialProof.pressFootnote: "* Placeholder wordmarks — replace with licensed press logos"`.
In `SocialProof.tsx`, directly after the existing disclaimer `<Label>`, add:
`<Label className="mt-2 text-night/40">{site.socialProof.pressFootnote}</Label>`

### B6. Craft: figure caption
Add to `site.ts`: `craft.figCaption: "Fig. 02 — The label, applied by hand"`.
In `src/components/sections/CraftVessel.tsx`, inside the image column div (the `relative min-h-[420px] ...` div), after the inset div, add:
`<Label className="absolute bottom-6 left-6 z-10 hidden text-cream/80 lg:block lg:bottom-10 lg:left-12">{site.craft.figCaption}</Label>`
(Mirrors the Offer section's desktop-only fig caption pattern.)

### B7. Offer: subtitle with Batch 01 and rating
Replace `offer.subtitle` with two keys:
- `offer.subtitle: "Eau de Parfum · Batch 01"`
- `offer.subtitleRating: "★★★★★ 4.9 (2,184)"`
In `OfferBuy.tsx` the subtitle `<p>` becomes:
`<p className="mt-3 text-[13px] text-night/70">{site.offer.subtitle}<span aria-hidden className="mx-2 text-night/30">|</span>{site.offer.subtitleRating}</p>`
(The `|` stands in for Figma's 1px divider.)

### B8. Offer: 4 perks with sub-lines
Change `offer.perks` from `string[]` to `{ title: string; detail: string }[]` (update the type) with exactly:
1. `Free express shipping` / `Delivered in 2–4 days, tracked.`
2. `The 30-day Dusk Promise` / `Wear it a month. Not your hour? Full refund.`
3. `Complimentary engraving` / `Initials or a date on the base.`
4. `Gift-ready` / `Signature box & handwritten card.`
The `✓ ` prefix is no longer stored in the data. In `OfferBuy.tsx` keep the same `<ul>` (unchanged classes) and render each item as:
`<li key={perk.title}><span aria-hidden>✓ </span>{perk.title}<span className="mt-0.5 block text-xs font-normal text-night/55">{perk.detail}</span></li>`
(No icons, no grid — those are a later layout step.)

### B9. Guarantee strip: 4 items with Figma sub-lines
`guarantee.items` becomes exactly:
1. `Free express shipping` / `On every order, worldwide.`
2. `30-day Dusk Promise` / `Full refund — even if it's empty.`
3. `Sample first` / `2 ml vial, credited to your bottle.`
4. `Refill forever` / `Vegan, cruelty-free, refillable.`
In `GuaranteeFaq.tsx`, inside the existing `<p data-guarantee-item ...>` (keep its classes and attributes), render the detail on its own line instead of the inline `— detail`:
`{item.title}<span className="mt-1 block font-sans text-xs text-cream/55">{item.detail}</span>`
(Remove the `{" "}` and the `— ` prefix.)

### B10. FAQ: 5th question
Append to `faq.items`:
- question: `When does Batch 01 sell out — and what then?`
- answer: `347 of 1,200 Batch 01 bottles remain · Batch 02 is not scheduled.`
(Figma shows this item closed, so it has no answer text; this answer reuses the Final CTA line from Figma verbatim, pending Nabeel's wording.)

### B11. FAQ: "Still curious?" line
Add to `site.ts`: `faq.note: "Still curious? Write to us — a real person replies within the hour."`.
In `GuaranteeFaq.tsx`, directly after the FAQ `<h2>` (inside the same left-column div), add:
`<p className="mt-6 max-w-[340px] text-sm leading-relaxed text-night/70">{site.faq.note}</p>`

### B12. Final CTA: scarcity line
Add to `site.ts`: `finalCta.scarcity: "347 of 1,200 Batch 01 bottles remain · Batch 02 is not scheduled"`.
In `FinalCtaFooter.tsx`, directly after the buttons `<div>` (the `mt-8 flex w-full max-w-md flex-col gap-3 sm:mt-10` div), add:
`<Label className="mt-8 text-cream/55">{site.finalCta.scarcity}</Label>`

## C. Do NOT change (already match Figma, or out of scope)
Nav strings; hero meta/tagline/description/CTA/perks/discover/scroll hint/side meta; Story label, aside, headline, body, attribution, badge, fig caption, stat values; all Scent Pyramid strings; Craft label, headline, detail titles; Social Proof label, pull quote, quote attribution, rating value; Offer label, badge, fig caption, title, prices, save badge, size label, 50 ml card, "Most chosen", CTA, stock left; FAQ label, headline, items[1] and items[3]; Final CTA label, headline, buttons; newsletter, footer brand, link groups, legal; StickyBuyBar; `hero.eyebrow` and `footer.mobileLinkColumns` (mobile-only); unused `scentPyramid.body`.

## D. Report
List every file changed and every string changed, and confirm lint + tsc pass.

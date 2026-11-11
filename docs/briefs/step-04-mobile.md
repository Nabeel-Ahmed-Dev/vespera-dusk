# Step 4: mobile + tablet responsiveness (Nabeel feedback)

Branch step-04-mobile (stacked on step-03-static-desktop / PR #2). Desktop (>=1024px) must look exactly as now.
Reference: design-handoff/web/mobile_v2.html and design-handoff/mobile_v2_render_390.png (Figma mobile frame 24-2). Match it at 390px; make 320-1023px fluid with no horizontal overflow.

Issues seen at 390 (current) vs design:
1. Nav: the "Shop Dusk - $185" pill wraps to two lines and crowds the logo. Mobile design: VESPERA logo left, "Bag (0)" + hamburger icon right (menu can be a static button for now, no drawer logic needed beyond aria). Hide the shop pill below lg.
2. Hero (top priority): eyebrow "Eau de Parfum - N°01 - First Edition" wraps badly in two columns -> single centered line, small tracking. Vertical side text "18:47 - Golden hour Grasse" overlaps content -> hide below lg. DUSK wordmark must fit the viewport width (no clipping, ~full width with side padding); "#01" superscript must not collide with the bottle. Bottle: large, centered, overlapping the bottom of the wordmark as in the design (~75-85% width), not small and tilted off to the side. Tagline centered below the bottle. Add to bag button full-width. Batch counter line centered below the button. Hide "Discover Dusk", the free-shipping line and "(scroll to descend)" below sm if they don't appear in the design (check mobile_v2.html). Hero should fit roughly one tall viewport.
3. Story: on mobile the image goes directly after the headline, then paragraph, quote and stats (follow design order; use CSS order/grid, no duplicated markup).
4. Social proof: press logos in a single row that fits (no clipped "GQ"); rating "4.9" with stars/count inline to its right; cards full width.
5. Offer: size cards side-by-side; check nothing overflows.
6. Sticky mobile buy bar at the bottom (thumb, "Dusk #01", "100 ml · $185", Add to bag) visible below lg only, as in the design; add bottom padding to the footer so it doesn't cover content. Static (no scroll-show logic yet; motion is a later step).
7. Footer: VESPERA wordmark on mobile as in design; keep full-bleed SVG approach but make sure it scales.
8. Sweep every section at 320, 390, 768 for overflow (document.documentElement.scrollWidth must equal clientWidth), tiny tap targets (<44px), text below 12px, and cramped padding. Fix what you find.

Rules: Tailwind 4 mobile-first utilities, no new deps, keep next/image sizes correct for the new mobile widths. Don't start a dev server (one runs on :3000). Small commits per area (nav+hero, story, proof+offer, sticky bar+footer, sweep). pnpm lint && pnpm build must pass. Report changes per section and anything you could not match.

# Step 3 fix round (PM review)

Still STEP 3, branch step-03-static-desktop. PM compared a 1440x900 full-page Playwright screenshot against design-handoff/desktop_00_fullpage_overview.png and desktop_01_hero.png / desktop_03_offer.png. Fix ONLY these, then re-verify visually yourself (pnpm dev is already running on http://localhost:3000; do not start another):
1. Nav: in the design the nav sits transparently over the gold hero: VESPERA logo left (Montserrat .4em), links The Scent / Notes / The Vessel / Reviews centered, Bag (0) + dark pill "Shop Dusk — $185" right. Currently it renders as a solid dark bar where logo and links are invisible (dark on dark). Make it match.
2. Hero DUSK wordmark is about half the design size. In the design it spans roughly 75-80% of the 1440 width (letters ~290px tall), with the bottle overlapping the center and "# 01" italic top-right. Scale it (clamp/vw based) to match.
3. Craft/Vessel: the large label close-up image (img_label_close.png) on the left is missing/blank, plus the small inset photo; render them like the overview.
4. Offer/Buy: the left media panel shows only a gradient; it must show the bottle (bottle_dark_cutout.png or img_dark_amber.png per overview) on the gold panel, plus the thumbnail strip under it like the overview.
5. Check Story/Final CTA images render too. Check for any other image that failed to load (next/image sizes/fill parents need height).
pnpm lint && pnpm build must pass. Amend nothing; add a new commit "fix: step 3 review fixes (nav, DUSK scale, craft/offer images)". Report what changed.

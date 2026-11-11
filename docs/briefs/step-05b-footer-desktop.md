# Step 5b: desktop footer to match Figma (frame 4:2 > "09 Final CTA + Footer", nodes 10:17 Newsletter, 10:24 Footer)

Branch step-05b-footer-desktop (from main). Nabeel spotted the desktop footer doesn't match the design. Mobile (<lg) stays as is; fix lg+ only. Design at 1440 (48px side padding, content 1344 wide):

1. Newsletter row (y 820 in section): left column 480px wide: "Join the Night List" (serif display ~44px) + "First access to Batch 02, private launches, and 10% off your first order." Right: email field 560px wide aligned right (starts x=784), bottom-aligned with the text block, "your@email.com" placeholder left, "SUBSCRIBE ->" right, underline. Use this longer copy on all breakpoints.
2. Footer links row (72px below footer top): left brand block 360px: "VESPERA" wordmark small caps (tracking wide, ~16px tall) + tagline "Perfume for the hours in between. Composed in Grasse, numbered by hand." (2 lines, muted). Right block 588px (starts x=756, aligned right): three columns 180px wide, 24px gap, each with an uppercase tracked heading (~11px, muted gold) and 4 links at 31px rhythm:
   - SHOP: Dusk #01, Discovery vial, Refills, Gift cards
   - HOUSE: Our story, The perfumer, Journal, Stockists
   - CARE: Shipping, Returns & refunds, FAQ, Contact
3. Mega VESPERA logotype stays full-bleed as now (~210px tall), ~120px below the links.
4. Legal row below the logotype: left "(c) 2026 VESPERA PARFUMS - CONCEPT DESIGN", right "PRIVACY · TERMS · INSTAGRAM · TIKTOK" (both ~11px tracked uppercase, muted). Not overlapping the logotype.
Put all copy/links in src/content/site.ts (href '#' placeholders, FAQ -> #faq, Dusk #01 -> #offer). Mobile footer may reuse the new column data (headings + links in a 2-col grid) only if it still looks clean; otherwise leave mobile unchanged.
If the Figma MCP is available, get_design_context for node 10:24 and 10:17 (file emx0mVTFBsYuDGjTLhUppY) to confirm sizes; otherwise follow the numbers above.
Don't start a dev server. pnpm lint && pnpm build must pass. Commit 'fix: desktop footer matches design'.

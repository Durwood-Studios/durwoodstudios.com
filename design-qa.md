# Selected direction implementation QA

Date: September 21, 2026. Scope: local visual implementation, not production commerce or security certification.

Source visual truth: `/Users/dustinsnellings/Durwood-Studios/planning/mockups/home-2.png`, with the page selections and refinements in `planning/mockups/SELECTED-DIRECTION.md`.
Implementation: `http://127.0.0.1:4173/`.
Primary evidence: `qa/selected-home-desktop-final.png`; additional contact, Studio, Labs, Store, Privacy and Accessibility captures are in `qa/selected-*-desktop.png`.
Desktop source and capture: 1487 × 1058 pixels, CSS viewport 1487 × 1058, DPR 1. No density adjustment. Mobile viewport capture: `qa/selected-home-mobile-viewport.png`, 390 × 844, DPR 1. The browser's full-page mobile stitching was defective; use the viewport capture, not `selected-home-mobile.png`.

## Findings and comparison history

1. First paired Home comparison found a P2 excessive hero height and undersized primary CTA. Evidence: `qa/selected-home-desktop.png` beside source. Reduced hero padding/art height, restored approximately 470px hero region, enlarged CTA and headline. Recaptured `selected-home-desktop-v2.png`, then a fresh top-of-page `selected-home-desktop-final.png`. Source and final capture were supplied together in the same visual comparison input. No remaining actionable P0/P1/P2 in the Home composition.
2. Initial Labs capture preceded lazy-image decoding. Checked both images complete with natural width 1905, recaptured and visually inspected loaded state. This was capture timing, not missing assets.
3. Removed duplicate h1 in embedded accessibility report form.

## Required fidelity surfaces

- Typography: Georgia editorial display with Arial UI/body. Similar high contrast serif character to the raster reference; slightly different glyph details are accepted. Main two-line headline and readable small text preserved. No remote-font dependency.
- Layout rhythm: shared 4.6% gutters, compact cream header, pine hero, paired Store/Labs destinations, fine separators and compact conversational close. Header/hero correction verified in final capture.
- Colors: pine #1c3c30, cream #f7f5ee, clay #a34f32; no textured screenshot background or decorative UI rasterization.
- Image quality: original generated pine engraving traced into real vector paths; transparent and crisp at mobile/desktop sizes. Existing high-resolution concept illustrations reused. Pine sways as one branch rather than independently cut leaf clusters, avoiding seams. 49.7KB gzip versus aspirational 40KB budget is a minor remaining optimization.
- Copy: fictional saleable products/prices removed. Empty Store matches the actual catalog. Studio uses a static botanical banner instead of invented Aiken scenery. Project publication limits and preliminary policy statements retained. These are intentional adaptations to factual content, not claims of exact pixel replication.

Full-frame images were readable at native size, including button text, navigation and labels, so separate focused crops were unnecessary for this pass. Contact source and rendered evidence were inspected for hierarchy, labeled fields and direct email fallback.

## Interaction checks

- Production build and all four Sites packaging tests pass.
- All public route families, both experiment pages, legacy Studio alias and 404 render at 390px without horizontal overflow.
- Mobile menu opens and reveals all four primary destinations.
- Pause changes to Resume and persists through full navigation; Resume restores motion.
- Reduced-motion CSS prevents animation from first frame; JS listens for preference changes. Offscreen/document-hidden pause is implemented. OS preference toggling and real iOS hardware were not exercised in this pass.
- Contact outage produced an explicit unconfirmed/error state. Restarted existing loopback service and submitted synthetic local QA data; received a server-issued saved reference. No outbound email sent.
- Current browser console check reported no errors after service recovery.
- No DSOS vault was opened or changed. Manual sync integration was preserved, not re-certified in this visual pass.

## Remaining scope and polish

- Real product content, pricing, checkout and download fulfillment remain unimplemented commerce work; the catalog is empty.
- Deployment, production policy review and operational security work remain separate from this local build.
- Full assistive-technology, OS reduced-motion switching and physical iPhone/iPad checks remain unperformed.
- Optional further polish: smaller SVG payload, independently sourced leaf groups, final brand typeface, actual product covers when releases exist.

Implementation checklist: local build complete; responsive route checks complete; inquiry receipt/error checks complete; desktop and mobile visual evidence saved; preview left open.

final result: passed

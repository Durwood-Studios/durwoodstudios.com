# Prototype Instructions

Run the local server yourself and open the preview in the browser available to this environment. Do not give the user server-start instructions when you can run it.

Before making substantial visual changes, use the Product Design plugin's `get-context` skill when the visual source is unclear or no longer matches the current goal. When the user gives durable prototype-specific design feedback, preferences, or decisions, record them in `AGENTS.md`.

When implementing from a selected generated mock, treat that image as the source of truth for layout, component anatomy, density, spacing, color, typography, visible content, and hierarchy.

Build app UI in `src/`. Keep `.openai/hosting.json`, `worker/index.js`, `scripts/prepare-sites-build.mjs`, and `tests/sites-worker.test.mjs` intact so the same local prototype can be handed to Sites. Before a Sites handoff, run `npm run build` and `npm run test:sites`; the build must leave `dist/client/index.html`, `dist/server/index.js`, and `dist/.openai/hosting.json`.

## Durwood-specific direction

The original portfolio direction was rejected. Follow the revised brand and commerce brief in `../planning/BRAND-COMMERCE-AND-SYNC.md`. No invented clients, measurements, certification or manufacturing accomplishments. Generated imagery is concept artwork. Contact now uses the sibling local service to persist inquiries. Maintain the server-acknowledged receipt and retry-safe submission ID; do not revert to email drafts. Keep the public app isolated from the private DSOS vault, connecting only through an authenticated, user-initiated sync service. Never claim delivery or sync before a server acknowledgement. Work on main and preserve unrelated changes.

## Explicit user correction

Durwood encompasses the whole studio, not a resume, portfolio or a narrowly defined service offering. The site needs distinctive umbrella branding, a Durwood Store that can sell digital products as they are released, real inquiry forms and data synchronization into the local operational dashboard. Do not require selecting a first service or buyer before progressing. Existing colors and workshop art are not an approved final brand.

## Regional identity

Dustin explicitly asked to restore South Carolina vibes. Retain Aiken-rooted warmth: sandy cream, pine green, clay accents, serif typography and sunlit imagery. Preserve the umbrella brand/store/contact hierarchy; regional character must not turn the site back into a resume or portfolio. Do not treat inland Aiken as a coastal location or represent concept artwork as an actual studio photograph.

## Selected implementation (September 21, 2026)

User approved building the selected mockup composition in `../planning/mockups/SELECTED-DIRECTION.md`. Home 2 sets the common pine/cream/clay editorial identity. Preserve Store/Labs/Studio/Contact navigation, subtle real vector pine motion with persistent pause and reduced-motion support, real inquiry receipt handling, and truthful empty catalog. Do not turn this back into a portfolio. Mock product samples are not actual inventory; no fictional prices or checkout. `/how-i-help` uses Studio content. Policy pages retain their local-preview limitations until production practices are decided.

## Brand voice correction

Convey the look of the South with the precision of a studio. Keep pine, warm cream and clay visually; avoid repeating Southern slogans. Lead with considered design, useful tools and clear product facts.

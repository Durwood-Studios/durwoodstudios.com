# Free public release

Use Cloudflare Pages Free with Durwood-Studios/durwoodstudios.com, production branch `main`, build command `npm run build:static`, and output directory `dist/client`. Do not activate paid plans.

The static release shows an empty store and email contact; it makes no catalog or inquiry API calls. The normal local build preserves the receipt-confirmed inquiry form. Never upload DSOS, service data or secrets.

Verify the Pages URL before attaching durwoodstudios.com. Preserve all existing MX, SPF, DKIM, DMARC and verification records before any nameserver change. Domain renewal is separate from hosting. Search indexing remains disabled for the initial review release.

Pages supplies SPA navigation fallback when no top-level 404.html exists. Upload only dist/client for manual deployment.

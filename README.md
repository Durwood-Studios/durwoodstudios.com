# DurwoodStudios.com

Working React/Vite public website with a brand-led home, Durwood Store, Studio, Labs, contact, privacy, terms and accessibility pages. The previous portfolio-led direction has been superseded. Store currently shows an honest empty catalog; product sales are not yet implemented.

## Run and verify

```sh
npm install
npm run dev -- --host 127.0.0.1 --port 4173
npm run build
npm run test:sites
```

Start the sibling service with `node ../service/server.mjs` before using forms. Vite proxies `/api` to port 4180. Contact now persists inquiries and displays a receipt only after server acknowledgement. The DSOS native client can explicitly retrieve inquiries into its encrypted Inbox. The public preview uses no analytics. Payment processing and hosted deployment remain outstanding. See `../service/README.md`; a static-only deployment will not include the API.

## Launch status

Local preview only. Search indexing is disabled in metadata and robots.txt. Before publishing: confirm business claims and asset rights, review legal pages against actual business practices and hosting, configure domain/hosting, verify accessibility and email delivery, and deliberately enable indexing. The policy pages are preliminary operational descriptions, not a completed legal review.

Keep all private operations and credentials outside this project. Work on main; follow the standing pull/rebase instruction before any commit. No remote is configured.

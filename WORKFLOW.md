# Working on main

Work directly on `main`. No feature branches or pull requests.

Use Node 24. Run `npm ci` to install locked dependencies and Husky hooks. Pre-commit formats/lints staged files. Pre-push runs the full verification suite and rejects other destination branches. Run `npm run check` locally to reproduce CI.

Before every commit, run `git pull --rebase origin main`, resolve any conflicts, and re-run checks. For the first commit only, an empty remote has no `main` to pull. Never force-push main.

GitHub Actions runs on every push to main and manual dispatch with read-only repository permissions. Successful runs retain a build/source artifact. This is automated validation and delivery of artifacts, not a production deployment. Hosting and app signing require separately configured destinations and credentials. Never commit local vaults, databases, connection credentials, or `.env` files.

Husky is a local guardrail and can be bypassed; GitHub Actions independently verifies uploaded commits. Direct-to-main CI detects a bad push after it lands, so wait for green checks before the next release.

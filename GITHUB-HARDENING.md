# GitHub Hardening for VIDRARCH

## Account
- Use a passkey or hardware security key; retain recovery codes offline.
- Verify the primary email and avoid exposing unnecessary personal data on the public profile.

## Repository
- Protect `main` with a ruleset.
- Require pull requests after launch.
- Require status checks: `validate`.
- Block force pushes and branch deletion.
- Enable secret scanning / push protection where your plan supports them.
- Enable Dependabot updates for GitHub Actions.

## Pages
- Deploy only from the included GitHub Actions workflow.
- Keep `pages: write` and `id-token: write` scoped to the deploy job.
- Use the protected `github-pages` environment.
- If using a custom domain, enable HTTPS enforcement after DNS validates.

## Content security
- Never publish secrets, production IPs, tenant IDs, hostnames, live vulnerability evidence, detection blind spots, or non-public architecture.
- Run `python tools/validate.py` before every push.

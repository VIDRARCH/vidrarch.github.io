# VIDRARCH™ // Security Systems Engineering

**Architect. Defend. Endure.**  
**Strength without noise. Proof through engineering.**

This is the production-ready GitHub Pages portfolio for VIDRARCH: an evidence-led security-systems-engineering brand designed to be useful to technical leaders, hiring managers, and recruiters without publishing sensitive production details.

## Brand assets

- `assets/vidrarch-logo-lockup.png` — official selected primary logo lockup
- `assets/vidrarch-emblem.png` — compact emblem derived from the official lockup
- `assets/vidrarch-favicon.png` — site/favicon mark
- `assets/vidrarch-avatar-256.png` — GitHub/social avatar
- `assets/vidrarch-emblem-monochrome.png` — monochrome print/document version
- `assets/vidrarch-linkedin-banner.png` — **final LinkedIn banner selected by the owner**
- `assets/vidrarch-og.png` — OpenGraph/social sharing card

## Site

- `index.html` — interactive engineering-console portfolio
- `recruiter.html` — concise recruiter/hiring-manager brief
- `case-studies/` — public-safe engineering evidence
- `github-profile/README.md` — GitHub profile README
- `repo-starters/` — four proof-of-work repository starters

## Protection and launch

Read these before publishing:

1. `CLAIM-FIRST.md`
2. `NAME-CLEARANCE-REPORT.md`
3. `BRAND-PROTECTION.md`
4. `GITHUB-HARDENING.md`
5. `PUBLIC-SAFETY-CHECKLIST.md`
6. `TRADEMARKS.md`

## Fast launch

### 1. Claim the name first

Claim the GitHub username `vidrarch` and register your preferred domain **before** announcing the brand. Availability changes in real time.

### 2. Create the Pages repository

Create:

```text
vidrarch.github.io
```

Keep it private until the core handles/domain are secured.

### 3. Configure the site

```bash
python tools/configure_portfolio.py \
  --github-handle vidrarch \
  --site-url https://vidrarch.github.io
```

When you own a custom domain, run the script again with the custom URL and `--custom-domain`.

### 4. Validate

```bash
python tools/validate.py
node --check app.js
node --check site.config.js
```

### 5. Push

```bash
git init
git add .
git commit -m "Launch VIDRARCH security engineering portfolio"
git branch -M main
git remote add origin https://github.com/vidrarch/vidrarch.github.io.git
git push -u origin main
```

### 6. Enable Pages

GitHub → **Settings → Pages → Build and deployment → GitHub Actions**.

The included workflow validates the site before deployment.

## Licensing

Reusable site code is under `LICENSE-CODE` (MIT). Brand assets and personal portfolio content are **not** licensed by that MIT grant. See `LICENSE` and `TRADEMARKS.md`.

## Public-safety rule

Never publish credentials, secrets, private keys, internal IPs/hostnames, tenant IDs, live vulnerability evidence, detection blind spots, incident evidence, or non-public architecture.

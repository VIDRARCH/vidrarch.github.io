# VIDRARCH Launch Playbook

This is the execution plan for turning VIDRARCH into a real recruiter-facing technical identity.

## Phase 0 — Claim the namespace first

Before publishing anything, claim the identifiers you want to own.

Priority:

1. GitHub: `vidrarch`
2. GitHub Pages repository: `vidrarch.github.io`
3. Optional matching social handles where useful
4. Optional custom domain later

Do **not** wait to perfect the portfolio before claiming the GitHub handle. Availability can change.

## Phase 1 — Publish the site

From this directory:

```bash
python tools/configure_portfolio.py \
  --github-handle vidrarch \
  --site-url https://vidrarch.github.io

python tools/validate.py
```

Then:

```bash
git init
git add .
git commit -m "Launch VIDRARCH security engineering portfolio"
git branch -M main
git remote add origin https://github.com/vidrarch/vidrarch.github.io.git
git push -u origin main
```

In GitHub:

**Settings → Pages → Source → GitHub Actions**

The included workflow handles deployment.

## Phase 2 — Create the GitHub profile repository

Create a repository named exactly:

```text
vidrarch
```

Copy `github-profile/README.md` into that repository as `README.md`.

That causes the README to appear on the GitHub profile page.

## Phase 3 — Build visible proof, not empty repositories

Create these repositories one at a time from `repo-starters/`:

1. `detection-engineering-playbook`
2. `security-change-validation`
3. `identity-security-playbook`
4. `ndr-architecture-patterns`

Do not publish all four as empty shells on day one. A smaller number of useful repositories is stronger than many abandoned placeholders.

Recommended order:

### Repository 1 — detection-engineering-playbook

Why first: it immediately supports SIEM / Detection Engineer searches and demonstrates concrete Splunk + Defender thinking.

Add over time:

- generic SPL patterns
- generic KQL patterns
- detection specification template
- test cases
- false-positive reasoning
- field-validation notes

### Repository 2 — security-change-validation

Why second: this is a differentiator. Many candidates can write a query; fewer demonstrate production ownership, change control, rollback, and evidence.

### Repository 3 — identity-security-playbook

Why third: adds Entra / SAML / SCIM searchability and shows cross-system integration skills.

### Repository 4 — ndr-architecture-patterns

Why fourth: broadens the portfolio into network security architecture and Security Onion.

## Phase 4 — Pin the right repositories

Pin, in this order:

1. `vidrarch.github.io`
2. `detection-engineering-playbook`
3. `security-change-validation`
4. `identity-security-playbook`
5. `ndr-architecture-patterns`

Leave the sixth pin available for the strongest future artifact.

## Phase 5 — Connect LinkedIn to VIDRARCH

Use your **real professional identity** on LinkedIn. VIDRARCH is the portfolio brand, not a fake employment identity.

Add the portfolio to LinkedIn's Featured section.

Suggested title:

```text
VIDRARCH // Security Systems Engineering Portfolio
```

Suggested description:

```text
A public-safe portfolio of my security systems engineering work across SIEM, Microsoft Security, identity, endpoint, PKI, network visibility, vulnerability management, and production security operations.
```

## Phase 6 — Search positioning

The public profile should naturally contain the terms recruiters actually search for:

- Security Systems Engineer
- Security Engineer
- Splunk Enterprise Security
- Splunk Cloud
- Detection Engineering
- Microsoft Defender XDR
- Microsoft Defender for Endpoint
- Microsoft Defender for Identity
- Microsoft Entra ID
- Microsoft Intune
- SAML
- SCIM
- PKI
- Security Onion
- Zeek
- Suricata
- Vulnerability Management
- Critical Infrastructure Cybersecurity

Do not keyword-stuff. Put terms in context around actual evidence.

## Phase 7 — Recruiter sharing strategy

Use different links for different audiences.

### Recruiter

```text
https://vidrarch.github.io/recruiter.html
```

### Hiring manager / technical interviewer

```text
https://vidrarch.github.io/
```

### Resume

Use the recruiter URL next to LinkedIn / GitHub.

### Email signature

Use a restrained line:

```text
Security Systems Engineering Portfolio: vidrarch.github.io
```

No need to label yourself a “hacker.”

## Phase 8 — Content cadence

The site becomes valuable when evidence accumulates.

A sustainable schedule:

- once per month: one sanitized engineering note
- after a major completed project: one public-safe case study
- after learning a reusable troubleshooting lesson: convert it into a generic checklist or test
- quarterly: remove stale content and improve the strongest two artifacts

## Phase 9 — What to measure

Do not obsess over vanity metrics. Track outcomes:

- recruiter profile views
- recruiter messages
- hiring-manager conversations
- interviews generated
- which portfolio link was used
- which repository gets mentioned in interviews
- which keywords lead people to your profile

If you later add privacy-respecting analytics, keep it minimal and disclose it.

## Positioning rule

Never use VIDRARCH to exaggerate your current job title. Keep the current title accurate. Let the architecture, production runbooks, validation discipline, and cross-domain work demonstrate the level at which you operate.

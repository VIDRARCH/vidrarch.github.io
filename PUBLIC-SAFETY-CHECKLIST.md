# Public-Safety Checklist for VIDRARCH

Use this before publishing any screenshot, case study, script, diagram, query, runbook, or repository.

## Never publish

- passwords, API keys, tokens, cookies, secrets, client secrets
- private keys, enrollment secrets, recovery material
- tenant IDs, internal subscription IDs, sensitive application IDs
- internal IP addresses, hostnames, DNS names, URLs, VPN names
- employee/user identities from real incidents or troubleshooting
- firewall rules, segmentation rules, allowlists, NAC policy detail
- non-public topology diagrams or packet paths
- real vulnerability evidence tied to identifiable systems
- exploit output from real production targets
- incident evidence, forensic artifacts, internal ticket numbers
- exact production detection gaps or alert-suppression logic
- screenshots from internal portals unless fully sanitized and approved
- proprietary vendor documents or copyrighted internal material

## Safer public pattern

Replace exact production detail with engineering evidence:

- **Problem:** what kind of risk or operational requirement existed?
- **Constraints:** what had to remain available or compatible?
- **Method:** what engineering process was used?
- **Validation:** how was success proven?
- **Business value:** what risk, resilience, or operational outcome improved?
- **Technology:** which products/protocols were used at a public-safe level?

## Query / detection safety

Public detection content should be:

- generic or lab-based
- documented as sample logic
- free of organization-specific indexes, hostnames, source types, allowlists, and thresholds
- reviewed for whether it exposes a real detection blind spot

## Final question

Before publishing, ask:

> Could a hostile person learn something operationally useful about my employer's defenses from this artifact?

If the answer might be yes, sanitize further or do not publish it.

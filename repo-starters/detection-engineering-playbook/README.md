# VIDRARCH Detection Engineering Playbook

Public-safe detection-engineering patterns for Splunk and Microsoft Defender.

## Purpose

Demonstrate a repeatable method for moving from telemetry discovery to a production-quality detection without publishing organization-specific defensive logic.

## Detection workflow

1. Define the behavior to detect.
2. Identify authoritative telemetry sources.
3. Verify actual field names and event availability.
4. Build a broad discovery query.
5. Narrow to the intended behavior.
6. Normalize only verified fields.
7. Test with known-good and known-bad examples where possible.
8. Document false-positive and false-negative considerations.
9. Add exclusions only after evidence review.
10. Define schedule, time window, severity, ownership, and response steps.
11. Validate alert delivery and downstream workflow.
12. Revisit after production data changes.

## Repository roadmap

- `splunk/` — generic SPL patterns
- `defender/` — generic KQL patterns
- `docs/` — detection specification template
- `tests/` — synthetic/logical test cases

## Public-safety rule

Do not publish real index names, hostnames, organization-specific allowlists, internal thresholds, detection gaps, or live incident indicators unless they are already public and safe to share.

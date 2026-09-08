# Splunk Platform Upgrade & Production Assurance

**Portfolio status:** Verified delivery  
**Domain:** SIEM / security platform engineering  
**Public-safe version:** Yes

## Problem

A Linux-based Splunk Enterprise system performing multiple operational roles needed to move to a supported security-fixed release without losing telemetry, changing the intended service identity, breaking dependent roles, or creating an untested recovery problem.

## Engineering approach

1. Verified the system was the full Splunk Enterprise package and documented its operational roles before change execution.
2. Validated package integrity and signing trust before installation.
3. Captured protected pre-change evidence covering configuration, service state, package identity, certificate state, and data-store readiness.
4. Used the supported migration path and explicit license-acceptance behavior rather than forcing a failed service start.
5. Preserved the intended runtime service account and existing operational roles.
6. Treated warnings as evidence to classify, not automatic proof of failure.

## Validation

Post-change validation included:

- product/version confirmation
- active and enabled service state
- intended non-root runtime identity
- forwarding connectivity to the cloud service
- deployment-server client activity
- KV Store readiness
- listening service checks
- certificate continuity
- ownership/configuration checks
- review of post-change warnings/errors

## Engineering value

The strongest evidence is not that a package was installed. It is that the platform was **returned to a known-good operating state and that state was proven across dependencies**.

This demonstrates:

- security platform ownership
- Linux production operations
- pre-change evidence capture
- package trust verification
- dependency validation
- recovery thinking
- security-to-operations communication
- closeout based on evidence

## Technology

Splunk Enterprise · Splunk Cloud · Linux / RHEL · systemd · KV Store · package verification · Heavy Forwarder · Deployment Server

## Sanitization

The public version intentionally omits hostnames, internal topology, cloud stack identifiers, organization-specific configuration, certificate fingerprints, account names, and other production values.

# Universal Forwarder Controlled Upgrade Pattern

**Portfolio status:** Verified method  
**Domain:** SIEM telemetry / production change engineering  
**Public-safe version:** Yes

## Problem

A security advisory required forwarder upgrades. The risk was not only patch compliance: an unsuccessful upgrade could stop security telemetry, alter service behavior, or leave a host in an uncertain state.

## Pilot lesson

The pilot demonstrated an important production prerequisite: the first post-upgrade service start required explicit acceptance of the updated product license. Starting the service before that prerequisite caused repeatable failures.

Instead of treating the pilot as a one-off fix, the lesson became a **production decision gate**.

## Engineering approach

Before rollout, verify:

- correct product type
- exact current version/build
- architecture
- installation path
- runtime service identity
- service state
- available disk space
- package integrity/signature
- usable backup
- configuration health

Stop rather than proceed when the actual host does not match the expected state.

## Validation

After upgrade, confirm:

- expected forwarder product/version
- correct forwarding type
- active/running service state
- configuration check success
- no new material ERROR/FATAL conditions
- current connection to the cloud receiver
- recent internal telemetry
- service enablement / boot persistence

## Engineering value

This case demonstrates how a pilot becomes an operational control: **discover → test → learn → codify → validate → repeat**.

## Sanitization

No production hostnames, indexes, environment-specific source types, deployment topology, or event counts are included here.

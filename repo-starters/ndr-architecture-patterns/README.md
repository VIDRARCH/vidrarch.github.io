# VIDRARCH NDR Architecture Patterns

Public-safe architecture notes for Security Onion, Zeek, Suricata, and packet-delivery design.

## Never size from link speed alone

A 10/25/40/100 Gb/s interface does not mean a sensor continuously receives that amount of traffic.

Gather:

- average throughput
- peak throughput
- packets per second
- traffic mix
- encryption percentage
- monitored interfaces
- north-south vs east-west mix
- backup/storage traffic
- retention requirements
- full-packet-capture requirements
- growth assumptions
- high-availability requirements

## Packet delivery questions

- SPAN, TAP, or packet broker?
- Where is deduplication performed?
- Are both directions visible?
- Are VLAN tags preserved as needed?
- Is oversubscription possible?
- How is packet loss measured?
- Is time synchronization reliable?
- Is management traffic separated?
- What happens if the packet broker or sensor fails?

## Acceptance tests

- expected Zeek metadata appears
- expected Suricata telemetry appears
- packet capture works where authorized
- timestamps are correct
- monitored paths match design
- sustained traffic does not overrun sensor capacity
- telemetry reaches downstream SIEM where intended

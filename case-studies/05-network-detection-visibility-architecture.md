# Network Detection & Visibility Architecture

**Portfolio status:** Architecture / design  
**Domain:** NDR / Security Onion / packet visibility  
**Public-safe version:** Yes

## Scope

Architecture work spans Security Onion, Zeek, Suricata, sensor/manager design, distributed deployment concepts, packet capture, metadata, packet-broker inputs, storage/retention, monitored throughput, and downstream SIEM integration.

## Architecture principle

Do not size or place sensors based only on theoretical interface speeds.

Useful inputs include:

- average observed throughput
- peak throughput
- packets per second when available
- traffic mix
- encrypted traffic proportion
- monitored interface count/speed
- north-south traffic
- east-west traffic
- server-to-server traffic
- desktop-to-server traffic
- wireless-to-internal traffic
- virtual-machine traffic
- backup/storage traffic
- retention requirements
- packet-capture requirements
- expected growth
- high-availability needs

## Packet-path validation

Architecture should validate:

- SPAN/TAP/packet-broker path
- deduplication behavior
- monitored link coverage
- sensor placement
- sustained throughput
- retention
- time synchronization
- management separation
- failure modes

## Acceptance evidence

- Zeek metadata quality
- Suricata telemetry/detections
- packet capture where authorized
- sensor health
- capacity trends
- downstream SIEM ingestion
- operational escalation path

## Sanitization

No network diagrams, VLANs, internal links, IP ranges, device names, packet-broker configuration, or production throughput measurements are published.

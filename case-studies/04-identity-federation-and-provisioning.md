# Identity Federation & Provisioning Engineering

**Portfolio status:** Active engineering domain  
**Domain:** Microsoft Entra ID / SSO / provisioning  
**Public-safe version:** Yes

## Scope

Enterprise identity work includes Microsoft Entra ID, enterprise applications, SAML, SCIM, OAuth/OIDC concepts, Conditional Access, claims and attributes, app registrations, service principals, certificates, sign-in evidence, and provisioning lifecycle behavior.

## Engineering method

For federation, explicitly map both sides of the trust relationship:

- Identifier / Entity ID
- Reply URL / ACS URL
- Sign-on URL
- issuer
- NameID
- claims and attributes
- signing certificate
- logout / relay behavior when applicable

For provisioning, validate:

- source attribute
- target attribute
- transformation / formatting behavior
- truncation risks
- scoping filters
- create/update/deprovision behavior
- entitlement/application-access dependencies

## Troubleshooting principle

Authentication success is not the same as application authorization success. Provisioning success is not the same as correct entitlement. Evidence should distinguish identity-provider behavior from application-side behavior.

## Engineering value

This work demonstrates cross-system trust engineering: understanding how identity, certificates, claims, application behavior, and lifecycle automation interact.

## Sanitization

No tenant IDs, client/application IDs, secrets, internal domains, usernames, claims from real users, or production URLs are included.

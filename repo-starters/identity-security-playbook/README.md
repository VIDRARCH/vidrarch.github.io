# VIDRARCH Identity Security Playbook

A public-safe engineering playbook for Microsoft Entra ID, SAML, SCIM, enterprise applications, and identity troubleshooting.

## Federation mapping worksheet

| Service-provider term | Identity-provider concept | Validate |
|---|---|---|
| Entity ID / Identifier | Audience / application identifier | Exact string and expected format |
| ACS / Reply URL | Assertion destination | Scheme, hostname, path, trailing slash |
| NameID | Subject identifier | Format and value source |
| Claims / attributes | Token attributes | Source, transformation, required/optional |
| Signing certificate | Trust anchor | Validity, rollover, algorithm, correct side |

## Provisioning validation

- source attribute
- target attribute
- transformation
- scoping filter
- create behavior
- update behavior
- disable/deprovision behavior
- group/entitlement behavior
- application-side limitations

## Troubleshooting principle

Separate these questions:

1. Did authentication succeed?
2. Did the expected identity/claims arrive?
3. Did the application map the identity correctly?
4. Does the user have the required entitlement?
5. Did provisioning create/update the expected account?

Do not treat these as one failure domain.

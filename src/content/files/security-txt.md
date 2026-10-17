---
title: SECURITY.TXT TEMPLATE
category: POLICIES
date: 2026-10-17
version: '1.0'
format: TXT
size: 1.3 KB
license: CC0-1.0
sha256: e49ac631489ceee922cacb6da67c1b8aef257b44e272edd6d79ccdb23a124b88
file: /files/policies/security-txt.txt
source: https://www.rfc-editor.org/rfc/rfc9116
tags: ["SECURITY","RFC 9116"]
summary: An RFC 9116 security.txt template for publishing a security contact at a predictable URL.
---

A template for `/.well-known/security.txt`: the standard place for
researchers to find a security contact, with required `Contact`, `Expires`
and `Canonical` fields.

## USE

- Replace every `[PLACEHOLDER]`, especially the expiry date.
- Publish at `/.well-known/security.txt`; serve it as `text/plain` over HTTPS.
- Refresh the file before `Expires` passes.

## NOTES

- RFC 9116 requires `Expires`; a date within one year is recommended.
- Multiple `Contact` lines are allowed; use `mailto:` or `https:` URLs only.

## SOURCE

RFC 9116: <https://www.rfc-editor.org/rfc/rfc9116>
securitytxt.org: <https://securitytxt.org/>

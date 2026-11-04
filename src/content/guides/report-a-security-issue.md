---
title: "REPORT A SECURITY ISSUE"
summary: "How to report a vulnerability responsibly, what to include, and what not to do."
audience: "Everyone"
updated: 2026-11-04
readingTime: "4 MIN"
tags: ["SECURITY", "CONTRIBUTE"]
order: 90
---

If you find a security problem, report it privately. Do not publish it, and do not test beyond what is needed to demonstrate the issue.

## WHAT TO INCLUDE

- the affected URL or product
- a short description
- reproduction steps
- the impact you observed
- browser, version, or environment
- a safe way to contact you
- whether you want credit

## WHAT NOT TO DO

- do not access other people's data
- do not run denial-of-service tests
- do not use social engineering
- do not publish details before the maintainer has time to respond
- do not demand payment

## FIND THE CONTACT

Look for `/.well-known/security.txt`, a `SECURITY.md`, or a security contact in the repository. If none exists, contact the maintainer through the ordinary public contact channel and ask for a private route.

## AFTER THE REPORT

Keep the thread private. Give the maintainer time to reproduce and fix. If the issue is not fixed, you can escalate responsibly, but do not publish exploit details without warning.

This site's policy is at [SECURITY](/security/) and [/.well-known/security.txt](/.well-known/security.txt). The full RFC is [RFC 9116](/files/rfc-9116/).

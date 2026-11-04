---
title: "PUBLISH SECURITY.TXT"
summary: "A five-minute file that tells security researchers how to contact you."
audience: "Site owners"
updated: 2026-11-04
readingTime: "4 MIN"
tags: ["SECURITY", "STANDARDS"]
order: 50
---

`security.txt` is a small text file at `/.well-known/security.txt`. It tells people how to report a vulnerability.

## MINIMAL FILE

```text
Contact: mailto:security@example.com
Expires: 2027-12-31T00:00:00.000Z
Preferred-Languages: en
Canonical: https://example.com/.well-known/security.txt
```

`Contact` and `Expires` are required. The `Expires` date must be in the future.

## OPTIONAL FIELDS

- `Encryption` — a link to a public key
- `Acknowledgments` — a page thanking reporters
- `Policy` — your disclosure policy
- `Hiring` — security jobs, if relevant
- `CSA` — a CSIRT contact

## CHECKLIST

- [ ] File is at `/.well-known/security.txt`
- [ ] `Contact` points to a monitored inbox
- [ ] `Expires` is less than a year away and in the future
- [ ] The file is served over HTTPS
- [ ] The contact address actually receives mail
- [ ] The policy explains scope and safe harbor

The full specification is [RFC 9116](/files/rfc-9116/). This site publishes its own at [/.well-known/security.txt](/.well-known/security.txt).

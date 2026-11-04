---
title: "VERIFY A DOWNLOAD"
summary: "How to check that a file is the one that was published, using SHA-256."
audience: "Everyone"
updated: 2026-11-04
readingTime: "4 MIN"
tags: ["SECURITY", "FILES"]
order: 60
---

A checksum is a fingerprint of a file. If the file changes, the checksum changes.

## ON MACOS OR LINUX

```sh
shasum -a 256 file.zip
```

## ON WINDOWS

```powershell
Get-FileHash file.zip -Algorithm SHA256
```

Compare the result with the checksum published on the file page. They must match exactly.

## WHAT A MATCH MEANS

- The file is byte-for-byte the published version.
- It was not corrupted in transit.
- It was not silently replaced.

It does **not** mean the publisher is trustworthy. It only connects the file to the published checksum.

## WHY SHA-256

SHA-256 is widely supported and collision-resistant for this purpose. MD5 and SHA-1 are obsolete for integrity checks.

## THIS SITE

Every local file has a SHA-256 on its detail page. You can also use the [checksum tool](/universe/checksum/) or the [CLI](/cli/) `verify` command. The full inventory is at [`/cli/manifest.tsv`](/cli/manifest.tsv), with its own checksum at [`/cli/manifest-sha256.txt`](/cli/manifest-sha256.txt).

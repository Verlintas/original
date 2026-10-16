---
title: HOW FILES ARE DISTRIBUTED
date: 2026-10-14
summary: Small files live in the repository; large files live on GitHub Releases.
---

A short explanation of the logistics, so nobody has to guess where a download will
come from.

## THE RULE

- **Small files** — a few megabytes or less — are committed into this site's repository
  and served directly from `original.wales`. One click, one file, no redirects.
- **Large files** — anything that would bloat the repository — are mirrored on
  **GitHub Releases**. The site holds the link and the metadata; GitHub holds the bytes.

## WHY

The repository should stay small enough to clone in a moment, and the files should stay
large enough to be useful. GitHub Releases is designed exactly for this split, and it
keeps every version of every large file addressable forever.

## VERIFICATION

Where a checksum exists, it is printed on the file's page under **SHA-256**. Compute
the file's hash locally and compare. If they differ, the download is not the file this
site published.

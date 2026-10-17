---
title: SPDX HEADERS
category: HEADERS
date: 2026-10-17
version: '1.0'
format: TXT
size: 1.2 KB
license: CC0-1.0
sha256: d7e434ff5bfa778ae64096fef0cdf7486727896114d03e1a9e925ca6ad7949a3
file: /files/headers/spdx.txt
source: https://spdx.dev/learn/handling-license-info/
tags: ["SPDX","HEADER"]
summary: Machine-readable copyright and license lines for every source file, in SPDX form.
---

Two lines — `SPDX-FileCopyrightText` and `SPDX-License-Identifier` — that
state ownership and license in a form tools can read. The approach used by
the REUSE initiative.

## USE

- Put both lines at the top of every file, in the language's comment syntax.
- Use identifiers from the SPDX License List; expressions such as
  `MIT OR Apache-2.0` are allowed.

## NOTES

- Works well with license scanners and package metadata.
- The REUSE specification builds on this per-file approach.

## SOURCE

SPDX license identifiers: <https://spdx.dev/learn/handling-license-info/>
SPDX License List: <https://spdx.org/licenses/>
REUSE specification: <https://reuse.software/spec/>

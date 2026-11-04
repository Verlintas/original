# Contributing to Original

Original is a public resource for canonical texts, plain-language guides, everyday tools, and
source-linked data.

- Read the public contribution guide: https://original.wales/contribute/
- Editorial policy and corrections: https://original.wales/guides/transparency/
- Machine-readable inventory: https://original.wales/index.json

## Before opening a pull request

1. Use a primary or clearly licensed source.
2. Add the file under `public/files/<category>/` and a content entry under `src/content/files/`
   with a real size and SHA-256.
3. Run `npm run build`; the prebuild step regenerates kits and library archives.
4. Keep third-party texts under their original licenses.
5. Record user-facing changes in `src/data/corrections.ts` when appropriate.

Security reports: security@original.wales. Do not open a public issue for a vulnerability.

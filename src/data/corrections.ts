export interface Correction {
  date: string;
  title: string;
  detail: string;
  type: 'ADDITION' | 'CORRECTION' | 'REMOVAL' | 'SYSTEM';
}

export const corrections: Correction[] = [
  {
    date: '2026-11-04',
    title: 'Added a public layer',
    detail: 'Guides, letters, checklists, directory, data packs, downloads, transparency, and contribution pages.',
    type: 'ADDITION',
  },
  {
    date: '2026-11-04',
    title: 'Added reading, kits, search, and trust features',
    detail: 'Full-text file previews, copy/citation, SHA-256 verification, four kits, full-text search, llms corpora, JSON schemas, and a build card on STATUS.',
    type: 'ADDITION',
  },
  {
    date: '2026-11-04',
    title: 'Added official standards and licenses',
    detail: 'Expanded FILES with official SPDX, Creative Commons, RFC, OSI, and gitignore sources.',
    type: 'ADDITION',
  },
  {
    date: '2026-10-31',
    title: 'Added the agent layer',
    detail: 'AGENTS.md, CLI manual, context packs, citations, manifest, and machine-readable license data.',
    type: 'ADDITION',
  },
  {
    date: '2026-10-31',
    title: 'Switched email forwarding to ImprovMX',
    detail: 'The previous forwarding product accepted SMTP but did not deliver. MX records now point to ImprovMX.',
    type: 'SYSTEM',
  },
  {
    date: '2026-10-17',
    title: 'Rebuilt the site as a static library',
    detail: 'Moved to Astro and GitHub Pages, with plain-text files, checksums, and a white-and-red system.',
    type: 'SYSTEM',
  },
];

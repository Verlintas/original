export interface CuratedLink {
  name: string;
  url: string;
  note: string;
}

export const links: CuratedLink[] = [
  {
    name: 'GITHUB — VERLINTAS',
    url: 'https://github.com/Verlintas',
    note: 'The account behind this site. Source code, releases, and everything else.',
  },
  {
    name: 'ASTRO',
    url: 'https://astro.build',
    note: 'The static site framework Original is built with. No client-side JavaScript.',
  },
  {
    name: 'GITHUB PAGES',
    url: 'https://pages.github.com',
    note: 'The free hosting that serves this site from a git repository.',
  },
  {
    name: 'MDN WEB DOCS',
    url: 'https://developer.mozilla.org',
    note: 'The reference for everything the web is made of.',
  },
  {
    name: 'RSS SPECIFICATION',
    url: 'https://www.rssboard.org/rss-specification',
    note: 'Why this site still offers a feed in an age of algorithms.',
  },
  {
    name: 'ORIGINAL — RSS',
    url: '/rss.xml',
    note: 'Subscribe to every file and note published here.',
  },
];

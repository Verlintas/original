export interface SiteSection {
  name: string;
  path: string;
  description: string;
}

export const sections: SiteSection[] = [
  { name: 'MAIN', path: '/', description: 'Home.' },
  { name: 'STATUS', path: '/status/', description: 'Build information and live checks for sites, projects, and services.' },
  { name: 'FILES', path: '/files/', description: 'Licenses, standards, kits, snippets, and policy, governance, and agent templates.' },
  { name: 'UNIVERSE', path: '/universe/', description: 'Browser tools.' },
  { name: 'ABOUT', path: '/about/', description: 'About the site and its maintainer.' },
  { name: 'CLI', path: '/cli/', description: 'Terminal interface; supports ?cmd=.' },
];

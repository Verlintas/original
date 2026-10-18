export interface CuratedLink {
  name: string;
  url: string;
  note: string;
}

export const links: CuratedLink[] = [
  {
    name: 'EMAIL',
    url: 'mailto:contact@original.wales',
    note: 'Contact the maintainer.',
  },
  {
    name: 'SECURITY',
    url: 'mailto:security@original.wales',
    note: 'Report vulnerabilities privately.',
  },
  {
    name: 'GITHUB — VERLINTAS',
    url: 'https://github.com/Verlintas',
    note: 'Source code, releases, and the repository behind this site.',
  },
  {
    name: 'NOVABAIC',
    url: 'https://github.com/Verlintas/NovaBAIC',
    note: 'Local-first Android AI agent with device tools.',
  },
  {
    name: 'OPENVISUM',
    url: 'https://github.com/Verlintas/OpenVisum',
    note: 'Open-source Android video player built on libVLC.',
  },
  {
    name: 'OPENTRADUKO',
    url: 'https://github.com/Verlintas/OpenTraduko',
    note: 'Offline-first Android simultaneous interpretation.',
  },
  {
    name: 'SECURLAB',
    url: 'https://github.com/Verlintas/SecurLab',
    note: 'Minecraft server security testing workbench.',
  },
  {
    name: 'ORIGINAL — RSS',
    url: '/rss.xml',
    note: 'Feed of files published here.',
  },
];

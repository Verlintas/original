export interface MonitoredSite {
  name: string;
  url: string;
  note: string;
}

export const sites: MonitoredSite[] = [
  {
    name: 'ORIGINAL.WALES',
    url: 'https://original.wales',
    note: 'This site.',
  },
  {
    name: 'WIKIPEDIA',
    url: 'https://www.wikipedia.org',
    note: 'Public knowledge.',
  },
  {
    name: 'INTERNET ARCHIVE',
    url: 'https://archive.org',
    note: 'Public archive.',
  },
  {
    name: 'SPDX',
    url: 'https://spdx.org',
    note: 'License and SBOM standards.',
  },
  {
    name: 'CREATIVE COMMONS',
    url: 'https://creativecommons.org',
    note: 'Content licenses.',
  },
  {
    name: 'RFC EDITOR',
    url: 'https://www.rfc-editor.org',
    note: 'Internet standards.',
  },
  {
    name: 'OPEN SOURCE INITIATIVE',
    url: 'https://opensource.org',
    note: 'Open Source Definition.',
  },
  {
    name: 'W3C',
    url: 'https://www.w3.org',
    note: 'Web standards.',
  },
];

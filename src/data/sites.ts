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
    name: 'VERLINTAS.DEV',
    url: 'https://verlintas.dev',
    note: 'Personal site.',
  },
];

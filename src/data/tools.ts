export interface Tool {
  id: string;
  index: string;
  name: string;
  url: string;
  description: string;
}

export const tools: Tool[] = [
  {
    id: 'checksum',
    index: '01',
    name: 'CHECKSUM',
    url: '/universe/checksum/',
    description: 'Compute the SHA-256 checksum of any file, locally in the browser.',
  },
  {
    id: 'json',
    index: '02',
    name: 'JSON',
    url: '/universe/json/',
    description: 'Validate, format, and minify JSON without leaving the page.',
  },
  {
    id: 'license-compare',
    index: '03',
    name: 'LICENSE COMPARE',
    url: '/universe/license-compare/',
    description: 'Compare permissions, conditions, and limitations across sixteen licenses.',
  },
];

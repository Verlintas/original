// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://original.wales',
  integrations: [
    sitemap({
      filter: (page) =>
        !page.includes('/cli/') &&
        !page.includes('/404') &&
        !page.endsWith('.md') &&
        !page.endsWith('.json') &&
        !page.endsWith('.txt'),
    }),
  ],
  trailingSlash: 'ignore',
});

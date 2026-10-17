import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const files = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/files' }),
  schema: z.object({
    title: z.string(),
    category: z.enum(['LICENSES', 'HEADERS', 'POLICIES', 'GOVERNANCE']),
    date: z.coerce.date(),
    version: z.string().default('1.0'),
    format: z.string(),
    size: z.string(),
    license: z.string().default('CC0-1.0'),
    sha256: z.string().optional(),
    file: z.string().optional(),
    external: z.string().url().optional(),
    source: z.string().url().optional(),
    tags: z.array(z.string()).default([]),
    summary: z.string(),
  }),
});

export const collections = { files };

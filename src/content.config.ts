import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const files = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/files' }),
  schema: z.object({
    title: z.string(),
    category: z.enum(['DOCUMENTS', 'TOOLS', 'MEDIA', 'ARCHIVE']),
    date: z.coerce.date(),
    version: z.string().default('1.0'),
    format: z.string(),
    size: z.string(),
    license: z.string().default('CC BY 4.0'),
    sha256: z.string().optional(),
    file: z.string().optional(),
    external: z.string().url().optional(),
    summary: z.string(),
    order: z.number().default(0),
  }),
});

const notes = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/notes' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    summary: z.string(),
  }),
});

export const collections = { files, notes };

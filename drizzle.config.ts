import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './lib/db/schema.ts',
  out: './lib/db/migrations',
  dialect: 'postgresql' as const,
  dbCredentials: {
    url: process.env.DATABASE_URL as string,
  },
} as any); 
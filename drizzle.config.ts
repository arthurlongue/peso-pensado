import { defineConfig } from 'drizzle-kit';

/** Drizzle Kit CLI config — used by `drizzle-kit generate` to produce SQL migrations. */
export default defineConfig({
  schema: './db/schema.ts',
  out: './db/migrations',
  dialect: 'sqlite',
});

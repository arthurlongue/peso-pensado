/**
 * Web adapter for the database initialization boundary.
 *
 * The app supports a browser shell/demo mode that renders routes and
 * bundled read-only data, but has **no persistence contract**. This
 * module satisfies the same `initializeDatabase()` export that the
 * native client provides, but intentionally does nothing — web screens
 * read from bundled JSON via their `.web.ts` repository adapters.
 *
 * This is not a placeholder. It is the intentional contract for the
 * web platform mode.
 */
export async function initializeDatabase(): Promise<void> {
  // Web shell: no SQLite, no migrations, no seed.
  // Repository adapters (e.g. exercise-library.web.ts) read bundled data.
}

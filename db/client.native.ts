import { openDatabaseSync } from 'expo-sqlite';
import { drizzle } from 'drizzle-orm/expo-sqlite';
import { migrate } from 'drizzle-orm/expo-sqlite/migrator';
import * as schema from './schema';
import migrations from './migrations/migrations';
import { seedExerciseLibrary } from './seed/seed';

/**
 * Raw expo-sqlite connection. Needed by Drizzle's migrator.
 * Opens (or creates) the SQLite file in the app's private storage.
 */
const expoDb = openDatabaseSync('peso-pensado.db');

/**
 * Typed Drizzle instance — use this for all queries throughout the app.
 * The `schema` argument enables the relational query API (`db.query.table.findMany()`).
 */
export const db = drizzle(expoDb, { schema });

let initializationPromise: Promise<void> | null = null;

/**
 * Opens the database, runs any pending migrations, and seeds the exercise library.
 * Call once from the root layout on app mount.
 * Safe to call multiple times — migrations and seeding are idempotent.
 */
export async function initializeDatabase() {
  if (!initializationPromise) {
    initializationPromise = (async () => {
      await migrate(db, migrations);
      await seedExerciseLibrary(db);
    })();
  }

  await initializationPromise;
}

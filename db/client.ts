import { openDatabaseSync } from 'expo-sqlite';
import { drizzle } from 'drizzle-orm/expo-sqlite';
import { migrate } from 'drizzle-orm/expo-sqlite/migrator';
import * as schema from './schema';
import migrations from './migrations/migrations';

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

/**
 * Opens the database and runs any pending migrations.
 * Call once from the root layout on app mount.
 * Safe to call multiple times — only new migrations execute.
 */
export function initializeDatabase() {
  migrate(db, migrations);
}

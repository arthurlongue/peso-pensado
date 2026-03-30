import journal from './meta/_journal.json';
import migration0 from './0000_perfect_wendell_vaughn';

/**
 * Bundles all SQL migration files with their journal metadata.
 * Drizzle's migrator reads this to know which migrations to apply.
 *
 * Each entry maps the journal tag to the raw SQL string.
 * When adding new migrations, add a new import and entry here.
 */
const migrations = {
  journal,
  migrations: {
    m0000: migration0,
  } as Record<string, string>,
};

export default migrations;

import journal from './meta/_journal.json';

/**
 * Bundles all SQL migration files with their journal metadata.
 * Drizzle's migrator reads this to know which migrations to apply.
 *
 * Each entry maps the journal tag (e.g. "0000_perfect_wendell_vaughn")
 * to the raw SQL from the corresponding .sql file.
 */
const migrations = {
  journal,
  m: {
    '0000_perfect_wendell_vaughn': require('./0000_perfect_wendell_vaughn.sql'),
  } as Record<string, string>,
};

export default migrations;

/**
 * Web adapter for the exercise library repository.
 *
 * Returns the exercise count from the bundled JSON dataset.
 * This is read-only demo data — there is no SQLite on web.
 */
import exercises from './seed/exercises.json';

/**
 * Returns the total number of exercises in the bundled library.
 *
 * On native this queries SQLite; on web it reads the static JSON.
 */
export async function getExerciseLibraryCount(): Promise<number> {
  return exercises.length;
}

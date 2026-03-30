import exercises from './seed/exercises.json';

export async function getExerciseLibraryCount(): Promise<number> {
  return exercises.length;
}

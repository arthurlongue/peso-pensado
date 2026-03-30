import { db } from '../client';
import { exerciseLibraryItems } from '../schema';
import exercises from './exercises.json';

/**
 * Seeds the exercise library table from the bundled JSON dataset.
 * Idempotent — if the table already has rows, it skips insertion.
 */
export async function seedExerciseLibrary(): Promise<void> {
  const existing = await db.select().from(exerciseLibraryItems).limit(1);

  if (existing.length > 0) {
    return;
  }

  const values = exercises.map((exercise) => ({
    id: exercise.id,
    name: exercise.name,
    forceType: exercise.force,
    level: exercise.level,
    mechanic: exercise.mechanic,
    equipment: exercise.equipment,
    primaryMuscles: JSON.stringify(exercise.primaryMuscles),
    secondaryMuscles: JSON.stringify(exercise.secondaryMuscles),
    instructions: JSON.stringify(exercise.instructions),
    category: exercise.category,
    images: JSON.stringify(exercise.images),
  }));

  await db.insert(exerciseLibraryItems).values(values);
}

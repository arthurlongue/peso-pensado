import { count } from 'drizzle-orm';
import { db } from './client';
import { exerciseLibraryItems } from './schema';

export async function getExerciseLibraryCount(): Promise<number> {
  const [result] = await db.select({ count: count() }).from(exerciseLibraryItems);

  return result?.count ?? 0;
}

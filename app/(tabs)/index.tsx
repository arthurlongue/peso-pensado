import { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { db } from "../../db/client";
import { exerciseLibraryItems } from "../../db/schema";
import { count } from "drizzle-orm";

/**
 * Home tab — workout templates list.
 *
 * This is the primary screen of the app. Shows all workout templates
 * owned by the current user, with a FAB to create new templates.
 *
 * Currently a placeholder — will be implemented in Phase 4.
 *
 * TEMP: displays exercise library count to verify Phase 1 end-to-end.
 * Remove after verification.
 */
export default function HomeScreen() {
  const [exerciseCount, setExerciseCount] = useState<number | null>(null);

  useEffect(() => {
    db.select({ count: count() })
      .from(exerciseLibraryItems)
      .then((result) => setExerciseCount(result[0].count));
  }, []);

  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-2xl font-bold text-neutral-900">Peso Pensado</Text>
      <Text className="mt-2 text-sm text-neutral-500">Seus treinos aparecerão aqui</Text>
      {exerciseCount !== null && (
        <Text className="mt-4 text-sm text-emerald-600">
          {exerciseCount} exercícios carregados
        </Text>
      )}
    </View>
  );
}

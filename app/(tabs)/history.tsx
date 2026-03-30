import { View, Text } from "react-native";

/**
 * History tab — completed workout sessions list.
 *
 * Shows a chronological list of all completed workout sessions
 * with date, template name, and summary stats.
 *
 * Currently a placeholder — will be implemented in Phase 6.
 */
export default function HistoryScreen() {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-2xl font-bold text-neutral-900">Histórico</Text>
      <Text className="mt-2 text-sm text-neutral-500">Suas sessões aparecerão aqui</Text>
    </View>
  );
}

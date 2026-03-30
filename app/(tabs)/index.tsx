import { View, Text } from "react-native";

/**
 * Home tab — workout templates list.
 *
 * This is the primary screen of the app. Shows all workout templates
 * owned by the current user, with a FAB to create new templates.
 *
 * Currently a placeholder — will be implemented in Phase 4.
 */
export default function HomeScreen() {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-2xl font-bold text-neutral-900">Peso Pensado</Text>
      <Text className="mt-2 text-sm text-neutral-500">Seus treinos aparecerão aqui</Text>
    </View>
  );
}

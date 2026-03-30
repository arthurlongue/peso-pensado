import { View, Text } from "react-native";

/**
 * Profile tab — user profile and settings.
 *
 * Combined profile + settings screen for MVP. Shows user name,
 * weight unit preference, and other configuration options.
 *
 * Currently a placeholder — will be implemented in Phase 6.
 */
export default function ProfileScreen() {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-2xl font-bold text-neutral-900">Perfil</Text>
      <Text className="mt-2 text-sm text-neutral-500">Configurações do app</Text>
    </View>
  );
}

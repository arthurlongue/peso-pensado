import "../global.css";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

/**
 * Root layout for the entire app.
 *
 * This is the top-level wrapper — everything in the app renders inside
 * this Stack navigator. Database initialization and global providers
 * will be added here in later phases.
 *
 * Expo Router renders this once on app launch. The {@link Stack}
 * navigator provides native-feeling screen transitions (slide, push).
 */
export default function RootLayout() {
  return (
    <>
      <StatusBar style="auto" />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: "#fff" },
          headerTintColor: "#111",
        }}
      >
        {/* Tab screens are defined inside (tabs)/_layout.tsx */}
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </>
  );
}

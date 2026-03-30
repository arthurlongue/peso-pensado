import "../global.css";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { initializeDatabase } from "../db/client";

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
  const [databaseState, setDatabaseState] = useState<"loading" | "ready" | "error">("loading");

  useEffect(() => {
    let isMounted = true;

    initializeDatabase()
      .then(() => {
        if (isMounted) {
          setDatabaseState("ready");
        }
      })
      .catch((error: unknown) => {
        console.error("Failed to initialize database", error);

        if (isMounted) {
          setDatabaseState("error");
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  if (databaseState === "loading") {
    return (
      <View className="flex-1 items-center justify-center bg-white px-6">
        <StatusBar style="auto" />
        <Text className="text-2xl font-bold text-neutral-900">Peso Pensado</Text>
        <Text className="mt-2 text-center text-sm text-neutral-500">
          Carregando dados do app
        </Text>
      </View>
    );
  }

  if (databaseState === "error") {
    return (
      <View className="flex-1 items-center justify-center bg-white px-6">
        <StatusBar style="auto" />
        <Text className="text-2xl font-bold text-neutral-900">Peso Pensado</Text>
        <Text className="mt-2 text-center text-sm text-red-600">
          Falha ao abrir os dados locais.
        </Text>
      </View>
    );
  }

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

import { Tabs } from "expo-router";

/**
 * Tab navigator layout — the main navigation pattern of the app.
 *
 * Defines three tabs:
 * - **Home** (index) — workout templates list
 * - **History** — completed workout sessions
 * - **Profile** — user profile + settings
 *
 * The bottom tab bar is the primary navigation for the app.
 * All other screens (template editor, active session, etc.) are
 * pushed on top of this tab navigator as stack screens.
 */
export default function TabLayout() {
	return (
		<Tabs
			screenOptions={{
				headerStyle: { backgroundColor: "#fff" },
				headerTintColor: "#111",
				tabBarActiveTintColor: "#2563EB",
			}}
		>
			<Tabs.Screen
				name="index"
				options={{
					title: "Treinos",
					tabBarLabel: "Treinos",
				}}
			/>
			<Tabs.Screen
				name="history"
				options={{
					title: "Histórico",
					tabBarLabel: "Histórico",
				}}
			/>
			<Tabs.Screen
				name="profile"
				options={{
					title: "Perfil",
					tabBarLabel: "Perfil",
				}}
			/>
		</Tabs>
	);
}

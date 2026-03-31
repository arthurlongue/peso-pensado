# Phase 0: Bootstrap

## Goal
Set up the Expo project, install dependencies, create folder structure, verify the app boots with working tab navigation.

## What you'll learn
- How an Expo project compares to a Next.js/Vite project
- What each dependency does and why we chose it
- How Expo Router's file-based routing works (similar to Next.js App Router)

## Expo vs Next.js/Vite — mental map

| Concept | Next.js / Vite | Expo |
|---------|---------------|------|
| Entry point | `page.tsx` or `main.tsx` | `expo-router/entry` (configured in package.json `"main"`) |
| Routing | `app/` directory (Next.js) | `app/` directory (Expo Router) — same idea |
| Layout wrapper | `app/layout.tsx` | `app/_layout.tsx` — note the underscore prefix |
| CSS | Tailwind / CSS files | NativeWind (`className`) — no CSS files exist |
| Database | PostgreSQL, etc. | SQLite on device — no server |
| Build output | `.next/` or `dist/` | Native binary via EAS Build, or run via Expo Go |
| `<div>` | `<div>` | `<View>` — flexbox by default, no block/inline |

## Tasks

### 0.1 Initialize Expo project — DONE
- [x] Scaffold Expo project with TypeScript
- [x] Create `package.json` with `"main": "expo-router/entry"`
  - **Why `expo-router/entry`?** In a web app, your entry is `main.tsx` → `<App/>`. With Expo Router, the entry point IS the router — it reads your `app/` folder and generates the navigation. No `App.tsx` needed.
- **Constraint**: Do NOT create an `App.tsx` or `index.ts` at the root. Expo Router replaces both.
- **Expected**: `package.json`, `tsconfig.json`, `app.json` exist at project root.

### 0.2 Install core dependencies — DONE
- [x] Install via pnpm (NOT npm or yarn — project uses pnpm)
- **What each dependency does**:
  - `expo` + `react-native` + `react` — the runtime (like React + ReactDOM for web)
  - `expo-router` — file-based routing (like Next.js App Router)
  - `expo-sqlite` — SQLite access on device (like having a local PostgreSQL)
  - `drizzle-orm` — typed query builder over SQLite (like Prisma but closer to SQL)
  - `zod` — schema validation (same library you know from web)
  - `react-hook-form` + `@hookform/resolvers` — form management for setup/templates
  - `@rneui/themed` — pre-built mobile components (BottomSheet, ListItem, etc.)
  - `nativewind` — Tailwind CSS syntax for React Native
  - `react-native-screens` + `react-native-safe-area-context` — native navigation primitives that Expo Router needs under the hood

### 0.3 Create folder structure — DONE
- [x] Create `app/`, `db/`, `components/`, `lib/`
- **Why this structure**: Same mental model as Next.js — `app/` is routing, everything else is support code.

### 0.4 Configure Expo Router — DONE
- [x] Root layout (`app/_layout.tsx`) — wraps everything, like Next.js `app/layout.tsx`
- [x] Tab layout (`app/(tabs)/_layout.tsx`) — defines the bottom tab bar
- [x] Three tab stubs: `index.tsx`, `history.tsx`, `profile.tsx`
- **Why two layouts?** In Next.js, you'd have `app/layout.tsx` (root) and `app/(marketing)/layout.tsx` (group-specific). Same pattern here — root provides the Stack navigator (screen push/pop), tab layout provides the bottom tabs. They nest: root → tabs → screen content.
- **Why `(tabs)` with parentheses?** Same as Next.js route groups — `(tabs)` groups routes without adding `/tabs/` to the URL. It's an organizational folder, not a path segment.

### 0.5 Install and configure NativeWind — DONE
- [x] Install `nativewind` (v4) and `tailwindcss` (v3 — v4 is not supported by NativeWind v4)
- [x] Create `tailwind.config.js` with NativeWind preset + `darkMode: "class"`
- [x] Create `global.css` with Tailwind v3 directives (`@tailwind base/components/utilities`)
- [x] Create `babel.config.js` with `nativewind/babel` preset + `jsxImportSource: "nativewind"`
- [x] Create `metro.config.js` wrapping config with `withNativeWind`
- [x] Update `app/_layout.tsx` to import `global.css`
- [x] Convert tab screens from `StyleSheet.create` to `className`
- **Why NativeWind?** Instead of `StyleSheet.create({ container: { flex: 1 } })`, you write `className="flex-1"`. Same Tailwind you know from web.
- **Constraint**: NativeWind does NOT support ALL Tailwind utilities. Things like `hover:`, `@media`, CSS animations work differently or not at all. Stick to layout, spacing, colors, typography utilities.
- **Expected**: After this, all screens use `className` instead of `StyleSheet.create`.

### 0.6 Verify app runs — DONE
- [x] Run `pnpm start` (starts Expo dev server)
- [x] Open on device via Expo Go (downloaded from expo.dev/go for SDK 55 compatibility)
- [x] Open on web via `w` key (installed `react-dom` + `react-native-web`)
- [x] Confirm: 3-tab bottom navigation visible, tab switching works
- **Result**: App runs on both web and device. Metro bundler starts, QR code scans correctly with Expo Go.
- **Note**: Web runs in shell/demo mode — routes render with bundled read-only data, no local persistence.

## Notes
- Phase 0 is intentionally minimal — no database, no real data, just scaffolding.
- Each subsequent phase builds on this structure without reorganizing folders.

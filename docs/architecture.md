# Architecture

## System Overview

Peso Pensado is a **mobile-first, local-first** workout logging app. The entire system runs on a single device with no network dependency.

```
┌─────────────────────────────────────────────┐
│                  Mobile App                  │
│  ┌───────────┐  ┌───────────┐  ┌─────────┐ │
│  │   Expo     │  │   Expo    │  │  RNE    │ │
│  │   Router   │  │   SDK     │  │  UI     │ │
│  └─────┬─────┘  └─────┬─────┘  └────┬────┘ │
│        │              │              │       │
│  ┌─────┴──────────────┴──────────────┴────┐ │
│  │           React Native                  │ │
│  └──────────────────┬─────────────────────┘ │
│                     │                        │
│  ┌──────────────────┴─────────────────────┐ │
│  │   Drizzle ORM                          │ │
│  └──────────────────┬─────────────────────┘ │
│                     │                        │
│  ┌──────────────────┴─────────────────────┐ │
│  │        SQLite (expo-sqlite)             │ │
│  │     Local database on device            │ │
│  └────────────────────────────────────────┘ │
└─────────────────────────────────────────────┘

No server. No network. No sync (yet).
```

## Tech Stack

| Layer | Technology | Why |
|-------|-----------|-----|
| App framework | Expo + React Native | Mobile-first, fast iteration, native feel |
| Routing | Expo Router | File-based routing, deep linking, tab support |
| Database | SQLite via expo-sqlite | Local-first, durable, no network needed |
| ORM | Drizzle ORM | Typed schemas, migrations, close to SQL |
| UI components | RNE UI | Pragmatic mobile components, Expo-friendly |
| Forms | React Hook Form + Zod | Only for true forms (setup, templates, exercises) |
| Validation | Zod | Schema validation at boundaries |
| Active session | useState/useReducer + direct DB writes | NOT a form — lightweight state + immediate persistence |

## Core Architectural Boundary: Planning vs. Execution

This is the most important split in the app:

```
PLANNING (templates)          EXECUTION (sessions)
─────────────────────         ────────────────────
WorkoutTemplate               WorkoutSession
WorkoutTemplateExercise       WorkoutSessionExercise
                              SetEntry

Never modified by sessions    Created from template snapshot
Define future sessions        Independent after snapshot
                              Sets logged here only
```

**When a session starts:**
1. Template exercises are **snapshotted** into session exercises
2. From that point, the session is independent
3. Session changes (reorder, add sets, add exercises) **never mutate** the template
4. Sets belong only to session exercises, never template exercises

## Data Flow

```
[Create Template] → WorkoutTemplate + WorkoutTemplateExercise[]
                          │
                     [Start Session]
                          │
                          ▼
               WorkoutSession (status: in_progress)
               WorkoutSessionExercise[] (snapshot from template)
                          │
                    [Log Sets]
                          │
                          ▼
               SetEntry[] (warmup | working)
                          │
                  [Complete Session]
                          │
                          ▼
               WorkoutSession (status: completed)
                          │
                     [View History]
```

## Folder Structure

```
peso-pensado/
├── app/                          # Expo Router screens
│   ├── _layout.tsx               # Root layout (providers, db init)
│   ├── (tabs)/                   # Tab navigator group
│   │   ├── _layout.tsx           # Tab bar: Home | History | Profile
│   │   ├── index.tsx             # Home tab = Templates list
│   │   ├── history.tsx           # History tab = Completed sessions
│   │   └── profile.tsx           # Profile tab = Profile + Settings
│   ├── template/
│   │   └── [id].tsx              # Template editor (create/edit)
│   ├── session/
│   │   ├── active.tsx            # Active workout session (CORE screen)
│   │   └── [id].tsx              # Completed session detail (read-only)
│   └── setup.tsx                 # Lightweight setup (profile + units)
├── db/                           # Database layer
│   ├── schema.ts                 # Drizzle schema definitions (all tables)
│   ├── client.ts                 # Database connection + migration helper
│   ├── migrations/               # Generated SQL migration files
│   └── seed/
│       ├── exercises.json        # Built-in exercise dataset (873 PT-BR)
│       └── seed.ts               # Seed function (idempotent insert)
├── components/                   # Reusable UI components
├── lib/                          # Shared utilities
│   ├── types.ts                  # Shared TypeScript types
│   └── constants.ts              # App-wide constants
├── docs/                         # Documentation
└── openspec/                     # OpenSpec capability specs
```

## Navigation Map

```
App Launch
    │
    ├── No Owner? ──→ Welcome/Setup ──→ Home (Templates)
    │
    └── Has Owner? ──→ Home (Templates)
                          │
        ┌─────────────────┼─────────────────┐
        │                 │                 │
   [Tab: Home]      [Tab: History]    [Tab: Profile]
   Templates list    Session history   Profile + Settings
        │                 │
        ├── Create Template    ├── Session Detail
        │   → template/[id]       → session/[id]
        │                         (read-only)
        ├── Edit Template
        │   → template/[id]
        │
        └── Start Session
            → session/active
               │
               └── Complete
                   → Back to Home
```

### Route to Screen Mapping

| Expo Router Path | Screen | Type |
|-----------------|--------|------|
| `app/(tabs)/index.tsx` | Templates list (Home) | Tab |
| `app/(tabs)/history.tsx` | Session history | Tab |
| `app/(tabs)/profile.tsx` | Profile + Settings | Tab |
| `app/setup.tsx` | Lightweight setup | Stack |
| `app/template/[id].tsx` | Template editor | Stack |
| `app/session/active.tsx` | Active workout session | Stack |
| `app/session/[id].tsx` | Completed session detail | Stack |

### Modal/Overlay Surfaces

| Surface | Triggered From | Type |
|---------|---------------|------|
| Exercise picker | Template editor, Active session | Modal/BottomSheet |
| Custom exercise form | Exercise picker | Modal |
| Session completion | Active session | Inline state change |
| Warm-up set add | Active session exercise row | Inline action |

## Key Design Decisions

1. **Local-first**: All data lives on device. No network required for any core flow.
2. **Visitor-first**: No signup required. Account creation is optional and non-blocking.
3. **Owner abstraction**: One local owner per device in MVP. Stable identity for future account linking.
4. **One-screen session**: Active session is a single screen with inline exercise expansion.
5. **Direct writes for sets**: Set logging uses immediate SQLite writes, not form submission.
6. **Forms only where appropriate**: React Hook Form + Zod for setup, templates, exercises. NOT for active session.
7. **Mobile-only**: Web explicitly deferred from MVP.
8. **Read-only built-in exercises**: Built-in dataset is never user-editable.
9. **Explicit migrations**: Drizzle generates migration SQL files, applied on app launch.

## Risks & Mitigations

| Risk | Mitigation |
|------|-----------|
| Visitor data unclear before account | Stable owner identity; account linking is additive |
| Single-owner needs shared-device later | Owner abstraction in domain model, one owner exposed in MVP UX |
| Single-screen session gets crowded | Exercises collapsed by default; last-set summary prominent |
| Autosave creates stale sessions | Explicit in_progress/completed statuses |
| Exercise catalog complexity | Custom exercises lightweight; built-in read-only |
| Local-first makes sync harder later | Stable IDs, timestamps, consistent owner model from day one |

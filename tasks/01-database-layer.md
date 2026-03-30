# Phase 1: Database Layer

## Goal
Define the Drizzle schema, set up migrations, seed the exercise library.

## What you'll learn
- How Drizzle ORM maps TypeScript types to SQLite columns
- What migrations are and why they matter
- How to seed a database with a bundled dataset

## Sub-phases

### 1A: Schema Definition (Steps 1.1–1.7)
- [x] 1.1 Create `db/schema.ts` with Owner and Profile tables
- [x] 1.2 Add UserSettings table
- [x] 1.3 Add ExerciseLibraryItem table
- [x] 1.4 Add CustomExercise table
- [x] 1.5 Add WorkoutTemplate and WorkoutTemplateExercise tables
- [x] 1.6 Add WorkoutSession, WorkoutSessionExercise, SetEntry tables
- [x] 1.7 Add SessionNote table, export full schema object

### 1B: Migrations (Steps 1.8–1.9)
- [x] 1.8 Create `drizzle.config.ts` at project root
- [x] 1.9 Generate initial migration via `drizzle-kit generate`

### 1C: Connection (Steps 1.10–1.12)
- [x] 1.10 Create `lib/utils.ts` with UUID and timestamp helpers
- [x] 1.11 Create `db/client.ts` — connection, Drizzle instance, migration runner
- [x] 1.12 Configure Metro to handle `.sql` migration files

### 1D: Seed Data (Steps 1.13–1.15)
- [x] 1.13 Move exercise JSON into `db/seed/`
- [ ] 1.14 Create `db/seed/seed.ts` — idempotent exercise library seeder
- [ ] 1.15 Wire seeding into `db/client.ts`

### 1E: App Integration (Steps 1.16–1.17)
- [ ] 1.16 Call `initializeDatabase()` from root layout
- [ ] 1.17 Add temporary verification query to Home tab

### 1F: Verify & Commit (Steps 1.18–1.19)
- [ ] 1.18 Run on device and verify end-to-end
- [ ] 1.19 Commit Phase 1, update task file

## Execution Order (Dependency Graph)

```
1A (1.1→1.7) Schema definitions — any order within group
     │
     ▼
1.8  drizzle.config.ts (needs schema)
     │
     ▼
1.9  Generate migration (needs config)
     │
     ▼
1.10 UUID/timestamp helpers (independent)
     │
     ▼
1.11 db/client.ts (needs schema + migrations + helpers)
     │
     ▼
1.12 Metro config for .sql files (needs migrations)
     │
     ▼
1.13 Move exercise JSON (independent)
     │
     ▼
1.14 Seed script (needs schema + JSON)
     │
     ▼
1.15 Wire seed into client (needs seed + client.ts)
     │
     ▼
1.16 Wire into root layout (needs client.ts)
     │
     ▼
1.17 Verification query (needs everything)
     │
     ▼
1.18 Test on device
     │
     ▼
1.19 Commit
```

## Files Created or Modified

| File | Action | Purpose |
|------|--------|---------|
| `db/schema.ts` | CREATE | All 11 Drizzle table definitions |
| `drizzle.config.ts` | CREATE | Drizzle Kit CLI configuration |
| `db/migrations/*` | GENERATED | SQL migration files (auto-generated) |
| `lib/utils.ts` | CREATE | `generateId()` and `nowISO()` helpers |
| `db/client.ts` | CREATE | Database connection, Drizzle instance, migration runner |
| `metro.config.js` | MODIFY | Add `.sql` file handling for migrations |
| `db/seed/exercises.json` | MOVE | Exercise dataset (from project root) |
| `db/seed/seed.ts` | CREATE | Idempotent exercise library seeder |
| `app/_layout.tsx` | MODIFY | Call `initializeDatabase()` on mount |
| `app/(tabs)/index.tsx` | MODIFY | Temporary verification query |

## Notes

- **When generating new migrations**: After running `drizzle-kit generate`, you must manually add a new entry to `db/migrations/migrations.ts` mapping the new migration tag to its `.sql` file. Drizzle-kit generates the `.sql` but does not update the wrapper. For example, if `0001_add_column.sql` is generated, add `'0001_add_column': require('./0001_add_column.sql')` to the `m` object.

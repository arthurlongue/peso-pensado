# Data Model

## Entity Overview

```
Owner
 ├── Profile (1:1)
 ├── UserSettings (1:1)
 ├── CustomExercise (1:N)
 ├── WorkoutTemplate (1:N)
 │    └── WorkoutTemplateExercise (1:N)
 └── WorkoutSession (1:N)
      ├── WorkoutSessionExercise (1:N)
      │    └── SetEntry (1:N)
      └── SessionNote (1:1, optional)

ExerciseLibraryItem (read-only, seeded)
```

## Table Definitions

### Owner
Abstract local identity. In MVP, one per device (visitor-backed).

| Column | Type | Notes |
|--------|------|-------|
| id | text (UUID) | Primary key |
| createdAt | text (ISO) | |
| updatedAt | text (ISO) | |

### Profile
Basic personal data for the owner.

| Column | Type | Notes |
|--------|------|-------|
| id | text (UUID) | Primary key |
| ownerId | text (UUID) | FK → Owner.id |
| name | text (nullable) | |
| age | integer (nullable) | |
| sex | text (nullable) | |
| height | real (nullable) | |
| weight | real (nullable) | |
| createdAt | text (ISO) | |
| updatedAt | text (ISO) | |

### UserSettings
Minimal first-class settings for MVP.

| Column | Type | Notes |
|--------|------|-------|
| id | text (UUID) | Primary key |
| ownerId | text (UUID) | FK → Owner.id |
| weightUnit | text | 'kg' or 'lb' |
| measurementUnit | text | 'cm' or 'in' |
| createdAt | text (ISO) | |
| updatedAt | text (ISO) | |

### ExerciseLibraryItem
Built-in exercise dataset (read-only, seeded from JSON).

| Column | Type | Notes |
|--------|------|-------|
| id | text | Primary key (from dataset, e.g., '3_4_Sit-Up') |
| name | text | Exercise name (PT-BR) |
| forceType | text (nullable) | 'pull', 'push', null |
| level | text (nullable) | 'iniciante', 'intermediario', 'avancado' |
| mechanic | text (nullable) | 'composto', 'isolado', null |
| equipment | text (nullable) | 'halteres', 'barra', 'peso-do-corpo', etc. |
| primaryMuscles | text | JSON string: ["abdominais"] |
| secondaryMuscles | text | JSON string: [] |
| instructions | text | JSON string: ["Step 1...", "Step 2..."] |
| category | text | 'forca', 'cardio', 'alongamento', etc. |
| images | text | JSON string: ["path/0.jpg"] |

### CustomExercise
User-created exercise, same structure as library items.

| Column | Type | Notes |
|--------|------|-------|
| id | text (UUID) | Primary key |
| ownerId | text (UUID) | FK → Owner.id |
| name | text | Required |
| forceType | text (nullable) | |
| level | text (nullable) | |
| mechanic | text (nullable) | |
| equipment | text (nullable) | |
| primaryMuscles | text (nullable) | JSON string |
| secondaryMuscles | text (nullable) | JSON string |
| instructions | text (nullable) | JSON string |
| category | text (nullable) | |
| createdAt | text (ISO) | |
| updatedAt | text (ISO) | |

### WorkoutTemplate
Saved workout day / routine.

| Column | Type | Notes |
|--------|------|-------|
| id | text (UUID) | Primary key |
| ownerId | text (UUID) | FK → Owner.id |
| name | text | Required |
| description | text (nullable) | |
| createdAt | text (ISO) | |
| updatedAt | text (ISO) | |

### WorkoutTemplateExercise
Exercise inside a template (planning data).

| Column | Type | Notes |
|--------|------|-------|
| id | text (UUID) | Primary key |
| workoutTemplateId | text (UUID) | FK → WorkoutTemplate.id |
| orderIndex | integer | Exercise order in template |
| sourceType | text | 'library' or 'custom' |
| exerciseRefId | text | FK to ExerciseLibraryItem.id or CustomExercise.id |
| note | text (nullable) | |
| createdAt | text (ISO) | |
| updatedAt | text (ISO) | |

### WorkoutSession
One execution of a template.

| Column | Type | Notes |
|--------|------|-------|
| id | text (UUID) | Primary key |
| ownerId | text (UUID) | FK → Owner.id |
| workoutTemplateId | text (UUID) | FK → WorkoutTemplate.id |
| status | text | 'in_progress' or 'completed' |
| startedAt | text (ISO) | |
| completedAt | text (ISO, nullable) | Set when completed |
| createdAt | text (ISO) | |
| updatedAt | text (ISO) | |

### WorkoutSessionExercise
Exercise instance inside a session (execution data).

| Column | Type | Notes |
|--------|------|-------|
| id | text (UUID) | Primary key |
| workoutSessionId | text (UUID) | FK → WorkoutSession.id |
| sourceTemplateExerciseId | text (nullable) | FK → WorkoutTemplateExercise.id (null if added ad hoc) |
| orderIndex | integer | Exercise order in session |
| sourceType | text | 'library' or 'custom' |
| exerciseRefId | text | FK to ExerciseLibraryItem.id or CustomExercise.id |
| note | text (nullable) | |
| wasSkipped | integer | 0 or 1 (boolean) |
| createdAt | text (ISO) | |
| updatedAt | text (ISO) | |

### SetEntry
One logged set (warm-up or working).

| Column | Type | Notes |
|--------|------|-------|
| id | text (UUID) | Primary key |
| workoutSessionExerciseId | text (UUID) | FK → WorkoutSessionExercise.id |
| orderIndex | integer | Set order |
| setType | text | 'warmup' or 'working' |
| reps | integer | Number of repetitions |
| weight | real | Weight used (in user's preferred unit) |
| completedAt | text (ISO, nullable) | Set when set is done |
| createdAt | text (ISO) | |
| updatedAt | text (ISO) | |

### SessionNote
Optional session-level note.

| Column | Type | Notes |
|--------|------|-------|
| id | text (UUID) | Primary key |
| workoutSessionId | text (UUID) | FK → WorkoutSession.id |
| content | text | Note content |
| createdAt | text (ISO) | |
| updatedAt | text (ISO) | |

## Exercise Dataset Mapping

The file `exercises-ptbr-full-translation.json` contains 873 exercises in Brazilian Portuguese. Here's how each JSON field maps to the `ExerciseLibraryItem` table:

| JSON Field | Table Column | Transformation |
|-----------|-------------|----------------|
| `id` | `id` | Direct — use as primary key |
| `name` | `name` | Direct |
| `force` | `forceType` | Direct (e.g., 'pull', 'push') |
| `level` | `level` | Direct (e.g., 'iniciante') |
| `mechanic` | `mechanic` | Direct (e.g., 'composto', 'isolado', null) |
| `equipment` | `equipment` | Direct (e.g., 'halteres', 'peso-do-corpo') |
| `primaryMuscles` | `primaryMuscles` | JSON.stringify — stored as text |
| `secondaryMuscles` | `secondaryMuscles` | JSON.stringify — stored as text |
| `instructions` | `instructions` | JSON.stringify — stored as text |
| `category` | `category` | Direct (e.g., 'forca', 'cardio') |
| `images` | `images` | JSON.stringify — stored as text (paths only) |

### Dataset Stats

- **Total exercises**: 873
- **Categories** (7): alongamento, cardio, forca, levantamento-olimpico, pliometria, powerlifting, strongman
- **Equipment types** (13): barra, barra-w, bola-de-exercicio, bola-medicinal, cabo, faixas, halteres, kettlebell, maquina, outros, peso-do-corpo, rolo-de-espuma, (empty/null)
- **Primary muscles** (17): abdominais, abdutores, adutores, antebracos, biceps, dorsais, gluteos, inferior-das-costas, isquiotibiais, meio-das-costas, ombros, panturrilhas, peito, pescoco, quadriceps, trapezio, triceps

### Array Field Strategy

SQLite doesn't have native array types. The approach:
- `primaryMuscles`, `secondaryMuscles`, `instructions`, `images` → stored as **JSON strings**
- Parsed on read with `JSON.parse()`
- For search/filter: use `LIKE` on the JSON string (sufficient for MVP with 873 items)

### Seed Strategy

- Bundle `exercises.json` with the app
- On first launch, insert all 873 records into `exerciseLibraryItems`
- Use idempotent insert (check if already seeded, or use `INSERT OR IGNORE`)
- Runs once, never again unless app is reinstalled

## Key Constraints

1. **Sets belong only to session exercises** — never to template exercises
2. **Session changes never mutate templates** — the snapshot is independent
3. **Built-in exercises are read-only** — users cannot edit `ExerciseLibraryItem` records
4. **Custom exercises are owner-owned** — only the creating user sees them
5. **One owner per device in MVP** — no multi-user support
6. **Previous performance**: last completed session, same user, same template, same exercise
7. **Source reference pattern**: `sourceType` determines which table `exerciseRefId` points to

## Source Reference Pattern

```typescript
type SourceType = 'library' | 'custom';

// When sourceType = 'library', exerciseRefId → ExerciseLibraryItem.id
// When sourceType = 'custom', exerciseRefId → CustomExercise.id
```

This pattern is used in both `WorkoutTemplateExercise` and `WorkoutSessionExercise` to reference exercises without duplicating the full exercise payload.

## Not Modeled (Deferred)

- Progression analytics tables
- Recommendation engine data
- PR tracking abstractions
- Rest timer history
- Achievements / gamification
- Social / coach data
- Account/sync metadata

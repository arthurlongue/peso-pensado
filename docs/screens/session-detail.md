# Screen: Session Detail

**Route**: `app/session/[id].tsx`
**Purpose**: Inspect a completed workout session (read-only)

---

## Wireframe

```
┌─────────────────────────────────┐
│  ← Voltar                      │
├─────────────────────────────────┤
│                                 │
│  Treino A - Peito/Tríceps      │
│  27 Mar 2026 · 47 min          │
│                                 │
│  ─────────────────────────────  │
│                                 │
│  1. Supino reto                 │
│  ┌─────────────────────────┐    │
│  │ Aquecimento              │    │
│  │  S1: 15 reps @ 40kg     │    │
│  │                          │    │
│  │ Trabalho                 │    │
│  │  S1: 10 reps @ 80kg     │    │
│  │  S2: 10 reps @ 80kg     │    │
│  │  S3: 10 reps @ 80kg     │    │
│  │  S4:  8 reps @ 80kg     │    │
│  │                          │    │
│  │ Nota: Reduzi no último   │    │
│  └─────────────────────────┘    │
│                                 │
│  2. Supino inclinado            │
│  ┌─────────────────────────┐    │
│  │ Trabalho                 │    │
│  │  S1: 12 reps @ 28kg     │    │
│  │  S2: 12 reps @ 28kg     │    │
│  │  S3: 10 reps @ 28kg     │    │
│  └─────────────────────────┘    │
│                                 │
│  3. Tríceps corda               │
│  ┌─────────────────────────┐    │
│  │ Trabalho                 │    │
│  │  S1: 15 reps @ 25kg     │    │
│  │  S2: 15 reps @ 25kg     │    │
│  │  S3: 12 reps @ 25kg     │    │
│  └─────────────────────────┘    │
│                                 │
│  ...                            │
│                                 │
└─────────────────────────────────┘
```

## Component Breakdown

| Element | RNE UI Component | Notes |
|---------|-----------------|-------|
| Back button | `Header` leftComponent | Navigate to history |
| Session title | `Text h4` | Template name |
| Session meta | `Text subtitle` | Date + duration |
| Exercise header | `ListItem title` | Order index + exercise name |
| Set section | `Text` + set rows | Grouped by warm-up/working |
| Set row | `Text` | "S1: 10 reps @ 80kg" |
| Exercise note | `Text` italic, muted | Shown if present |
| Exercise list | `FlatList` or `ScrollView` | All exercises, all expanded |

## State

- **Read-only**: no editing functionality
- On mount: load full session with all exercises and sets
- Everything expanded — no collapse/expand needed for a completed session

## Key Interactions

| Action | Behavior |
|--------|----------|
| Tap "Voltar" | Navigate back to history |
| Scroll | View full session data |

## Data Queries

```typescript
// Load session with exercises and sets
const session = await db.query.workoutSessions.findFirst({
  where: eq(workoutSessions.id, sessionId),
  with: {
    workoutSessionExercises: {
      orderBy: [asc(workoutSessionExercises.orderIndex)],
      with: {
        setEntries: {
          orderBy: [asc(setEntries.orderIndex)],
        },
      },
    },
  },
});

// For each exercise, resolve the exercise name
// by looking up exerciseRefId in ExerciseLibraryItem or CustomExercise
```

## Design Notes

- Everything is visible at once — no need to expand/collapse
- Warm-up sets visually distinguished (lighter background or muted text)
- Skipped exercises shown with strikethrough or "(pulou)" label
- This is a simple review screen, not an interactive surface

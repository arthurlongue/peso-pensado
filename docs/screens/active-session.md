# Screen: Active Session

**Route**: `app/session/active.tsx`
**Purpose**: THE core screen — fast set logging during live workouts

This is the most important screen in the app. Every design choice optimizes for speed and minimal friction during real gym sessions.

---

## Wireframe — All Exercises Collapsed

```
┌─────────────────────────────────┐
│  ←    Treino A         [✓]     │
│       12:34                     │
├─────────────────────────────────┤
│                                 │
│  ┌─────────────────────────┐    │
│  │ 1  Supino reto          ▼   │
│    Última: 4x10 @ 80kg         │
│  └─────────────────────────┘    │
│                                 │
│  ┌─────────────────────────┐    │
│  │ 2  Supino inclinado     ▼   │
│    Última: 3x12 @ 28kg         │
│  └─────────────────────────┘    │
│                                 │
│  ┌─────────────────────────┐    │
│  │ 3  Tríceps corda        ▼   │
│    Última: 3x15 @ 25kg         │
│  └─────────────────────────┘    │
│                                 │
│  ┌─────────────────────────┐    │
│  │ 4  Desenvolvimento      ▼   │
│    Última: —                   │
│  └─────────────────────────┘    │
│                                 │
│  ┌─────────────────────────┐    │
│  │ + Adicionar exercício   │    │
│  └─────────────────────────┘    │
│                                 │
│   ┌─────────────────────────┐   │
│   │     Finalizar treino    │   │
│   └─────────────────────────┘   │
│                                 │
└─────────────────────────────────┘
```

## Wireframe — Exercise Expanded

```
┌─────────────────────────────────┐
│  ←    Treino A         [✓]     │
│       12:34                     │
├─────────────────────────────────┤
│                                 │
│  ┌─────────────────────────┐    │
│  │ 1  Supino reto          ▲   │
│  └─────────────────────────┘    │
│  │                              │
│  │  ─── Anterior ───            │
│  │  3x12 @ 75kg  (último treino)│
│  │                              │
│  │  ─── Aquecimento ───         │
│  │  ┌──────┬──────┬────────┐    │
│  │  │ Set  │ Reps │ Peso   │    │
│  │  ├──────┼──────┼────────┤    │
│  │  │  1   │  15  │ 40kg   │ ✓ │
│  │  └──────┴──────┴────────┘    │
│  │                              │
│  │  ─── Trabalho ───            │
│  │  ┌──────┬──────┬────────┐    │
│  │  │ Set  │ Reps │ Peso   │    │
│  │  ├──────┼──────┼────────┤    │
│  │  │  1   │  10  │ 80kg   │ ✓ │
│  │  │  2   │  10  │ 80kg   │ ✓ │
│  │  │  3   │  8   │ 80kg   │ ✓ │
│  │  │  4   │ [  ] │ [   ]  │   │
│  │  └──────┴──────┴────────┘    │
│  │                              │
│  │  [+ Aquecimento] [+ Série]  │
│  │                              │
│  │  Notas: ┌────────────────┐   │
│  │         │                │   │
│  │         └────────────────┘   │
│  │                              │
│  │  [⬇ Mover para baixo]       │
│  │                              │
│  ┌─────────────────────────┐    │
│  │ 2  Supino inclinado     ▼   │
│    Última: 3x12 @ 28kg         │
│  └─────────────────────────┘    │
│                                 │
│  ...                            │
│                                 │
└─────────────────────────────────┘
```

## Component Breakdown

### Header
| Element | RNE UI Component | Notes |
|---------|-----------------|-------|
| Back button | `Header` leftComponent | With "leave session?" confirmation |
| Session title | `Header` centerComponent | Template name |
| Timer | `Text` below title | Elapsed time since session start |
| Complete button | `Header` rightComponent | Checkmark icon, marks session completed |

### Collapsed Exercise Row
| Element | RNE UI Component | Notes |
|---------|-----------------|-------|
| Order index | `Text badge` | Numbered (1, 2, 3...) |
| Exercise name | `ListItem title` | Bold |
| Last set summary | `ListItem subtitle` | "Última: 4x10 @ 80kg" or "—" if no previous |
| Expand chevron | `Icon name="chevron-down"` | Taps to expand |

### Expanded Exercise Row
| Element | RNE UI Component | Notes |
|---------|-----------------|-------|
| Previous performance | `Text` section | Muted, "Anterior" header |
| Warm-up section | `Text` header + set rows | Different background color |
| Working sets section | `Text` header + set rows | Main section |
| Set row | Custom component | Set number, reps input, weight input, done check |
| Active set row | Inputs highlighted | Next set to fill, auto-focused |
| Add warm-up button | `Button type="clear" size="sm"` | "+ Aquecimento" |
| Add working set button | `Button type="clear" size="sm"` | "+ Série" |
| Notes input | `Input multiline` | Optional exercise notes |
| Move down button | `Button type="clear" size="sm"` | "⬇ Mover para baixo" |
| Collapse chevron | `Icon name="chevron-up"` | Taps to collapse |

### Set Input Component
| Element | RNE UI Component | Notes |
|---------|-----------------|-------|
| Set number | `Text` | Auto-incremented |
| Reps input | `Input keyboardType="numeric"` | Small, focused |
| Weight input | `Input keyboardType="numeric"` | Small, with unit suffix |
| Done indicator | `Icon name="check-circle"` | Filled when set is logged |

### Footer
| Element | RNE UI Component | Notes |
|---------|-----------------|-------|
| Add exercise button | `Button type="outline"` | Opens simplified Exercise Picker |
| Complete session button | `Button` primary, full-width | "Finalizar treino" |

## State Management

**This screen does NOT use React Hook Form.** It uses lightweight screen state + direct DB writes.

```typescript
// State shape (useReducer)
type SessionState = {
  session: WorkoutSession;
  exercises: WorkoutSessionExercise[];
  setsByExercise: Record<string, SetEntry[]>;  // exerciseId → sets
  expandedExerciseId: string | null;
  previousPerformance: Record<string, PreviousSetSummary>;  // exerciseId → summary
};
```

### Why not a form?
- Sets are logged one at a time, not submitted as a batch
- Each set writes to SQLite immediately (autosave by design)
- Form state would add unnecessary overhead for what is essentially a rapid data-entry surface
- The user might log 20-30 sets in a session — form re-renders would be wasteful

## Key Interactions

| Action | Behavior |
|--------|----------|
| Tap collapsed exercise row | Expand inline, show previous performance + current sets + active set input |
| Tap expanded exercise header | Collapse back to summary |
| Fill reps + weight + tap done | Write SetEntry to DB immediately, show checkmark, advance to next set |
| Tap "+ Aquecimento" | Add one warm-up SetEntry (empty, ready for input) |
| Tap "+ Série" | Add one working SetEntry (empty, ready for input) |
| Tap "⬇ Mover para baixo" | Swap this exercise with the one below (update orderIndex in DB) |
| Tap "+ Adicionar exercício" | Open simplified Exercise Picker modal |
| Tap "Finalizar treino" | Confirm, set status to 'completed', set completedAt, navigate to Home |
| Tap header ← | "Sair do treino? O progresso está salvo." → navigate back |
| App goes to background | No action needed — sets already saved to DB |
| Reopen app with active session | Detect in_progress session, load state, show this screen |

## Previous Performance Display

For each expanded exercise, query:
- Most recent completed WorkoutSession
- Same owner, same template, same exercise
- Show as: "3x12 @ 75kg" (sets × reps @ weight)

If no previous performance: show "—" or "Primeira vez"

## Data Flow

```
[Start Session]
    │
    ├── Create WorkoutSession (status: in_progress)
    ├── Snapshot each WorkoutTemplateExercise → WorkoutSessionExercise
    │
[Log Set]
    │
    ├── User fills reps + weight
    ├── Insert SetEntry into SQLite (immediate)
    ├── Update UI state (useReducer dispatch)
    │
[Complete Session]
    │
    ├── Update WorkoutSession.status → 'completed'
    ├── Set completedAt timestamp
    ├── Navigate to Home
```

## Performance Notes

- **FlatList** for exercise list (virtualized, handles long sessions)
- **Direct DB writes** for each set (no batch submit)
- **Collapsed by default** — only one exercise expanded at a time
- **Minimal re-renders** — only the affected exercise row updates when a set is logged
- The set input should auto-focus and auto-advance after logging

## Warm-up vs Working Set Visual Distinction

- Warm-up rows have a **lighter/muted background**
- Section headers clearly separate warm-up and working
- Warm-up sets appear above working sets
- Default: no warm-up sets. User adds them explicitly.

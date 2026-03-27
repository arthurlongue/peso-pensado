# Screen: Home (Templates List)

**Route**: `app/(tabs)/index.tsx`
**Purpose**: Show saved workout templates and let user start or edit them

---

## Wireframe

```
┌─────────────────────────────────┐
│  Meus Treinos              [+]  │
├─────────────────────────────────┤
│                                 │
│  ┌─────────────────────────┐    │
│  │ Treino A - Peito/Tríceps│    │
│  │ 6 exercícios            │    │
│  │                 [▶] [✎] │    │
│  └─────────────────────────┘    │
│                                 │
│  ┌─────────────────────────┐    │
│  │ Treino B - Costas/Bíceps│    │
│  │ 5 exercícios            │    │
│  │                 [▶] [✎] │    │
│  └─────────────────────────┘    │
│                                 │
│  ┌─────────────────────────┐    │
│  │ Dia de Pernas           │    │
│  │ 7 exercícios            │    │
│  │                 [▶] [✎] │    │
│  └─────────────────────────┘    │
│                                 │
│                                 │
│                                 │
├─────────────────────────────────┤
│  🏠        📋        👤         │
│  Home    Histórico   Perfil     │
└─────────────────────────────────┘
```

### Empty State

```
┌─────────────────────────────────┐
│  Meus Treinos              [+]  │
├─────────────────────────────────┤
│                                 │
│                                 │
│                                 │
│       Nenhum treino criado      │
│                                 │
│   Toque + para criar seu primeiro│
│   treino                        │
│                                 │
│                                 │
│                                 │
│                                 │
│                                 │
├─────────────────────────────────┤
│  🏠        📋        👤         │
│  Home    Histórico   Perfil     │
└─────────────────────────────────┘
```

## Component Breakdown

| Element | RNE UI Component | Notes |
|---------|-----------------|-------|
| Header | `Header` component | "Meus Treinos" + create button |
| Create button | `Icon name="add"` in header | Top-right |
| Template card | `ListItem` or `Card` | Name, exercise count, actions |
| Start button | `Icon name="play-arrow"` | Per template |
| Edit button | `Icon name="edit"` | Per template |
| Template list | `FlatList` | Renders template cards |
| Empty state | `Text` + `Text` | Centered, muted |
| Tab bar | Expo Router tabs | Home, Histórico, Perfil |

## State

- On mount: query all `WorkoutTemplate` for current owner
- Each template card shows: name, exercise count (count of WorkoutTemplateExercise)
- If active session exists (in_progress): show indicator on the associated template card

## Key Interactions

| Action | Behavior |
|--------|----------|
| Tap "+" in header | Navigate to `template/[new]` (create mode) |
| Tap ▶ on template | Create session snapshot, navigate to `session/active` |
| Tap ✎ on template | Navigate to `template/[id]` (edit mode) |
| Pull to refresh | Re-query templates |
| Tap empty state | Same as "+" button |

## Data Queries

```typescript
// Get all templates with exercise count
const templates = await db
  .select({
    id: workoutTemplates.id,
    name: workoutTemplates.name,
    description: workoutTemplates.description,
    exerciseCount: sql`count(${workoutTemplateExercises.id})`,
  })
  .from(workoutTemplates)
  .leftJoin(workoutTemplateExercises, eq(workoutTemplates.id, workoutTemplateExercises.workoutTemplateId))
  .where(eq(workoutTemplates.ownerId, currentOwnerId))
  .groupBy(workoutTemplates.id)
  .orderBy(desc(workoutTemplates.updatedAt));
```

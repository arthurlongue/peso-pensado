# Screen: Exercise Picker

**Route**: Modal/BottomSheet (not a standalone route)
**Purpose**: Search and select exercises from built-in library and custom exercises

---

## Wireframe

```
┌─────────────────────────────────┐
│  ┌─────────────────────────────┐│
│  │ 🔍 Buscar exercício...     ││
│  └─────────────────────────────┘│
│                                 │
│  [Todos] [Peito] [Costas] [+]  │
│                                 │
│  ─── Biblioteca ───             │
│                                 │
│  ┌─────────────────────────┐    │
│  │ Supino reto             │    │
│  │ Peito · Barra · Força    │ ✓ │
│  └─────────────────────────┘    │
│                                 │
│  ┌─────────────────────────┐    │
│  │ Supino inclinado        │    │
│  │ Peito · Halteres · Força │   │
│  └─────────────────────────┘    │
│                                 │
│  ┌─────────────────────────┐    │
│  │ Crucifixo               │    │
│  │ Peito · Halteres · Força │   │
│  └─────────────────────────┘    │
│                                 │
│  ─── Meus exercícios ───        │
│                                 │
│  ┌─────────────────────────┐    │
│  │ Meu exercício custom    │    │
│  │ Personalizado            │   │
│  └─────────────────────────┘    │
│                                 │
│   ┌─────────────────────────┐   │
│   │ + Criar exercício custom│   │
│   └─────────────────────────┘   │
│                                 │
│          [Cancelar]             │
└─────────────────────────────────┘
```

## Component Breakdown

| Element | RNE UI Component | Notes |
|---------|-----------------|-------|
| Search input | `Input` with search icon | Filters by name |
| Muscle filter chips | `ButtonGroup` or horizontal `ScrollView` with chips | Quick filter |
| Library section header | `Text subtitle` | "Biblioteca" |
| Library exercise row | `ListItem` | Name, muscles, equipment, checkmark if selected |
| Custom section header | `Text subtitle` | "Meus exercícios" |
| Custom exercise row | `ListItem` | Name, "Personalizado" label |
| Create custom button | `Button type="outline"` | Opens Custom Exercise form |
| Cancel button | `Button type="clear"` | Close modal |

## Presentation

- **RNE BottomSheet** or full-screen modal
- Search input stays fixed at top on scroll
- Sections for library and custom exercises
- Selected exercise gets a checkmark

## State

- Search query filters both library and custom exercises by name
- Muscle filter chips narrow library results by primaryMuscles
- On select: callback with the selected exercise (sourceType + exerciseRefId)
- Multi-select is NOT needed for MVP (add one at a time)

## Key Interactions

| Action | Behavior |
|--------|----------|
| Type in search | Filter both library and custom exercises by name (case-insensitive) |
| Tap muscle chip | Filter library exercises by primaryMuscles match |
| Tap exercise row | Select exercise, call onExerciseSelect callback, close modal |
| Tap "Criar exercício custom" | Open Custom Exercise form modal |
| Tap "Cancelar" / swipe down | Close modal without selection |
| Tap "Todos" chip | Clear muscle filter |

## Data Queries

```typescript
// Search library exercises
const libraryResults = await db
  .select()
  .from(exerciseLibraryItems)
  .where(like(exerciseLibraryItems.name, `%${searchQuery}%`))
  .limit(50);

// Search custom exercises
const customResults = await db
  .select()
  .from(customExercises)
  .where(and(
    eq(customExercises.ownerId, currentOwnerId),
    like(customExercises.name, `%${searchQuery}%`)
  ))
  .limit(20);
```

# Screen: Template Editor

**Route**: `app/template/[id].tsx`
**Purpose**: Create and edit workout templates with ordered exercises

---

## Wireframe (Edit mode)

```
┌─────────────────────────────────┐
│  ← Voltar          Salvar       │
├─────────────────────────────────┤
│                                 │
│  Nome do treino                 │
│  ┌─────────────────────────┐    │
│  │ Treino A - Peito/Tríceps│    │
│  └─────────────────────────┘    │
│                                 │
│  Descrição (opcional)           │
│  ┌─────────────────────────┐    │
│  │                         │    │
│  └─────────────────────────┘    │
│                                 │
│  ─── Exercícios ───             │
│                                 │
│  ┌─────────────────────────┐    │
│  │ 1. Supino reto          │    │
│  │    Peito · Halteres      │    │
│  │                    [≡]  │    │
│  └─────────────────────────┘    │
│                                 │
│  ┌─────────────────────────┐    │
│  │ 2. Supino inclinado     │    │
│  │    Peito · Halteres      │    │
│  │                    [≡]  │    │
│  └─────────────────────────┘    │
│                                 │
│  ┌─────────────────────────┐    │
│  │ 3. Tríceps corda        │    │
│  │    Tríceps · Cabo        │    │
│  │                    [≡]  │    │
│  └─────────────────────────┘    │
│                                 │
│  ┌─────────────────────────┐    │
│  │    + Adicionar exercício│    │
│  └─────────────────────────┘    │
│                                 │
│                                 │
└─────────────────────────────────┘
```

## Component Breakdown

| Element | RNE UI Component | Notes |
|---------|-----------------|-------|
| Back button | `Header` leftComponent | Navigate back |
| Save button | `Header` rightComponent | Disabled until name is filled |
| Template name | `Input label="Nome do treino"` | Required |
| Template description | `Input label="Descrição"` | Optional, multiline |
| Exercise list | `FlatList` | Ordered, draggable in future |
| Exercise row | `ListItem` | Number, name, muscles, equipment, drag handle |
| Add exercise button | `Button type="outline"` | Opens Exercise Picker modal |
| Drag handle | `Icon name="drag-handle"` | Visual only in MVP (move-down action) |

## State

- Managed by React Hook Form + Zod for name/description fields
- Exercise list managed separately (array in local state)
- On mount (edit mode): load template + exercises from DB
- On mount (create mode): empty form, no exercises

## Zod Schema

```typescript
const templateSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  description: z.string().optional(),
});
```

## Key Interactions

| Action | Behavior |
|--------|----------|
| Tap "Salvar" | Validate name, upsert template, re-save exercise order, navigate back |
| Tap "Adicionar exercício" | Open Exercise Picker modal |
| Tap exercise row | Open Exercise Picker to replace (future, not MVP) |
| Tap drag handle / reorder | "Move down 1" action (MVP), or future drag-to-reorder |
| Swipe exercise row left | Reveal delete action |
| Tap "Voltar" | Prompt if unsaved changes, then navigate back |

## Exercise Order Management

In MVP:
- Exercises display with order index (1, 2, 3...)
- Each row has a "move down 1" action (tapping the drag handle)
- Removing an exercise re-indexes the remaining ones

Future:
- Full drag-to-reorder

## Data Operations

```typescript
// Save template
async function saveTemplate(name: string, description: string, exercises: Exercise[]) {
  // 1. Upsert WorkoutTemplate
  // 2. Delete old WorkoutTemplateExercises
  // 3. Insert new WorkoutTemplateExercises with correct orderIndex
}
```

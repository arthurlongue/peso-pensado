# Screen: Custom Exercise Editor

**Route**: Modal (opened from Exercise Picker)
**Purpose**: Create a user-owned exercise when the built-in library doesn't have it

---

## Wireframe

```
┌─────────────────────────────────┐
│  ← Cancelar         Salvar      │
├─────────────────────────────────┤
│                                 │
│  Nome do exercício *            │
│  ┌─────────────────────────┐    │
│  │                         │    │
│  └─────────────────────────┘    │
│                                 │
│  Grupo muscular principal       │
│  ┌─────────────────────────┐    │
│  │ Selecione...          ▼ │    │
│  └─────────────────────────┘    │
│                                 │
│  Grupo muscular secundário      │
│  ┌─────────────────────────┐    │
│  │ Selecione...          ▼ │    │
│  └─────────────────────────┘    │
│                                 │
│  Equipamento                    │
│  ┌─────────────────────────┐    │
│  │ Selecione...          ▼ │    │
│  └─────────────────────────┘    │
│                                 │
│  Categoria                      │
│  ┌─────────────────────────┐    │
│  │ Selecione...          ▼ │    │
│  └─────────────────────────┘    │
│                                 │
│  Tipo de força                  │
│  [Puxar]  [Empurrar]            │
│                                 │
│  Nível                          │
│  [Iniciante] [Intermediário]    │
│  [Avançado]                     │
│                                 │
│  Mecânica                       │
│  [Composto]  [Isolado]          │
│                                 │
│  Instruções (opcional)          │
│  ┌─────────────────────────┐    │
│  │                         │    │
│  │                         │    │
│  └─────────────────────────┘    │
│                                 │
└─────────────────────────────────┘
```

## Component Breakdown

| Element | RNE UI Component | Notes |
|---------|-----------------|-------|
| Name input | `Input label="Nome do exercício"` | Required, only mandatory field |
| Muscle group selectors | Dropdown/Picker from muscle list | Uses same 17 muscle groups as library |
| Equipment selector | Dropdown/Picker from equipment list | Uses same 13 types as library |
| Category selector | Dropdown/Picker | Uses same 7 categories as library |
| Force type | `ButtonGroup` | ["Puxar", "Empurrar"] |
| Level | `ButtonGroup` | ["Iniciante", "Intermediário", "Avançado"] |
| Mechanic | `ButtonGroup` | ["Composto", "Isolado"] |
| Instructions | `Input multiline` | Optional, free text (not array like library) |
| Save button | Header rightComponent | Disabled until name is filled |

## State

- Managed by React Hook Form + Zod
- Only name is required
- All other fields are optional
- On save: insert into `customExercises` table, return new exercise to picker

## Zod Schema

```typescript
const customExerciseSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  primaryMuscles: z.array(z.string()).optional().default([]),
  secondaryMuscles: z.array(z.string()).optional().default([]),
  equipment: z.string().optional(),
  category: z.string().optional(),
  forceType: z.enum(['pull', 'push']).optional(),
  level: z.enum(['iniciante', 'intermediario', 'avancado']).optional(),
  mechanic: z.enum(['composto', 'isolado']).optional(),
  instructions: z.string().optional(),
});
```

## Key Interactions

| Action | Behavior |
|--------|----------|
| Tap "Salvar" | Validate, save to DB, close modal, return exercise to picker |
| Tap "Cancelar" | Close modal, discard changes |
| Fill name only + save | Valid — creates minimal custom exercise |

## Design Notes

- **Keep it lightweight**: This is a quick creation flow, not a detailed exercise database entry
- The user is probably between sets when they need a custom exercise — speed matters
- Only name is required. Everything else is optional enrichment.
- Instructions for custom exercises are a single text field (not step-by-step array like library items)

# Screen: Setup

**Route**: `app/setup.tsx`
**Purpose**: Collect optional profile data and unit preferences on first use

---

## Wireframe

```
┌─────────────────────────────────┐
│  ← Pular                       │
├─────────────────────────────────┤
│                                 │
│       Configure seu perfil      │
│                                 │
│  Nome                           │
│  ┌─────────────────────────┐    │
│  │  Seu nome               │    │
│  └─────────────────────────┘    │
│                                 │
│  Idade                          │
│  ┌─────────────────────────┐    │
│  │                         │    │
│  └─────────────────────────┘    │
│                                 │
│  Sexo                           │
│  ┌─────────────────────────┐    │
│  │  Selecione...         ▼ │    │
│  └─────────────────────────┘    │
│                                 │
│  Altura                         │
│  ┌─────────────────────────┐    │
│  │                         │    │
│  └─────────────────────────┘    │
│                                 │
│  Peso                           │
│  ┌─────────────────────────┐    │
│  │                         │    │
│  └─────────────────────────┘    │
│                                 │
│  ─── Preferências ───           │
│                                 │
│  Unidade de peso                │
│  [kg]  [lb]                     │
│                                 │
│  Unidade de medida              │
│  [cm]  [in]                     │
│                                 │
│   ┌─────────────────────────┐   │
│   │      Começar            │   │
│   └─────────────────────────┘   │
│                                 │
└─────────────────────────────────┘
```

## Component Breakdown

| Element | RNE UI Component | Notes |
|---------|-----------------|-------|
| Skip button | Header `Button type="clear"` | Top-right, always visible |
| Title | `Text h3` | "Configure seu perfil" |
| Name input | `Input label="Nome"` | Optional |
| Age input | `Input label="Idade" keyboardType="numeric"` | Optional |
| Sex selector | `ButtonGroup` or dropdown | Optional |
| Height input | `Input label="Altura" keyboardType="numeric"` | Optional, with unit suffix |
| Weight input | `Input label="Peso" keyboardType="numeric"` | Optional, with unit suffix |
| Weight unit toggle | `ButtonGroup` | ["kg", "lb"], default "kg" |
| Measurement unit toggle | `ButtonGroup` | ["cm", "in"], default "cm" |
| Submit button | `Button title="Começar"` | Primary, solid |

## State

- Form managed by React Hook Form + Zod
- All profile fields optional (name, age, sex, height, weight)
- Unit fields have defaults (kg, cm)
- On submit: save to `profiles` and `userSettings` tables, redirect to Home

## Zod Schema

```typescript
const setupSchema = z.object({
  name: z.string().optional(),
  age: z.number().min(10).max(120).optional(),
  sex: z.enum(['masculino', 'feminino', 'outro']).optional(),
  height: z.number().positive().optional(),
  weight: z.number().positive().optional(),
  weightUnit: z.enum(['kg', 'lb']).default('kg'),
  measurementUnit: z.enum(['cm', 'in']).default('cm'),
});
```

## Key Interactions

| Action | Behavior |
|--------|----------|
| Tap "Pular" | Save empty profile with default units, go to Home |
| Fill fields + tap "Começar" | Validate, save to DB, go to Home |
| Toggle weight unit | Updates suffix on weight input |
| Toggle measurement unit | Updates suffix on height input |

**Note**: This screen only appears on first launch. After that, profile/settings are managed from the Profile tab.

# Screen: Profile & Settings

**Route**: `app/(tabs)/profile.tsx`
**Purpose**: Minimal combined area for profile data and unit preferences

---

## Wireframe

```
┌─────────────────────────────────┐
│  Perfil                         │
├─────────────────────────────────┤
│                                 │
│  ┌─────────────────────────┐    │
│  │                         │    │
│  │      [Avatar icon]      │    │
│  │      Artur              │    │
│  │                         │    │
│  └─────────────────────────┘    │
│                                 │
│  ─── Dados pessoais ───         │
│                                 │
│  Nome                           │
│  ┌─────────────────────────┐    │
│  │ Artur                   │    │
│  └─────────────────────────┘    │
│                                 │
│  Idade                          │
│  ┌─────────────────────────┐    │
│  │ 28                      │    │
│  └─────────────────────────┘    │
│                                 │
│  Sexo                           │
│  ┌─────────────────────────┐    │
│  │ Masculino             ▼ │    │
│  └─────────────────────────┘    │
│                                 │
│  Altura                         │
│  ┌─────────────────────────┐    │
│  │ 175                     │    │
│  └─────────────────────────┘    │
│                                 │
│  Peso                           │
│  ┌─────────────────────────┐    │
│  │ 78                      │    │
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
│   │      Salvar             │   │
│   └─────────────────────────┘   │
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
| Header | `Text h3` or `Header` | "Perfil" |
| Avatar area | `Avatar` with icon placeholder | Initials or default icon |
| Name input | `Input label="Nome"` | |
| Age input | `Input label="Idade" keyboardType="numeric"` | |
| Sex selector | Dropdown or `ButtonGroup` | |
| Height input | `Input label="Altura" keyboardType="numeric"` | With unit suffix |
| Weight input | `Input label="Peso" keyboardType="numeric"` | With unit suffix |
| Weight unit toggle | `ButtonGroup` | ["kg", "lb"] |
| Measurement unit toggle | `ButtonGroup` | ["cm", "in"] |
| Save button | `Button title="Salvar"` | Primary |
| Tab bar | Expo Router tabs | Home, Histórico, Perfil |

## State

- Managed by React Hook Form + Zod (same schema as Setup screen)
- On mount: load existing profile + settings from DB
- All fields pre-filled with current values
- Save updates both `profiles` and `userSettings` tables

## Key Interactions

| Action | Behavior |
|--------|----------|
| Edit any field | Standard input interaction |
| Tap "Salvar" | Validate, update DB, show brief confirmation |
| Toggle weight unit | Updates suffix on weight input |
| Toggle measurement unit | Updates suffix on height input |

## Design Notes

- **Low priority screen** — users rarely visit during actual workouts
- Same form structure as Setup, but pre-filled
- No photo upload in MVP (avatar is icon placeholder with initials)
- No account management section in MVP (visitor-first)
- Keep it simple — this is not a social profile
- The save action can be explicit (button) or debounced auto-save (decide during implementation)

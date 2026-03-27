# Screen: Session Completion

**Route**: Inline state change within `app/session/active.tsx` (not a separate route)
**Purpose**: Confirm session completion without becoming a heavyweight separate flow

---

## Wireframe — Completion State

```
┌─────────────────────────────────┐
│                                 │
│                                 │
│                                 │
│              ✓                  │
│                                 │
│        Treino finalizado!       │
│                                 │
│    ┌─────────────────────┐      │
│    │  Duração: 47 min    │      │
│    │  Exercícios: 6      │      │
│    │  Séries: 24         │      │
│    └─────────────────────┘      │
│                                 │
│                                 │
│   ┌─────────────────────────┐   │
│   │   Voltar para Home      │   │
│   └─────────────────────────┘   │
│                                 │
│   ┌─────────────────────────┐   │
│   │   Ver no Histórico      │   │
│   └─────────────────────────┘   │
│                                 │
│                                 │
└─────────────────────────────────┘
```

## Component Breakdown

| Element | RNE UI Component | Notes |
|---------|-----------------|-------|
| Check icon | `Icon name="check-circle" size={64}` | Green, centered |
| Title | `Text h3` | "Treino finalizado!" |
| Stats card | `Card` or styled `View` | Duration, exercise count, set count |
| Home button | `Button title="Voltar para Home"` | Primary, navigate to tabs |
| History button | `Button title="Ver no Histórico"` | Outline, navigate to history tab |

## State

- Shown after user taps "Finalizar treino" on the active session screen
- Session is already marked as completed in DB before this view appears
- Stats are computed from the session data:
  - Duration: `completedAt - startedAt`
  - Exercise count: count of WorkoutSessionExercises
  - Set count: count of SetEntries

## Key Interactions

| Action | Behavior |
|--------|----------|
| Tap "Voltar para Home" | Navigate to Home tab (templates list) |
| Tap "Ver no Histórico" | Navigate to History tab |

## Design Notes

- This is intentionally lightweight — not a separate screen with its own route
- It replaces the active session content on completion
- No animation complexity for MVP
- No sharing, no social, no achievements — just confirmation + navigation

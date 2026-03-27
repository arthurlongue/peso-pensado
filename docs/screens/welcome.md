# Screen: Welcome

**Route**: First launch (before any route is established)
**Purpose**: Let user start immediately without mandatory signup

---

## Wireframe

```
┌─────────────────────────────────┐
│                                 │
│                                 │
│                                 │
│         [App Logo/Icon]         │
│                                 │
│          Peso Pensado           │
│       Seu diário de treino      │
│                                 │
│                                 │
│   ┌─────────────────────────┐   │
│   │   Continuar como visitante   │
│   └─────────────────────────┘   │
│                                 │
│   ┌─────────────────────────┐   │
│   │      Criar conta         │   │
│   └─────────────────────────┘   │
│                                 │
│   ┌─────────────────────────┐   │
│   │       Entrar             │   │
│   └─────────────────────────┘   │
│                                 │
│                                 │
└─────────────────────────────────┘
```

## Component Breakdown

| Element | RNE UI Component | Notes |
|---------|-----------------|-------|
| Logo area | `Image` or `Icon` | Placeholder icon for MVP |
| App title | `Text h1` | "Peso Pensado" |
| Subtitle | `Text` | Tagline |
| Visitor button | `Button title="Continuar como visitante"` | Primary, solid |
| Sign up button | `Button title="Criar conta"` | Outline or secondary |
| Sign in button | `Button title="Entrar"` | Type="clear" |

## State

- **No input state** — purely navigational
- On mount: check if Owner exists
  - If yes → redirect to Home tabs (skip this screen)
  - If no → show this screen

## Key Interactions

| Action | Behavior |
|--------|----------|
| Tap "Continuar como visitante" | Create Owner record, redirect to Setup |
| Tap "Criar conta" | Create Owner record, redirect to Setup (account step deferred) |
| Tap "Entrar" | Redirect to Setup (login step deferred) |

**Note**: For MVP, all three buttons lead to the same flow (create owner → setup). Account creation and login are structurally present but not fully implemented. The visitor path is the primary flow.

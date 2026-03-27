# Screen: History (Session List)

**Route**: `app/(tabs)/history.tsx`
**Purpose**: Let user review completed workout sessions

---

## Wireframe

```
┌─────────────────────────────────┐
│  Histórico                      │
├─────────────────────────────────┤
│                                 │
│  ─── Hoje ───                   │
│                                 │
│  ┌─────────────────────────┐    │
│  │ Treino A - Peito/Tríceps│    │
│  │ 27 Mar 2026 · 47 min    │    │
│  │ 6 exercícios · 24 séries│    │
│  └─────────────────────────┘    │
│                                 │
│  ─── Esta semana ───            │
│                                 │
│  ┌─────────────────────────┐    │
│  │ Dia de Pernas           │    │
│  │ 25 Mar 2026 · 52 min    │    │
│  │ 7 exercícios · 28 séries│    │
│  └─────────────────────────┘    │
│                                 │
│  ┌─────────────────────────┐    │
│  │ Treino B - Costas/Bíceps│    │
│  │ 23 Mar 2026 · 41 min    │    │
│  │ 5 exercícios · 20 séries│    │
│  └─────────────────────────┘    │
│                                 │
│  ─── Semana anterior ───        │
│                                 │
│  ┌─────────────────────────┐    │
│  │ Treino A - Peito/Tríceps│    │
│  │ 20 Mar 2026 · 45 min    │    │
│  │ 6 exercícios · 22 séries│    │
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
│  Histórico                      │
├─────────────────────────────────┤
│                                 │
│                                 │
│                                 │
│     Nenhum treino concluído     │
│                                 │
│  Complete seu primeiro treino   │
│  para vê-lo aqui                │
│                                 │
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
| Header | `Text h3` or `Header` | "Histórico" |
| Section header | `Text subtitle` | Grouped by time period |
| Session card | `ListItem` | Template name, date, duration, stats |
| Session list | `FlatList` | With sticky section headers |
| Empty state | `Text` centered | "Nenhum treino concluído" |
| Tab bar | Expo Router tabs | Home, Histórico, Perfil |

## State

- On mount: query all completed WorkoutSessions for current owner
- Grouped by time period (today, this week, earlier)
- Each card shows:
  - Template name
  - Date (formatted in PT-BR)
  - Duration (completedAt - startedAt)
  - Exercise count
  - Set count

## Key Interactions

| Action | Behavior |
|--------|----------|
| Tap session card | Navigate to `session/[id]` (session detail) |
| Pull to refresh | Re-query sessions |
| Scroll | Load more (pagination if needed) |

## Data Queries

```typescript
const sessions = await db
  .select({
    id: workoutSessions.id,
    templateName: workoutTemplates.name,
    startedAt: workoutSessions.startedAt,
    completedAt: workoutSessions.completedAt,
    status: workoutSessions.status,
  })
  .from(workoutSessions)
  .innerJoin(workoutTemplates, eq(workoutSessions.workoutTemplateId, workoutTemplates.id))
  .where(and(
    eq(workoutSessions.ownerId, currentOwnerId),
    eq(workoutSessions.status, 'completed')
  ))
  .orderBy(desc(workoutSessions.completedAt));
```

## Grouping Logic

Sessions grouped into time buckets:
- **Hoje**: completedAt is today
- **Esta semana**: completedAt is within last 7 days
- **Semana anterior**: completedAt is within last 14 days
- **Mais antigos**: everything else

## Design Notes

- Simple list, no charts or analytics
- Focus on what happened and when
- Tap to drill into details
- Keep this tab lightweight — the core value is active logging, not history browsing

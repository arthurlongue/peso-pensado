# Diagrams

All diagrams use Mermaid syntax. View in any Mermaid-compatible renderer (GitHub, VS Code extension, mermaid.live).

---

## 1. Entity Relationship Diagram

```mermaid
erDiagram
    OWNER ||--|| PROFILE : has
    OWNER ||--|| USER_SETTINGS : has
    OWNER ||--o{ CUSTOM_EXERCISE : creates
    OWNER ||--o{ WORKOUT_TEMPLATE : owns
    OWNER ||--o{ WORKOUT_SESSION : executes

    WORKOUT_TEMPLATE ||--o{ WORKOUT_TEMPLATE_EXERCISE : contains

    WORKOUT_SESSION ||--o{ WORKOUT_SESSION_EXERCISE : contains
    WORKOUT_SESSION ||--o| SESSION_NOTE : "may have"

    WORKOUT_SESSION_EXERCISE ||--o{ SET_ENTRY : logs

    EXERCISE_LIBRARY_ITEM }o--|| WORKOUT_TEMPLATE_EXERCISE : "referenced by"
    EXERCISE_LIBRARY_ITEM }o--|| WORKOUT_SESSION_EXERCISE : "referenced by"
    CUSTOM_EXERCISE }o--|| WORKOUT_TEMPLATE_EXERCISE : "referenced by"
    CUSTOM_EXERCISE }o--|| WORKOUT_SESSION_EXERCISE : "referenced by"

    WORKOUT_TEMPLATE }o--|| WORKOUT_SESSION : "snapshotted by"

    OWNER {
        text id PK
        text createdAt
        text updatedAt
    }

    PROFILE {
        text id PK
        text ownerId FK
        text name
        int age
        text sex
        real height
        real weight
    }

    USER_SETTINGS {
        text id PK
        text ownerId FK
        text weightUnit
        text measurementUnit
    }

    EXERCISE_LIBRARY_ITEM {
        text id PK
        text name
        text forceType
        text level
        text mechanic
        text equipment
        text primaryMuscles
        text secondaryMuscles
        text instructions
        text category
        text images
    }

    CUSTOM_EXERCISE {
        text id PK
        text ownerId FK
        text name
        text forceType
        text level
        text mechanic
        text equipment
        text primaryMuscles
        text secondaryMuscles
        text instructions
        text category
    }

    WORKOUT_TEMPLATE {
        text id PK
        text ownerId FK
        text name
        text description
    }

    WORKOUT_TEMPLATE_EXERCISE {
        text id PK
        text workoutTemplateId FK
        int orderIndex
        text sourceType
        text exerciseRefId
        text note
    }

    WORKOUT_SESSION {
        text id PK
        text ownerId FK
        text workoutTemplateId FK
        text status
        text startedAt
        text completedAt
    }

    WORKOUT_SESSION_EXERCISE {
        text id PK
        text workoutSessionId FK
        text sourceTemplateExerciseId FK
        int orderIndex
        text sourceType
        text exerciseRefId
        text note
        int wasSkipped
    }

    SET_ENTRY {
        text id PK
        text workoutSessionExerciseId FK
        int orderIndex
        text setType
        int reps
        real weight
        text completedAt
    }

    SESSION_NOTE {
        text id PK
        text workoutSessionId FK
        text content
    }
```

---

## 2. Planning vs Execution Boundary

```mermaid
graph LR
    subgraph PLANNING
        direction TB
        T[WorkoutTemplate] --> TE[WorkoutTemplateExercise]
    end

    subgraph EXECUTION
        direction TB
        S[WorkoutSession] --> SE[WorkoutSessionExercise]
        SE --> ST[SetEntry]
        S --> SN[SessionNote]
    end

    T -.->|snapshot on start| S
    TE -.->|copied as| SE

    style PLANNING fill:#e8f4f8,stroke:#2196f3
    style EXECUTION fill:#fff3e0,stroke:#ff9800
```

---

## 3. Navigation Map

```mermaid
graph TD
    START[App Launch] --> CHECK{Owner exists?}
    CHECK -->|No| SETUP[Setup Screen]
    CHECK -->|Yes| TABS[Tab Navigator]

    SETUP --> TABS

    TABS --> HOME[Home Tab: Templates List]
    TABS --> HISTORY[History Tab: Session History]
    TABS --> PROFILE[Profile Tab: Settings]

    HOME -->|Create Template| TEDIT[Template Editor]
    HOME -->|Edit Template| TEDIT
    HOME -->|Start Session| ACTIVE[Active Session]

    TEDIT -->|Add Exercise| PICKER[Exercise Picker Modal]
    PICKER -->|Create Custom| CEXERCISE[Custom Exercise Form Modal]
    PICKER -->|Select| TEDIT

    ACTIVE -->|Expand Exercise| INLINE[Inline Exercise Details]
    ACTIVE -->|Add Exercise| PICKER2[Exercise Picker Modal]
    ACTIVE -->|Complete| COMPLETE[Completion Confirmation]
    COMPLETE --> HOME

    HISTORY -->|Tap Session| DETAIL[Session Detail - Read Only]

    style ACTIVE fill:#ff9800,color:#fff,stroke:#e65100
    style PICKER fill:#e1f5fe,stroke:#0288d1
    style PICKER2 fill:#e1f5fe,stroke:#0288d1
    style CEXERCISE fill:#e1f5fe,stroke:#0288d1
    style COMPLETE fill:#c8e6c9,stroke:#388e3c
```

---

## 4. Session Lifecycle

```mermaid
stateDiagram-v2
    [*] --> TemplateCreated: User saves template
    TemplateCreated --> InProgress: Start session (snapshot template)

    state InProgress {
        [*] --> LoggingSets
        LoggingSets --> LoggingSets: Add set (direct DB write)
        LoggingSets --> ExerciseExpanded: Tap exercise row
        ExerciseExpanded --> LoggingSets: Collapse
        LoggingSets --> ExerciseAdded: Add exercise ad hoc
        LoggingSets --> ExerciseReordered: Move down 1
        ExerciseAdded --> LoggingSets
        ExerciseReordered --> LoggingSets
    }

    InProgress --> Completed: Mark complete
    Completed --> [*]: Session in history

    note right of InProgress
        All changes stay in session.
        Template is never modified.
        Each set writes to SQLite immediately.
    end note

    note right of Completed
        Status changes to 'completed'.
        completedAt timestamp is set.
        Appears in session history.
    end note
```

---

## 5. User Flow: First Launch to First Workout

```mermaid
graph TD
    A[Open App] --> B{First launch?}
    B -->|Yes| C[Create Owner record]
    C --> D[Show Setup Screen]
    D --> E[Enter name, stats, units]
    E --> F[Seed exercise library]
    F --> G[Home: Templates List - Empty]

    B -->|No| G

    G -->|Create Template| H[Template Editor]
    H --> I[Name the template]
    I --> J[Add exercises from library]
    J --> K[Save template]
    K --> G

    G -->|Start Session| L[Active Session Screen]
    L --> M[Log sets for each exercise]
    M --> N[Complete session]
    N --> O[Back to Home]

    style L fill:#ff9800,color:#fff,stroke:#e65100
    style G fill:#e8f4f8,stroke:#2196f3
```

---

## 6. User Flow: Active Session Detail

```mermaid
graph TD
    START[Active Session Screen] --> LIST[Exercise List - All Collapsed]

    LIST -->|Tap exercise| EXPAND[Expand Exercise Inline]

    EXPAND --> PREV[Show Previous Performance]
    EXPAND --> SETS[Show Current Sets]
    EXPAND --> ADDW[Add Warm-up Set Button]
    EXPAND --> ADDS[Add Working Set Button]
    EXPAND --> NOTE[Exercise Notes Input]

    ADDW --> NEWS[New warm-up set row appears]
    ADDS --> NEWS2[New working set row appears]

    NEWS --> INPUT[Enter reps + weight]
    NEWS2 --> INPUT
    INPUT --> SAVE[Immediate SQLite write]
    SAVE --> SETS

    LIST -->|Move down arrow| REORDER[Exercise moves down 1 position]
    LIST -->|Add exercise btn| PICKER[Exercise Picker]
    PICKER -->|Select| LIST

    LIST -->|Complete button| DONE[Session Complete]

    style SAVE fill:#c8e6c9,stroke:#388e3c
    style INPUT fill:#fff3e0,stroke:#ff9800
```

---

## 7. Expo Router File Structure

```mermaid
graph TD
    ROOT["app/_layout.tsx"] --> TABS["app/(tabs)/_layout.tsx"]
    ROOT --> SETUP["app/setup.tsx"]
    ROOT --> TEMPLATE["app/template/[id].tsx"]
    ROOT --> SESSION_ACTIVE["app/session/active.tsx"]
    ROOT --> SESSION_DETAIL["app/session/[id].tsx"]

    TABS --> HOME["app/(tabs)/index.tsx<br/>Templates List"]
    TABS --> HISTORY["app/(tabs)/history.tsx"]
    TABS --> PROFILE["app/(tabs)/profile.tsx"]

    style ROOT fill:#1565c0,color:#fff
    style TABS fill:#2196f3,color:#fff
    style SESSION_ACTIVE fill:#ff9800,color:#fff
    style HOME fill:#e8f4f8
    style HISTORY fill:#e8f4f8
    style PROFILE fill:#e8f4f8
```

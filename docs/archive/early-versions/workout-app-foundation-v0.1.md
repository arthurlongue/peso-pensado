# Workout App Foundation v0.1

## Product intent
Build a workout app optimized for fast logging during real training sessions, while staying flexible enough to adapt as the product is used in practice. The product should be realistic about current certainty, defer low-confidence decisions, and avoid premature complexity.

## Product principles
- Fast logging is the core value.
- Real session flow matters more than idealized planning flows.
- Templates guide sessions, but live sessions can diverge safely.
- Early versions should prioritize usability over exhaustive configuration.
- Decisions with low confidence should stay flexible and be deferred until actual usage reveals better defaults.
- The product should be personally useful first, while also being presentable early.

## Current scope decisions

### Workout structure
- Users can create workout templates / workout days.
- A session is executed from a template but may be changed during the session.
- Session-only changes do not mutate the underlying template.
- Completion state should support at least in-progress and completed.

### Logging model
- Warm-up sets and working sets are both supported in v1.
- Warm-up sets are added explicitly through an action such as "Add warm-up sets" on the exercise.
- The warm-up action should default to adding 1 warm-up set, with the ability to add more quickly.
- Exercise notes come first.
- Session notes can come later.
- In the workout view, the last set summary is shown first, with the option to expand and view all sets.

### Previous performance context
- When viewing an exercise inside a workout day, the comparison source is the last time that exact exercise appeared in that same workout day context.
- This is preferred over comparing against the most recent occurrence anywhere.

### Settings
- Early settings remain minimal.
- Only weight unit and measurement unit are first-class settings for now.
- Other settings should be added only when repeated real usage shows clear need.

### Exercise library
- The app uses a structured exercise dataset, not a name-only list.
- The built-in dataset is read-only.
- Users can create and save custom exercises separately.
- Built-in exercise records may include fields such as:
  - id
  - name
  - force
  - level
  - mechanic
  - equipment
  - primaryMuscles
  - secondaryMuscles
  - instructions
  - category
  - images

### Profile and account model
- Real user accounts should exist early.
- A seeded demo account can coexist for showcase purposes.
- The user profile for v1 is basic and excludes photos.
- Initial profile fields can include:
  - name
  - age
  - sex
  - height
  - weight

## Deferred decisions
These are intentionally not locked yet and should remain flexible until product usage makes them clearer.
- Additional settings beyond units
- Advanced personalization rules
- Rich analytics scope
- Recommendation systems
- Deep exercise editing for built-in library items
- Media-heavy profile features

## Core user flows

### 1. Create and manage workout templates
User creates workout days / templates composed of exercises that can later be executed as sessions.

### 2. Start a workout session
User starts a session from a template.
The session is based on the template but becomes an independent runtime instance.

### 3. Log exercise performance quickly
Inside the session, the user logs sets with minimal friction.
The UI should prioritize current input and recent context over dense historical detail.

### 4. Add warm-up sets when needed
Warm-up sets are not forced by configuration up front.
The user adds them explicitly from the exercise UI.

### 5. View relevant previous performance
While logging an exercise, the user sees the previous matching performance for that same exercise in the same workout-day context.

### 6. Finish the session
The session can remain in progress or be marked completed.
Autosave plus explicit completion should both exist.

## MVP scope v0.1

### Goal
Define the smallest version of the workout app that is genuinely useful in real training and presentable as a product.

### In scope
- User account and basic profile
- Create workout templates / workout days
- Start a session from a template
- Log sets during a session
- Add warm-up sets from the exercise UI
- Exercise notes
- Previous performance for the same exercise in the same workout-day context
- Autosave session progress
- Mark session as completed
- Built-in read-only exercise library
- Custom user-created exercises
- Weight unit and measurement unit settings

### Out of scope
- Advanced analytics
- Recommendations
- Social features
- Media-heavy profile
- Editing built-in exercise library items
- Complex settings
- Rich progression dashboards
- Coach / multi-user roles

### MVP success criteria
- A user can create a workout day and use it in a real gym session.
- Logging feels fast enough that it does not interrupt training.
- Session changes do not break template integrity.
- Previous performance is visible where it matters.
- Warm-up handling is simple and usable.
- The app is personally useful and demoable.

### MVP risks
- Logging flow becomes too heavy.
- Exercise data complexity leaks into the main flow.
- Session and template boundaries become confusing.
- Too many nice-to-have features enter the MVP.

## User flows v0.1

### 1. Sign up and basic setup
User creates an account and fills basic profile data.
User selects weight unit and measurement unit.
User can continue without filling every optional field.

### 2. Create a workout template
User creates a workout day / template.
User adds exercises from the built-in library or from custom exercises.
User orders exercises as needed.

### 3. Start a session from a template
User chooses a template and starts a session.
A session instance is created from the template.
From this point, session changes do not modify the template.

### 4. Log an exercise
User opens an exercise in the session.
User sees current sets and the last relevant previous performance.
User logs reps and weight quickly.
The UI keeps the last set summary primary, with expansion available for all sets.

### 5. Add warm-up sets
User taps an action such as "Add warm-up set".
One warm-up set is added by default.
User can quickly add more warm-up sets if needed.

### 6. Add exercise notes
User can attach notes to the exercise during the session.
These notes support execution details and reminders.

### 7. Modify the live session
User can add, remove, reorder, or skip exercises in the active session.
These changes affect only the current session.
They do not modify the template unless a future explicit save-back flow is added.

### 8. Leave and resume session
Session progress is autosaved.
User can leave and return without losing progress.
The session remains clearly marked as in progress until completed.

### 9. Complete session
User finishes the session and marks it as completed.
The final logged data becomes part of workout history.

### 10. Create a custom exercise
User creates a custom exercise when a needed movement is not present in the built-in library.
The custom exercise becomes available for future templates and sessions.

## Data model / schema draft v0.1

### Design goals
- Keep template data and session data clearly separated.
- Optimize for fast logging during active sessions.
- Support built-in read-only exercises and user-created custom exercises.
- Preserve enough history for previous-performance comparison.
- Avoid locking the product into premature analytics complexity.

### Core entities

#### User
Represents the account.

Fields:
- id
- email
- passwordHash / authProviderId
- createdAt
- updatedAt

#### Profile
Stores basic personal data for the user.

Fields:
- id
- userId
- name
- age
- sex
- height
- weight
- createdAt
- updatedAt

#### UserSettings
Stores the minimal first-class settings for MVP.

Fields:
- id
- userId
- weightUnit
- measurementUnit
- createdAt
- updatedAt

#### ExerciseLibraryItem
Represents a built-in exercise from the read-only dataset.

Fields:
- id
- name
- force
- level
- mechanic
- equipment
- primaryMuscles
- secondaryMuscles
- instructions
- category
- images

Notes:
- Read-only in MVP
- Imported from dataset
- Can be referenced by templates and sessions

#### CustomExercise
Represents a user-created exercise.

Fields:
- id
- userId
- name
- force
- level
- mechanic
- equipment
- primaryMuscles
- secondaryMuscles
- instructions
- category
- images
- createdAt
- updatedAt

Notes:
- Owned by a specific user
- Available in that user’s templates and sessions

#### WorkoutTemplate
Represents a saved workout day / routine template.

Fields:
- id
- userId
- name
- description
- createdAt
- updatedAt

#### WorkoutTemplateExercise
Represents an exercise inside a template.

Fields:
- id
- workoutTemplateId
- orderIndex
- sourceType
- exerciseRefId
- note
- createdAt
- updatedAt

Notes:
- sourceType = library | custom
- exerciseRefId points to ExerciseLibraryItem.id or CustomExercise.id
- Defines exercise order inside template
- Does not store session performance

#### WorkoutSession
Represents one execution of a template.

Fields:
- id
- userId
- workoutTemplateId
- status
- startedAt
- completedAt
- createdAt
- updatedAt

Notes:
- status = in_progress | completed
- Created from a template
- Becomes independent at runtime
- Session changes do not mutate template

#### WorkoutSessionExercise
Represents an exercise instance inside a live or completed session.

Fields:
- id
- workoutSessionId
- sourceTemplateExerciseId
- orderIndex
- sourceType
- exerciseRefId
- note
- wasSkipped
- createdAt
- updatedAt

Notes:
- sourceTemplateExerciseId is nullable if the exercise was added ad hoc during the session
- sourceType = library | custom
- Stores the exercise as used in that specific session
- Supports add, remove, reorder, and skip during session

#### SetEntry
Represents one logged set.

Fields:
- id
- workoutSessionExerciseId
- orderIndex
- setType
- reps
- weight
- completedAt
- createdAt
- updatedAt

Notes:
- setType = warmup | working
- Warm-up and working sets share the same structure
- Order matters
- One warm-up set can be added by default from the UI

#### SessionNote
Optional session-level note.

Fields:
- id
- workoutSessionId
- content
- createdAt
- updatedAt

### Relationship summary
- User has one Profile
- User has one UserSettings
- User has many CustomExercises
- User has many WorkoutTemplates
- WorkoutTemplate has many WorkoutTemplateExercises
- User has many WorkoutSessions
- WorkoutSession has many WorkoutSessionExercises
- WorkoutSessionExercise has many SetEntries
- WorkoutSession may have one SessionNote

### Source reference pattern
For template and session exercises:
- sourceType = library means exerciseRefId points to ExerciseLibraryItem.id
- sourceType = custom means exerciseRefId points to CustomExercise.id

This avoids duplicating exercise systems while still supporting both sources.

### Previous performance rule
For an exercise shown inside a workout session, previous performance should be resolved from:
- the most recent completed WorkoutSession
- for the same user
- from the same WorkoutTemplate
- with the same exercise reference
- before the current session

This matches the chosen rule: same exercise in the same workout-day context.

### Important modeling rules
- Template exercises are planning data.
- Session exercises are execution data.
- Sets belong only to session exercises.
- Built-in library items are never edited by users in MVP.
- Custom exercises are user-owned.
- Session modifications stay isolated from the template.

### Explicitly not modeled yet
- Progression analytics tables
- Recommendation engine data
- PR tracking abstractions
- Rest timer history
- Achievements / gamification
- Social / coach data

## Realism notes
This document is intentionally not a full PRD.
It is a source-of-truth foundation for drafting the actual working docs next.
Anything not explicitly decided here should be treated as open, not assumed.

## Immediate next docs to write
1. Screen inventory
2. Architecture / implementation plan
# Product Requirements Document

## Vision

A workout logging app optimized for **fast set logging during real gym sessions**. The core value is minimal friction between finishing a set and logging it, so the app feels like a natural extension of training rather than a distraction from it.

The product should be personally useful first, presentable early, and realistic about what decisions are certain vs. deferred.

## Core Principles

1. **Fast logging is the core value** — every UI choice optimizes for speed during training
2. **Real session flow > idealized planning** — the active session screen matters more than template management
3. **Templates guide, sessions diverge** — templates define intent, sessions are the lived reality
4. **Defer low-confidence decisions** — avoid premature complexity, let usage reveal defaults
5. **Personally useful first** — ship something you'd actually use at the gym

## MVP Scope

### In Scope

- Visitor-first entry (no signup required)
- Lightweight profile setup (name, age, sex, height, weight, units)
- Create and manage workout templates
- Start a session from a template
- Log working sets with reps and weight
- Add warm-up sets explicitly
- Exercise notes during session
- Previous performance context (same exercise, same workout-day)
- Autosave session progress
- Session completion
- Built-in exercise library (read-only, structured)
- Custom user-created exercises
- Weight unit and measurement unit settings
- Session history (completed sessions)
- Combined profile/settings area

### Out of Scope

- Advanced analytics or progression dashboards
- Recommendations
- Social features
- Media-heavy profile (photos)
- Editing built-in exercise library items
- Complex settings
- Coach / multi-user roles
- Web client
- Multi-device sync
- Rest timer
- Achievements / gamification

## User Stories

### Access & Setup

**US-1: First-time entry**
As a new user, I want to start using the app immediately without creating an account, so I can try it during my next gym session.

**US-2: Lightweight setup**
As a new user, I want to optionally provide my name, basic stats, and preferred units, so the app can personalize weight displays and track basic profile data.

### Template Management

**US-3: Create a workout template**
As a user, I want to create a workout day with an ordered list of exercises from the built-in library or my custom exercises, so I can plan my training.

**US-4: Edit a workout template**
As a user, I want to modify my templates (rename, reorder, add/remove exercises), so I can adjust my plans over time.

### Active Session

**US-5: Start a session**
As a user, I want to start a workout session from a template, so I can begin logging my actual training.

**US-6: Log sets quickly**
As a user logging a set during training, I want to enter reps and weight with minimal taps, so the app doesn't interrupt my workout flow.

**US-7: Add warm-up sets**
As a user, I want to explicitly add warm-up sets to an exercise during my session, so I can record my full warm-up progression.

**US-8: See previous performance**
As a user logging an exercise, I want to see what I did last time for this same exercise in this same workout, so I can aim to match or beat it.

**US-9: Modify session exercises**
As a user mid-workout, I want to reorder or add exercises to my current session, so I can adapt if my plan changes. These changes must not affect my template.

**US-10: Add exercise notes**
As a user, I want to attach notes to an exercise during my session, so I can record form cues or observations.

**US-11: Leave and resume**
As a user, I want to leave the app mid-workout and return without losing progress, so I don't worry about closing the app between sets.

**US-12: Complete a session**
As a user finishing my workout, I want to mark the session as completed, so it appears in my history.

### Exercise Catalog

**US-13: Browse exercises**
As a user, I want to search the built-in exercise library by name, muscle group, or equipment, so I can find exercises for my templates.

**US-14: Create custom exercises**
As a user, I want to create a custom exercise when the built-in library doesn't have what I need, so I can log any movement.

### History & Profile

**US-15: View session history**
As a user, I want to see a list of my completed workouts, so I can track my training over time.

**US-16: Inspect a past session**
As a user, I want to view the details of a completed session (exercises, sets, notes), so I can review what I did.

**US-17: Manage profile and settings**
As a user, I want to update my profile and unit preferences, so the app displays data in my preferred format.

## Success Criteria

- A user can create a template and use it in a real gym session
- Logging a set feels fast enough that it doesn't interrupt training
- Session changes never break template integrity
- Previous performance is visible during active logging
- Warm-up handling is simple and doesn't add friction
- The app works fully offline on a single device
- The app is personally useful and demoable

## Key Constraints

- **Active session is one screen** — inline expansion, no multi-screen split
- **Sets are direct writes** — not a form submission, each set persists immediately to SQLite
- **Last set summary shown first** — expand for all sets
- **Reorder: move-down-1 only** in MVP
- **Remove/skip exercises de-emphasized** — not promoted in main session UI
- **Profile + Settings combined** into one low-priority area
- **Portuguese (BR)** exercise names and instructions in built-in dataset

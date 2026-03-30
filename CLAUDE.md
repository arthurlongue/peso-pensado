# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

"Peso Pensado" is a mobile-first, local-first workout logging app built with **Expo + React Native**. The core value is fast set logging during real gym sessions. The app is fully usable on one device without network or account creation.

## Tech Stack

- **App framework**: Expo + React Native (mobile-only, web explicitly deferred)
- **Routing**: Expo Router (file-based, similar to Next.js App Router)
- **Styling**: NativeWind (Tailwind CSS syntax for React Native)
- **Database**: SQLite via `expo-sqlite` with **Drizzle ORM** and explicit migrations
- **UI library**: RNE UI (for complex components like BottomSheet, etc.)
- **Forms + validation**: Zod + React Hook Form (for setup, auth, templates, custom exercises)
- **Active session logging**: NOT a form — uses lightweight screen state + direct local writes
- **Package manager**: pnpm

## Architecture: Planning vs. Execution

The most important architectural boundary in this app:

- **Workout templates** are *planning data* (define future sessions)
- **Workout sessions** are *execution data* (runtime instances with logged sets)
- Starting a session **snapshots** the template; session changes **never mutate** the template
- Sets belong only to session exercises, never to template exercises

## Data Model

Core entities and their relationships:
- **Owner** — abstract local identity (visitor-backed in MVP, account-linkable later); one per device
- **Profile** / **UserSettings** — basic profile fields + weight/measurement units
- **ExerciseLibraryItem** — read-only built-in exercise dataset (structured: id, name, muscles, equipment, etc.)
- **CustomExercise** — user-owned, same structure as library items
- **WorkoutTemplate** → **WorkoutTemplateExercise** — ordered exercises with `sourceType` (library|custom) + `exerciseRefId`
- **WorkoutSession** → **WorkoutSessionExercise** → **SetEntry** — session snapshot with setType (warmup|working), reps, weight
- Previous performance: last completed session for same user + same template + same exercise

## Key Design Decisions

- **Visitor-first**: entry without signup; account creation is optional and non-blocking
- **Active session is one screen**: inline exercise expansion, no multi-screen split
- **Warm-up sets**: added explicitly via action, default 1, not pre-configured
- **Last set summary shown first**; expand for all sets
- **Reorder**: only "move down 1" in MVP; remove/skip de-emphasized
- **Profile + Settings combined** into one low-priority area for MVP

## Repository Structure

- `app/` — Expo Router screens (file-based routing, like `app/` in Next.js)
- `db/` — Drizzle schema, migrations, seed data
- `components/` — Reusable UI components
- `lib/` — Shared utilities, types, constants
- `docs/` — Consolidated reference docs
  - `docs/prd.md` — Product vision, MVP scope, user stories, success criteria
  - `docs/architecture.md` — System overview, tech stack, navigation map, design decisions
  - `docs/data-model.md` — All tables, exercise dataset mapping, seed strategy
  - `docs/diagrams.md` — Mermaid diagrams (ER, navigation, user flows, session lifecycle)
  - `docs/screens/` — 11 screen designs with ASCII wireframes and component breakdowns
  - `docs/archive/` — Superseded source docs (early drafts, v0.2 foundation, etc.)

## Collaboration Style

- **Mentor mode**: The user has web frontend experience (React, Next.js, Vite, Tailwind) but is new to mobile/native. Explain React Native concepts by comparing to what they already know from web/Next.js. Provide educational context (`★ Insight`) alongside implementation. Explain *why*, not just *what*.
- **Small steps**: Make 1-2 changes per turn. Explain each change. Wait for understanding before moving on. Never batch-create multiple files at once.
- **Understand before code**: Before writing any code file, first explain in **natural language** what needs to happen. The user must understand the plan fully before any code is written. No blind implementation.
- **Must understand everything**: The user must understand every piece of code that goes into the codebase. If something is unclear, explain it before proceeding.
- **TSDoc**: All TypeScript code must use TSDoc comments on functions, types, interfaces, and exported members.
- **Visual-first**: The user is frontend-focused and learns better with visual aids. Reference screen wireframes and diagrams when discussing features.
- **Before implementing**: Use a specialized planner agent to break work into phases. Stop and align before writing code.
- **Commit often**: Commit after each meaningful unit of work (a file created, a feature working, a config fixed), not at the end of an entire phase. Small commits make rollbacks safe and git history useful. A good rule of thumb: if you'd be sad to lose it, commit it.
- **Update task files**: Mark tasks as done in `tasks/` files as work progresses.
- **Detailed task files**: Task files in `tasks/` must be granular teaching documents, not just checklists. Each task file should include:
  - **Subtasks** broken down into small, ordered steps with clear dependencies (what must happen before what)
  - **Why** — explain the reasoning behind each step, not just what to do
  - **Constraints** — what NOT to do, common pitfalls, things that look right but are wrong in React Native
  - **Expected outcome** — what you should see/verify after completing each subtask
  - **Order matters** — make the execution order explicit, especially when one step depends on another

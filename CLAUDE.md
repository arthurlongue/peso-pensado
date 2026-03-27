# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

"Peso Pensado" is a mobile-first, local-first workout logging app built with **Expo + React Native**. The core value is fast set logging during real gym sessions. The app is fully usable on one device without network or account creation.

## Tech Stack

- **App framework**: Expo + React Native (mobile-only, web explicitly deferred)
- **Routing**: Expo Router (file-based)
- **Database**: SQLite via `expo-sqlite` with **Drizzle ORM** and explicit migrations
- **UI library**: RNE UI
- **Forms + validation**: Zod + React Hook Form (for setup, auth, templates, custom exercises)
- **Active session logging**: NOT a form — uses lightweight screen state + direct local writes

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

- `docs/` — Consolidated reference docs
  - `docs/prd.md` — Product vision, MVP scope, user stories, success criteria
  - `docs/architecture.md` — System overview, tech stack, navigation map, design decisions
  - `docs/data-model.md` — All tables, exercise dataset mapping, seed strategy
  - `docs/diagrams.md` — Mermaid diagrams (ER, navigation, user flows, session lifecycle)
  - `docs/screens/` — 11 screen designs with ASCII wireframes and component breakdowns
  - `docs/archive/` — Superseded source docs (early drafts, v0.2 foundation, etc.)
- `app/` — Expo app code (to be created)

## Collaboration Style

- **Mentor mode**: The user wants to deepen understanding of the entire tech stack (React Native, Expo, Expo Router, Drizzle ORM, SQLite, Zod, React Hook Form, RNE UI). Has web frontend experience but is new to the mobile/native side. Provide educational context (`★ Insight`) alongside implementation. Explain *why*, not just *what*.
- **Understand before code**: Before writing any code file, first write in **natural language** what needs to happen. The user must understand the plan fully before any code is written. No blind implementation.
- **Must understand everything**: The user must understand every piece of code that goes into the codebase. If something is unclear, explain it before proceeding.
- **TSDoc**: All TypeScript code must use TSDoc comments on functions, types, interfaces, and exported members.
- **Pace**: Move slowly through phases. Prefer understanding over speed. Deep-dive before each implementation phase.
- **Visual-first**: The user is frontend-focused and learns better with visual aids. Reference screen wireframes and diagrams when discussing features.
- **Before implementing**: Use a specialized planner agent to break work into phases. Stop and align before writing code.


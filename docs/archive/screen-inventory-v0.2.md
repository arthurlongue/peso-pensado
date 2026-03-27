# Screen Inventory v0.2

## Goal
List the minimum screens and main UI surfaces required to ship the MVP.

Main change from the older draft:
- the old split between active session overview / exercise logging / session edit controls / session completion is collapsed into one main Active Session screen
- inline exercise expansion is the chosen direction
- visitor-first access is allowed
- profile + settings can be one combined low-priority MVP area

---

## 1. Entry

### 1.1 Welcome
Purpose:
- let user start fast
- support visitor-first usage
- allow auth later

Main elements:
- continue as visitor
- sign up
- sign in

Notes:
- visitor flow is allowed
- account creation should not block first use
- exact visitor-to-account merge behavior is still open

---

## 2. Setup

### 2.1 Lightweight setup
Purpose:
- collect only what is useful early without blocking usage

Main elements:
- basic profile fields
  - name
  - age
  - sex
  - height
  - weight
- weight unit
- measurement unit
- continue / skip

Notes:
- keep this lightweight
- do not force non-essential info
- can be a single combined screen in MVP instead of separate profile and units setup screens

---

## 3. Home

### 3.1 Templates list
Purpose:
- show saved workout days / templates
- let user start or edit a template

Main elements:
- template list
- create template
- start session
- edit template

Notes:
- no special resume UX is being designed right now
- autosave/restore exists, but the screen inventory does not add extra homepage resume behavior yet

---

## 4. Template management

### 4.1 Template editor
Purpose:
- create and manage a workout day

Main elements:
- template name
- optional description
- ordered exercise list
- add exercise
- reorder exercises
- remove exercise
- save template

Notes:
- template editing is planning flow
- it should feel clearly different from live session execution
- template changes define future sessions, not current runtime behavior

### 4.2 Exercise picker
Purpose:
- add exercises from built-in library or custom exercises

Main elements:
- search
- built-in exercise results
- custom exercise results
- select action
- create custom exercise action

Notes:
- built-in dataset is structured and read-only
- custom exercises are user-owned and reusable

### 4.3 Custom exercise editor
Purpose:
- create a user-owned exercise when needed

Main elements:
- name
- optional structured fields
- save

Notes:
- keep lightweight in MVP
- do not over-design editing depth yet

---

## 5. Session flow

### 5.1 Active session
Purpose:
- main workout execution screen
- fast logging with minimal friction

Main elements:
- session title
- in-progress state
- ordered exercise list
- progress indicator
- complete session action
- inline expand per exercise

Expanded exercise contents:
- exercise identity
- previous performance summary
- current sets
- add set
- add warm-up set
- reps and weight inputs
- last set summary first
- expand to show all sets
- exercise notes

Session-level actions:
- lightweight reorder action
- initial reorder control: move down 1
- add exercise on the fly, but visually secondary

De-emphasized / not promoted in MVP UI:
- remove exercise
- skip exercise

Notes:
- this screen replaces the older split of overview + logging + edit controls + completion
- warm-up sets stay explicit from the exercise UI
- previous performance stays tied to the same exercise in the same workout-day context
- session modifications must never mutate the template

### 5.2 Session completion feedback
Purpose:
- confirm completion without becoming a major separate flow

Main elements:
- confirmation feedback
- transition to history or back home

Notes:
- this is a lightweight state/surface, not a full heavyweight screen

---

## 6. History

### 6.1 Session history
Purpose:
- let user review completed workouts

Main elements:
- completed session list
- session date
- template name
- open session detail

Notes:
- should exist in MVP
- should not dominate MVP scope

### 6.2 Session detail
Purpose:
- inspect a completed workout

Main elements:
- session metadata
- exercise list
- set history
- notes if present

---

## 7. Profile / settings

### 7.1 Profile and settings
Purpose:
- minimal account/preferences area

Main elements:
- basic profile fields
- weight unit
- measurement unit
- save

Notes:
- combine profile + settings for MVP
- photos and richer account surfaces stay out

---

## Secondary surfaces, not primary screens

These should exist as lightweight surfaces, not big standalone screens:
- completion confirmation
- inline exercise expansion
- add exercise entry inside active session
- note editor surface if needed
- reorder control
- empty states
- auth prompts when a visitor chooses to convert to account later

---

## Removed from v0.1 as standalone screens

These are now absorbed into Active Session:
- active session overview
- exercise logging view
- session edit controls
- session completion

That reduces fragmentation and keeps the highest-priority interaction where it belongs: inside the live workout flow.

---

## Still open, but not blocking

Open:
- exact visitor-to-account data handoff
- exact fields for custom exercise creation
- whether add-exercise in active session lives in header, footer, or overflow
- whether session notes appear in MVP UI or stay deferred

Not open anymore:
- one main active session screen
- inline exercise expansion
- move-down-first reorder approach
- profile/settings combined for MVP
- no bloated destructive controls in the core logging surface
# Screen Inventory v0.1

## Goal
List the minimum screens and main UI surfaces required to ship the MVP.

## 1. Auth screens
### 1.1 Sign up
Purpose:
- create account

Main elements:
- email
- password
- submit action
- link to sign in

### 1.2 Sign in
Purpose:
- access existing account

Main elements:
- email
- password
- submit action
- link to sign up

## 2. Onboarding / basic setup
### 2.1 Basic profile setup
Purpose:
- collect essential profile data without blocking usage

Main elements:
- name
- age
- sex
- height
- weight
- continue action
- skip optional fields behavior

### 2.2 Unit settings
Purpose:
- define measurement preferences early

Main elements:
- weight unit
- measurement unit
- save / continue action

## 3. Home / templates overview
### 3.1 Workout templates list
Purpose:
- show saved workout days / templates
- allow starting or editing a template

Main elements:
- list of templates
- create template action
- start session action
- edit template action

## 4. Template management
### 4.1 Create / edit template
Purpose:
- create a workout day and organize its exercises

Main elements:
- template name
- optional description
- exercise list
- add exercise action
- reorder exercises
- remove exercise action
- save template action

### 4.2 Exercise picker
Purpose:
- add exercises to a template from library or custom exercises

Main elements:
- search
- filter
- built-in exercise results
- custom exercise results
- select action
- create custom exercise action

### 4.3 Custom exercise creation
Purpose:
- create a user-owned exercise when needed

Main elements:
- name
- optional structured fields
- save action

## 5. Session flow
### 5.1 Active session overview
Purpose:
- show current session and all session exercises
- let user move through the workout quickly

Main elements:
- session title
- in-progress state
- ordered exercise list
- current progress indicator
- complete session action

### 5.2 Exercise logging view
Purpose:
- log performance for one exercise with minimal friction

Main elements:
- exercise identity
- previous performance summary
- current sets
- add set action
- add warm-up set action
- set inputs for reps and weight
- last set summary as primary
- expand to show all sets
- exercise notes

### 5.3 Session edit controls
Purpose:
- allow runtime changes without affecting template

Main elements:
- add exercise
- remove exercise
- reorder exercise
- skip exercise

### 5.4 Session completion
Purpose:
- finalize the workout session

Main elements:
- complete session action
- completion confirmation
- completed state feedback

## 6. History surface
### 6.1 Session history / completed sessions
Purpose:
- allow viewing past completed workouts
- support previous-performance lookup and user review

Main elements:
- completed session list
- session date
- template name
- open session details

### 6.2 Session detail
Purpose:
- inspect a completed workout

Main elements:
- session metadata
- exercise list
- set history
- notes if present

## 7. Settings / profile
### 7.1 Profile screen
Purpose:
- view and edit basic profile data

Main elements:
- name
- age
- sex
- height
- weight
- save action

### 7.2 Settings screen
Purpose:
- edit minimal MVP preferences

Main elements:
- weight unit
- measurement unit
- save action

## Notes
- the exercise logging view is the highest-priority screen in the product
- template and session editing must feel clearly different
- history should exist, but not dominate MVP scope
- analytics dashboards are intentionally excluded
# Current Decisions Addendum v0.1

This addendum overrides older assumptions where needed.

## Newer locked decisions

### Access / onboarding
- Visitor-first usage is allowed.
- Signup/login should not block first use.
- Non-essential information must not be mandatory.
- Basic profile and units should stay lightweight.
- Profile + Settings can be treated as one combined low-priority MVP area.

### Active session structure
- Active session is one main screen.
- Exercise interaction inside active session uses inline expand.
- The app should stay on the active session screen unless the user leaves/closes it.
- No special homepage resume UX should be designed right now.
- Autosave/restore still exists, but resume UX is not a design focus yet.

### Active session actions
- The only reorder control to prioritize first is a lightweight "move down 1" action.
- Add exercise during session may exist, but should stay visually secondary.
- Remove exercise should not be promoted in the main active session UI.
- Skip exercise should not be promoted in the main active session UI.
- Completion should exist, but not as a heavyweight separate flow.

### Product direction reminder
- Keep the active training flow tighter than the planning/admin flow.
- Avoid bloating the live session UI with destructive or rarely used actions.
- Use the minimum surface area needed to support real gym usage.

## Implications
- Older screen drafts that split session flow into overview/logging/edit/completion should be considered superseded.
- Older onboarding assumptions that imply signup-first should be considered superseded.
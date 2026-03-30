import { sqliteTable, text, integer, real } from 'drizzle-orm/sqlite-core';

/** Abstract local identity. One per device in MVP (visitor-backed). */
export const owners = sqliteTable('owners', {
  id: text('id').primaryKey(),
  createdAt: text('createdAt').notNull(),
  updatedAt: text('updatedAt').notNull(),
});

/** Personal info for the owner. 1:1 with Owner. All fields optional. */
export const profiles = sqliteTable('profiles', {
  id: text('id').primaryKey(),
  ownerId: text('ownerId')
    .notNull()
    .references(() => owners.id),
  name: text('name'),
  age: integer('age'),
  sex: text('sex'),
  height: real('height'),
  weight: real('weight'),
  createdAt: text('createdAt').notNull(),
  updatedAt: text('updatedAt').notNull(),
});

/** App preferences for the owner. weightUnit and measurementUnit always have defaults ('kg', 'cm'). */
export const userSettings = sqliteTable('userSettings', {
  id: text('id').primaryKey(),
  ownerId: text('ownerId')
    .notNull()
    .references(() => owners.id),
  weightUnit: text('weightUnit').notNull(),
  measurementUnit: text('measurementUnit').notNull(),
  createdAt: text('createdAt').notNull(),
  updatedAt: text('updatedAt').notNull(),
});

/** Built-in exercise dataset (read-only, seeded once from JSON). No timestamps — data never changes. */
export const exerciseLibraryItems = sqliteTable('exerciseLibraryItems', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  forceType: text('forceType'),
  level: text('level'),
  mechanic: text('mechanic'),
  equipment: text('equipment'),
  primaryMuscles: text('primaryMuscles').notNull(),
  secondaryMuscles: text('secondaryMuscles').notNull(),
  instructions: text('instructions').notNull(),
  category: text('category').notNull(),
  images: text('images').notNull(),
});

/** User-created exercises. Same shape as library items but user-owned, mutable, and mostly nullable. */
export const customExercises = sqliteTable('customExercises', {
  id: text('id').primaryKey(),
  ownerId: text('ownerId')
    .notNull()
    .references(() => owners.id),
  name: text('name').notNull(),
  forceType: text('forceType'),
  level: text('level'),
  mechanic: text('mechanic'),
  equipment: text('equipment'),
  primaryMuscles: text('primaryMuscles'),
  secondaryMuscles: text('secondaryMuscles'),
  instructions: text('instructions'),
  category: text('category'),
  createdAt: text('createdAt').notNull(),
  updatedAt: text('updatedAt').notNull(),
});

/** Saved workout routine (planning data). Snapshot into a session on start — session changes never mutate the template. */
export const workoutTemplates = sqliteTable('workoutTemplates', {
  id: text('id').primaryKey(),
  ownerId: text('ownerId')
    .notNull()
    .references(() => owners.id),
  name: text('name').notNull(),
  description: text('description'),
  createdAt: text('createdAt').notNull(),
  updatedAt: text('updatedAt').notNull(),
});

/** Exercise entry inside a template. Polymorphic ref: sourceType ('library'|'custom') determines which table exerciseRefId points to. */
export const workoutTemplateExercises = sqliteTable('workoutTemplateExercises', {
  id: text('id').primaryKey(),
  workoutTemplateId: text('workoutTemplateId')
    .notNull()
    .references(() => workoutTemplates.id),
  orderIndex: integer('orderIndex').notNull(),
  sourceType: text('sourceType').notNull(),
  exerciseRefId: text('exerciseRefId').notNull(),
  note: text('note'),
  createdAt: text('createdAt').notNull(),
  updatedAt: text('updatedAt').notNull(),
});

/** One execution of a template. status drives the UI: 'in_progress' = active session, 'completed' = history. */
export const workoutSessions = sqliteTable('workoutSessions', {
  id: text('id').primaryKey(),
  ownerId: text('ownerId')
    .notNull()
    .references(() => owners.id),
  workoutTemplateId: text('workoutTemplateId')
    .notNull()
    .references(() => workoutTemplates.id),
  status: text('status').notNull(),
  startedAt: text('startedAt').notNull(),
  completedAt: text('completedAt'),
  createdAt: text('createdAt').notNull(),
  updatedAt: text('updatedAt').notNull(),
});

/** Exercise instance inside a session (execution data). sourceTemplateExerciseId is nullable for ad-hoc exercises added during the session. */
export const workoutSessionExercises = sqliteTable('workoutSessionExercises', {
  id: text('id').primaryKey(),
  workoutSessionId: text('workoutSessionId')
    .notNull()
    .references(() => workoutSessions.id),
  sourceTemplateExerciseId: text('sourceTemplateExerciseId').references(
    () => workoutTemplateExercises.id,
  ),
  orderIndex: integer('orderIndex').notNull(),
  sourceType: text('sourceType').notNull(),
  exerciseRefId: text('exerciseRefId').notNull(),
  note: text('note'),
  wasSkipped: integer('wasSkipped', { mode: 'boolean' }).notNull(),
  createdAt: text('createdAt').notNull(),
  updatedAt: text('updatedAt').notNull(),
});

/** One logged set. completedAt is null until the user marks it done — this distinguishes planned vs. completed sets. */
export const setEntries = sqliteTable('setEntries', {
  id: text('id').primaryKey(),
  workoutSessionExerciseId: text('workoutSessionExerciseId')
    .notNull()
    .references(() => workoutSessionExercises.id),
  orderIndex: integer('orderIndex').notNull(),
  setType: text('setType').notNull(),
  reps: integer('reps').notNull(),
  weight: real('weight').notNull(),
  completedAt: text('completedAt'),
  createdAt: text('createdAt').notNull(),
  updatedAt: text('updatedAt').notNull(),
});

/** Optional free-text note attached to a session. Separated so sessions without notes don't carry an empty column. */
export const sessionNotes = sqliteTable('sessionNotes', {
  id: text('id').primaryKey(),
  workoutSessionId: text('workoutSessionId')
    .notNull()
    .references(() => workoutSessions.id),
  content: text('content').notNull(),
  createdAt: text('createdAt').notNull(),
  updatedAt: text('updatedAt').notNull(),
});

/** Combined schema for Drizzle's relational query API (db.query.tableName.findMany()). */
export const schema = {
  owners,
  profiles,
  userSettings,
  exerciseLibraryItems,
  customExercises,
  workoutTemplates,
  workoutTemplateExercises,
  workoutSessions,
  workoutSessionExercises,
  setEntries,
  sessionNotes,
};

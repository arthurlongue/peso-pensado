/** Initial migration — creates all 11 tables. */
const sql = `CREATE TABLE \`customExercises\` (
	\`id\` text PRIMARY KEY NOT NULL,
	\`ownerId\` text NOT NULL,
	\`name\` text NOT NULL,
	\`forceType\` text,
	\`level\` text,
	\`mechanic\` text,
	\`equipment\` text,
	\`primaryMuscles\` text,
	\`secondaryMuscles\` text,
	\`instructions\` text,
	\`category\` text,
	\`createdAt\` text NOT NULL,
	\`updatedAt\` text NOT NULL,
	FOREIGN KEY (\`ownerId\`) REFERENCES \`owners\`(\`id\`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE \`exerciseLibraryItems\` (
	\`id\` text PRIMARY KEY NOT NULL,
	\`name\` text NOT NULL,
	\`forceType\` text,
	\`level\` text,
	\`mechanic\` text,
	\`equipment\` text,
	\`primaryMuscles\` text NOT NULL,
	\`secondaryMuscles\` text NOT NULL,
	\`instructions\` text NOT NULL,
	\`category\` text NOT NULL,
	\`images\` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE \`owners\` (
	\`id\` text PRIMARY KEY NOT NULL,
	\`createdAt\` text NOT NULL,
	\`updatedAt\` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE \`profiles\` (
	\`id\` text PRIMARY KEY NOT NULL,
	\`ownerId\` text NOT NULL,
	\`name\` text,
	\`age\` integer,
	\`sex\` text,
	\`height\` real,
	\`weight\` real,
	\`createdAt\` text NOT NULL,
	\`updatedAt\` text NOT NULL,
	FOREIGN KEY (\`ownerId\`) REFERENCES \`owners\`(\`id\`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE \`sessionNotes\` (
	\`id\` text PRIMARY KEY NOT NULL,
	\`workoutSessionId\` text NOT NULL,
	\`content\` text NOT NULL,
	\`createdAt\` text NOT NULL,
	\`updatedAt\` text NOT NULL,
	FOREIGN KEY (\`workoutSessionId\`) REFERENCES \`workoutSessions\`(\`id\`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE \`setEntries\` (
	\`id\` text PRIMARY KEY NOT NULL,
	\`workoutSessionExerciseId\` text NOT NULL,
	\`orderIndex\` integer NOT NULL,
	\`setType\` text NOT NULL,
	\`reps\` integer NOT NULL,
	\`weight\` real NOT NULL,
	\`completedAt\` text,
	\`createdAt\` text NOT NULL,
	\`updatedAt\` text NOT NULL,
	FOREIGN KEY (\`workoutSessionExerciseId\`) REFERENCES \`workoutSessionExercises\`(\`id\`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE \`userSettings\` (
	\`id\` text PRIMARY KEY NOT NULL,
	\`ownerId\` text NOT NULL,
	\`weightUnit\` text NOT NULL,
	\`measurementUnit\` text NOT NULL,
	\`createdAt\` text NOT NULL,
	\`updatedAt\` text NOT NULL,
	FOREIGN KEY (\`ownerId\`) REFERENCES \`owners\`(\`id\`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE \`workoutSessionExercises\` (
	\`id\` text PRIMARY KEY NOT NULL,
	\`workoutSessionId\` text NOT NULL,
	\`sourceTemplateExerciseId\` text,
	\`orderIndex\` integer NOT NULL,
	\`sourceType\` text NOT NULL,
	\`exerciseRefId\` text NOT NULL,
	\`note\` text,
	\`wasSkipped\` integer NOT NULL,
	\`createdAt\` text NOT NULL,
	\`updatedAt\` text NOT NULL,
	FOREIGN KEY (\`workoutSessionId\`) REFERENCES \`workoutSessions\`(\`id\`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (\`sourceTemplateExerciseId\`) REFERENCES \`workoutTemplateExercises\`(\`id\`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE \`workoutSessions\` (
	\`id\` text PRIMARY KEY NOT NULL,
	\`ownerId\` text NOT NULL,
	\`workoutTemplateId\` text NOT NULL,
	\`status\` text NOT NULL,
	\`startedAt\` text NOT NULL,
	\`completedAt\` text,
	\`createdAt\` text NOT NULL,
	\`updatedAt\` text NOT NULL,
	FOREIGN KEY (\`ownerId\`) REFERENCES \`owners\`(\`id\`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (\`workoutTemplateId\`) REFERENCES \`workoutTemplates\`(\`id\`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE \`workoutTemplateExercises\` (
	\`id\` text PRIMARY KEY NOT NULL,
	\`workoutTemplateId\` text NOT NULL,
	\`orderIndex\` integer NOT NULL,
	\`sourceType\` text NOT NULL,
	\`exerciseRefId\` text NOT NULL,
	\`note\` text,
	\`createdAt\` text NOT NULL,
	\`updatedAt\` text NOT NULL,
	FOREIGN KEY (\`workoutTemplateId\`) REFERENCES \`workoutTemplates\`(\`id\`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE \`workoutTemplates\` (
	\`id\` text PRIMARY KEY NOT NULL,
	\`ownerId\` text NOT NULL,
	\`name\` text NOT NULL,
	\`description\` text,
	\`createdAt\` text NOT NULL,
	\`updatedAt\` text NOT NULL,
	FOREIGN KEY (\`ownerId\`) REFERENCES \`owners\`(\`id\`) ON UPDATE no action ON DELETE no action
);`;

export default sql;

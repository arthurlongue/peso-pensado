/**
 * Generates a random UUID v4 string for use as a primary key.
 * Uses the Web Crypto API, available in React Native runtimes.
 */
export function generateId(): string {
  return crypto.randomUUID();
}

/**
 * Returns the current UTC time as an ISO 8601 string.
 * Used for all `createdAt` / `updatedAt` columns in the schema.
 */
export function nowISO(): string {
  return new Date().toISOString();
}

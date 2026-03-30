/**
 * Web intentionally does not bootstrap the native SQLite layer.
 *
 * The app can still render via repository-level fallbacks that read bundled data
 * or disable native-only features until a dedicated web persistence strategy exists.
 */
export async function initializeDatabase(): Promise<void> {
  return;
}

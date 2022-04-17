export interface Sync {
  exec: (forceLoad?: boolean) => Promise<void>
}

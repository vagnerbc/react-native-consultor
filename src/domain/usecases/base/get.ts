export interface Get<T> {
  exec: () => Promise<T[]>
}

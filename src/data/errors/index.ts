export interface ErrorEvent<T, R> {
  dispatch(error: T): void
  subscribe(callback: (data: R) => void): void
  unsubscribe(): void
}

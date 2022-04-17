import { Repository, Entity } from '..'

export class RepositoryMock implements Repository {
  saveMany(): Promise<void> {
    return Promise.resolve()
  }

  saveOne<T>(): Promise<T> {
    return Promise.resolve({} as Entity<T>)
  }

  save(): Promise<void> {
    return Promise.resolve()
  }

  getAll<T>(): Promise<T[]> {
    return Promise.resolve([])
  }

  getByFilter<T>(): Promise<T[]> {
    return Promise.resolve([])
  }

  delete(): Promise<void> {
    return Promise.resolve()
  }

  clear(): Promise<void> {
    return Promise.resolve()
  }
}

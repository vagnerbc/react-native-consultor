import { SyncEntities } from '../../domain/models'
import { DBTables } from '../models/tables'

export type Entity<T> = T & {
  id?: number
  indexed_id?: number
}

export type OptionalFields<T> = {
  [Property in keyof T]?: T[Property]
}

export type UpdateFields<T> = Entity<OptionalFields<T>>

export type SetModel = {
  [Property in keyof SyncEntities]?: UpdateFields<SyncEntities[Property]>[]
}

export type Delete = {
  ids?: string[]
  indexedIds?: number[]
}

export interface Repository {
  saveMany(data: SetModel): Promise<void>

  save<T>(tableName: DBTables, data: UpdateFields<T>[]): Promise<void>

  saveOne<T>(tableName: DBTables, data: UpdateFields<T>): Promise<Entity<T>>

  getAll<T>(tableName: DBTables): Promise<Entity<T>[]>

  getByFilter<T>(
    tableName: DBTables,
    filter?: OptionalFields<T>
  ): Promise<Entity<T>[]>

  delete(tableName: DBTables, deletion: Delete): Promise<void>

  clear(tableName: DBTables): Promise<void>
}

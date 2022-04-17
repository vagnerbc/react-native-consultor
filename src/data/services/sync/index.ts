import { SyncEntities } from '../../../domain/models'
import { Entity } from '../../db'
import { DBTables } from '../../models/tables'

export type SendFields<T> = {
  [Property in keyof T]?: T[Property]
}

export type SetModel = {
  updated: {
    [Property in keyof SyncEntities]?: Entity<
      SendFields<SyncEntities[Property]>
    >[]
  }
  deleted: {
    [Table in DBTables]?: string[]
  }
}

export type SyncFailure = {
  failures: {
    updated: {
      [Property in keyof SyncEntities]?: Entity<SyncEntities[Property]>[]
    }
    deleted: {
      [Table in DBTables]?: string[]
    }
  }
}

export type GetModel = {
  updated: {
    [Property in keyof SyncEntities]: SyncEntities[Property][]
  }
  deleted: {
    [Table in DBTables]: string[]
  }
  last_sync: string
}

export interface Sync {
  getSync(reference?: string | null): Promise<GetModel>

  sendSync(data: SetModel): Promise<SyncFailure | undefined>
}

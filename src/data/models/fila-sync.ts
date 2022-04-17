import { Entity } from '../db'

import { DBTables } from './tables'

export type FilaSyncModel<T = any> = {
  ['entity']: DBTables
  ['data']: {
    updated: Entity<T>[]
    deleted: string[]
  }
  ['indexed_id']?: number
}

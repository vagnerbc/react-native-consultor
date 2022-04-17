import Reaml from 'realm'

import {
  UpdateFields,
  Repository,
  OptionalFields,
  SetModel,
  Entity,
  Delete
} from '../../../data/db'
import { DBTables } from '../../../data/models/tables'
import { SyncEntities } from '../../../domain/models'
import { RealmDB } from './config'

export class ReamlRepository implements Repository {
  private dbname = ''

  constructor(dbname: string) {
    this.dbname = dbname
  }

  async Realm() {
    return await RealmDB.getInstance(this.dbname)
  }

  async saveMany(data: SetModel): Promise<void> {
    const promises = Object.keys(data).map(async tableName => {
      const name = tableName as DBTables
      const saveData = data[name] as UpdateFields<SyncEntities[typeof name]>[]
      return await this.save<SyncEntities[typeof name]>(name, saveData)
    })

    await Promise.all(promises)
  }

  async save<T>(tableName: DBTables, data: UpdateFields<T>[]): Promise<void> {
    const ids = data.map(entity => entity.id)

    const realm = await this.Realm()

    realm.write(() => {
      const objects: Realm.Results<T> = realm.objects(tableName) // search for a realm object with a primary key that is an int.

      realm.delete(objects.filter((entity: any) => ids.includes(entity.id)))

      const entities: Entity<T>[] = objects.filter((entity: any) =>
        ids.includes(entity.id)
      )

      const indexedIdMap = new Map(
        entities.map(entity => [entity.id, entity.indexed_id])
      )

      const entitiesToSave = data.map(entity => ({
        ...entity,
        indexed_id: indexedIdMap.get(entity.id) || entity.indexed_id
      }))

      return entitiesToSave.map(entity => realm.create(tableName, entity))
    })
  }

  async saveOne<T>(
    tableName: DBTables,
    changes: UpdateFields<T>
  ): Promise<Entity<T>> {
    const realm = await this.Realm()

    const objects: Reaml.Results<T> = realm.objects(tableName)

    return realm.write(() => {
      const indexed_id = realm.create(tableName, changes)

      const db = objects.filtered(
        'indexed_id == $0',
        changes.indexed_id || indexed_id
      )

      if (changes.id) {
        db.filtered('id == $0', changes.id)
      }

      const entity: Entity<T> = Array.from(db).shift()

      return { ...entity, indexed_id: indexed_id as unknown as number }
    })
  }

  async getAll<T>(tableName: DBTables): Promise<Entity<T>[]> {
    const realm = await this.Realm()

    const objects: Reaml.Results<T> = realm.objects(tableName)

    return Array.from(objects)
  }

  async getByFilter<T>(
    tableName: DBTables,
    filter?: OptionalFields<T>
  ): Promise<Entity<T>[]> {
    const realm = await this.Realm()

    const objects: Realm.Results<T> = realm.objects(tableName)
    if (!filter) {
      return Array.from(objects)
    }
    return Array.from(objects)
  }

  async delete(tableName: DBTables, deletion: Delete): Promise<void> {
    const realm = await this.Realm()

    const objects = realm.objects(tableName)

    realm.write(() => {
      if (deletion.ids && deletion.ids.length > 0) {
        realm.delete(
          objects.filter((entity: any) =>
            (deletion.ids || []).includes(String(entity.id))
          )
        )
      }

      if (deletion.indexedIds && deletion.indexedIds.length > 0) {
        realm.delete(
          objects.filter((entity: any) =>
            (deletion.indexedIds || []).includes(entity.indexedIds)
          )
        )
      }
    })
  }

  async clear(tableName: DBTables) {
    const realm = await this.Realm()

    realm.deleteModel(tableName)
  }
}

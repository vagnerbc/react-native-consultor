import { DBTables } from '../models/tables'

import {
  Repository as IRepository,
  OptionalFields,
  UpdateFields,
  Entity,
  SetModel,
  Delete
} from '.'

export class Repository {
  protected readonly repository: IRepository

  constructor(repository: IRepository) {
    this.repository = repository
  }

  async saveMany(data: SetModel) {
    return await this.repository.saveMany(data)
  }

  async save<T>(tableName: DBTables, data: UpdateFields<T>[]) {
    return await this.repository.save<T>(tableName, data)
  }

  async saveOne<T>(tableName: DBTables, data: UpdateFields<T>) {
    return await this.repository.saveOne<T>(tableName, data)
  }

  async getAll<T>(tableName: DBTables) {
    return await this.repository.getAll<T>(tableName)
  }

  async getByFilter<T>(
    tableName: DBTables,
    filter?: OptionalFields<T>
  ): Promise<Entity<T>[]> {
    return await this.repository.getByFilter(tableName, filter)
  }

  async delete(tableName: DBTables, deletion: Delete) {
    await this.repository.delete(tableName, deletion)
  }

  async clear(tableName: DBTables) {
    await this.repository.clear(tableName)
  }
}

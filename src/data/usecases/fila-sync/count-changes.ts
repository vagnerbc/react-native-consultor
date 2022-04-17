import { SyncEntities } from '../../../domain/models'
import { BaseCountChanges } from '../../../domain/usecases/base/count-changes'
import { Repository } from '../../db/repository'
import { FilaSyncModel } from '../../models/fila-sync'
import { DBSchemaAndIndexes, DBTables } from '../../models/tables'

export const syncEntities = Object.keys(DBSchemaAndIndexes) as DBTables[]

export class RepoCountChanges implements BaseCountChanges {
  constructor(protected readonly repository: Repository) {
    this.repository = repository
  }

  async exec(): Promise<number> {
    let count = 0

    const promises = syncEntities.map(async entity => {
      const [fila] = await this.repository.getByFilter<
        FilaSyncModel<SyncEntities[typeof entity]>
      >('fila_sync', { entity })

      if (!fila) return

      count += fila.data.updated.length + fila.data.deleted.length
    })

    await Promise.all(promises)

    return count
  }
}

import { Delete } from '../../../domain/usecases/base/delete'
import { Repository } from '../../db/repository'
import { FilaSyncModel } from '../../models/fila-sync'
import { DBTables } from '../../models/tables'

export class RepoDelete implements Delete {
  constructor(
    private readonly tableName: DBTables,
    private readonly repository: Repository
  ) {
    this.tableName = tableName
    this.repository = repository
  }

  async exec(id: number) {
    const [fila] = await this.repository.getByFilter<FilaSyncModel>(
      'fila_sync',
      {
        entity: this.tableName
      }
    )

    const [entity] = await this.repository.getByFilter(this.tableName, { id })

    const deleted = [...(fila.data.deleted || [])]

    if (deleted.includes(String(id))) return entity.indexed_id || id

    deleted.push(String(id))

    await this.repository.saveOne<FilaSyncModel>('fila_sync', {
      ...fila,
      data: {
        deleted,
        updated: fila.data.updated || []
      }
    })

    return entity.indexed_id || id
  }
}

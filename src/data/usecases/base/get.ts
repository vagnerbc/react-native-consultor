import { Get } from '../../../domain/usecases/base/get'
import { Repository } from '../../db/repository'
import { FilaSyncModel } from '../../models/fila-sync'
import { DBTables } from '../../models/tables'

export class GetFromRepo<T> implements Get<T> {
  constructor(
    private readonly tableName: DBTables,
    private readonly repository: Repository
  ) {
    this.tableName = tableName
    this.repository = repository
  }

  async exec(): Promise<T[]> {
    const [fila] = await this.repository.getByFilter<FilaSyncModel>(
      'fila_sync',
      { entity: this.tableName }
    )

    const entities = await this.repository.getAll<T>(this.tableName)

    const deleted = fila.data.deleted.map(id => Number(id))

    return entities
      .filter(entity => entity.id && !deleted.includes(entity.id))
      .map(entity => {
        // Verifica se a entidade ja existe na fila de sync
        const updatedEntity = fila.data.updated.find(
          updated =>
            updated.id === entity.id || updated.indexed_id === entity.indexed_id
        )

        if (!updatedEntity) return entity

        // Retorna a entidade atualizada com as ultimas alterações salvas na fila de sync
        return { ...entity, ...updatedEntity }
      })
  }
}

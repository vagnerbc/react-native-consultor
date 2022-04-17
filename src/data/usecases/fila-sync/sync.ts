import { SyncEntities } from '../../../domain/models'
import { Sync } from '../../../domain/usecases/fila-sync/sync'
import { makeLocalStorageAdapter } from '../../../main/factories/cache/local-storage-adapter-factory'
import { removeEmptyAttributes } from '../../../utils/array'
import { Entity } from '../../db'
import { Repository } from '../../db/repository'
import { FilaSyncModel } from '../../models/fila-sync'
import { DBSchemaAndIndexes, DBTables } from '../../models/tables'
import { SetModel, SyncFailure } from '../../services/sync'
import { SyncService } from '../../services/sync/sync'

export const syncEntidades = Object.keys(DBSchemaAndIndexes) as DBTables[]
const localStorageAdapter = makeLocalStorageAdapter()

export class RemoteFilaSync implements Sync {
  constructor(
    private readonly syncService: SyncService,
    private readonly repository: Repository
  ) {
    this.syncService = syncService
    this.repository = repository
  }

  async createFilas() {
    const promises = syncEntidades.map(async entity => {
      const [fila] = await this.repository.getByFilter<
        FilaSyncModel<SyncEntities[typeof entity]>
      >('fila_sync', { entity })

      if (fila || entity === 'fila_sync') return

      return await this.repository.saveOne<FilaSyncModel>('fila_sync', {
        entity,
        data: {
          updated: [],
          deleted: []
        }
      })
    })

    await Promise.all(promises)
  }

  async getAlteracoes() {
    const alteracoes: SetModel = {
      updated: {},
      deleted: {}
    }

    const promises = syncEntidades.map(async entity => {
      if (entity === 'fila_sync') return

      alteracoes.updated[entity] = []
      alteracoes.deleted[entity] = []

      const [fila] = await this.repository.getByFilter<
        FilaSyncModel<SyncEntities[typeof entity]>
      >('fila_sync', { entity })

      alteracoes.updated[entity] = removeEmptyAttributes(
        fila.data.updated
      ) as any
      alteracoes.deleted[entity] = fila.data.deleted
    })

    await Promise.all(promises)

    return alteracoes
  }

  hasAlteracoes(alteracoes: SetModel) {
    const qtdeAtualizacoes = Object.keys(alteracoes.updated).reduce(
      (acc, key) => {
        const updated = alteracoes.updated?.[key as DBTables] || []
        return acc + updated.length
      },
      0
    )

    const qtdeDelecoes = Object.keys(alteracoes.deleted).reduce((acc, key) => {
      const deleted = alteracoes.deleted?.[key as DBTables] || []
      return acc + deleted.length
    }, 0)

    return qtdeAtualizacoes > 0 || qtdeDelecoes > 0
  }

  async removeAlteracoes(alteracoes: SetModel, erro?: SyncFailure) {
    const entidadesAlteradas = syncEntidades.filter(
      entity => alteracoes.updated?.[entity] || alteracoes.deleted?.[entity]
    )

    const promises = entidadesAlteradas.map(async entity => {
      const [fila] = await this.repository.getByFilter<
        FilaSyncModel<Entity<SyncEntities[typeof entity]>>
      >('fila_sync', { entity })

      const novaFila = { ...fila, data: { ...fila.data } }

      const delecoes = alteracoes.deleted[entity] || []
      const atualizacoes = alteracoes.updated[entity] || []

      const errosAtualizacao = erro?.failures?.updated?.[entity] || []
      const errosDelecao = erro?.failures?.deleted?.[entity] || []

      if (delecoes.length > 0) {
        novaFila.data.deleted = novaFila.data.deleted.filter(
          id => !delecoes.includes(id) && !errosDelecao.includes(id)
        )
      }

      if (atualizacoes.length > 0) {
        const atualizacoesIds = atualizacoes.map(updated => updated.id)
        const erroAtualizacoesIds = errosAtualizacao.map(updated => updated.id)

        novaFila.data.updated = novaFila.data.updated.filter(
          updated =>
            !atualizacoesIds.includes(updated.id) &&
            !erroAtualizacoesIds.includes(updated.id)
        )
      }

      return await this.repository.saveOne<FilaSyncModel>('fila_sync', novaFila)
    })

    await Promise.all(promises)
  }

  async getSync(): Promise<void> {
    try {
      const entidadesAlteradas: typeof syncEntidades = []
      localStorageAdapter.set('sync_changes', '[]')

      const reference = localStorageAdapter.get('last_sync')
      const response = await this.syncService.getSync(reference)

      const chavesAtualizadas = Object.keys(response.updated) as DBTables[]
      const chavesDeletadas = Object.keys(response.deleted) as DBTables[]

      localStorageAdapter.set('last_sync', response.last_sync)

      const atualizacoes = chavesAtualizadas.map(async entity => {
        if (response.updated[entity].length === 0) return
        entidadesAlteradas.push(entity)

        return await this.repository.save<SyncEntities[typeof entity]>(
          entity,
          response.updated[entity]
        )
      })

      const delecoes = chavesDeletadas.map(async entity => {
        if (response.deleted[entity].length === 0) return
        entidadesAlteradas.push(entity)

        return await this.repository.delete(entity, {
          ids: response.deleted[entity]
        })
      })

      localStorageAdapter.set(
        'sync_changes',
        JSON.stringify(entidadesAlteradas)
      )

      await Promise.all(atualizacoes)
      await Promise.all(delecoes)
    } catch (error) {}
  }

  async sendSync(): Promise<void> {
    try {
      await this.createFilas()
      const alteracoes = await this.getAlteracoes()
      const hasAlteracoes = this.hasAlteracoes(alteracoes)

      if (hasAlteracoes) {
        const response = await this.syncService.sendSync(alteracoes)
        await this.removeAlteracoes(alteracoes, response)
      }
    } catch (error) {}
  }

  async exec(): Promise<void> {
    await this.sendSync()
    await this.getSync()
  }
}

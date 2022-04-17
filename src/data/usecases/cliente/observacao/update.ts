import { ClienteObservacaoModel } from '../../../../domain/models/cliente'
import { Update } from '../../../../domain/usecases/cliente/observacao/update'
import { Entity } from '../../../db'
import { Repository } from '../../../db/repository'
import { RemoteClienteObservacaoModel } from '../../../models/cliente'
import { FilaSyncModel } from '../../../models/fila-sync'
import { SendFields } from '../../../services/sync'

type SaveOneFila = FilaSyncModel<SendFields<RemoteClienteObservacaoModel>>
type ClienteObservacaoToSave = SendFields<Entity<RemoteClienteObservacaoModel>>
export class RepoUpdate implements Update {
  constructor(private readonly repository: Repository) {
    this.repository = repository
  }

  stringifyData(data: any) {
    return {
      ...data
    }
  }

  async exec(data: ClienteObservacaoModel) {
    const observacaoASalvar: ClienteObservacaoToSave = {
      id: data.id,
      indexed_id: data.indexed_id,
      observacao: data.observacao
    }

    const [fila] = await this.repository.getByFilter<FilaSyncModel>(
      'fila_sync',
      { entity: 'clienteObservacao' }
    )

    const observacaoSalvo =
      await this.repository.saveOne<RemoteClienteObservacaoModel>(
        'clienteObservacao',
        observacaoASalvar
      )

    const observacaoSalvoComIndexedId = {
      ...observacaoASalvar,
      indexed_id: observacaoSalvo.indexed_id
    }

    const updated = [...(fila?.data?.updated || [])]
    const deleted = fila?.data?.deleted || []

    const updatedIndex = updated.findIndex(
      observacao =>
        observacao.id === observacaoSalvoComIndexedId.id ||
        observacao.indexed_id === observacaoSalvoComIndexedId.indexed_id
    )

    if (updatedIndex >= 0) {
      // Se o observacao já está na fila de atualização, atualiza-o
      const observacao = this.stringifyData({
        ...updated[updatedIndex],
        ...observacaoSalvoComIndexedId
      })
      updated[updatedIndex] = observacao
    } else {
      // Se o observacao não está na fila de atualização, adiciona-o
      const observacao = this.stringifyData({
        ...observacaoSalvoComIndexedId
      })
      updated.push(observacao)
    }

    await this.repository.saveOne<SaveOneFila>('fila_sync', {
      ...fila,
      data: { updated, deleted }
    })

    return observacaoSalvoComIndexedId as ClienteObservacaoModel
  }
}

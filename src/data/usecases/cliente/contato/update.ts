import { ClienteContatoModel } from '../../../../domain/models/cliente'
import { Update } from '../../../../domain/usecases/cliente/contato/update'
import { Entity } from '../../../db'
import { Repository } from '../../../db/repository'
import { RemoteClienteContatoModel } from '../../../models/cliente'
import { FilaSyncModel } from '../../../models/fila-sync'
import { SendFields } from '../../../services/sync'

type SaveOneFila = FilaSyncModel<SendFields<RemoteClienteContatoModel>>
type ClienteContatoToSave = SendFields<Entity<RemoteClienteContatoModel>>
export class RepoUpdate implements Update {
  constructor(private readonly repository: Repository) {
    this.repository = repository
  }

  stringifyData(data: any) {
    return {
      ...data
    }
  }

  async exec(data: ClienteContatoModel) {
    const contatoASalvar: ClienteContatoToSave = {
      id: data.id,
      email: data.email,
      telefone: data.telefone,
      principal: data.principal,
      whatsapp: data.whatsapp,
      responsavel: data.responsavel,
      indexed_id: data.indexed_id
    }

    const [fila] = await this.repository.getByFilter<FilaSyncModel>(
      'fila_sync',
      { entity: 'clienteContato' }
    )

    const contatoSalvo =
      await this.repository.saveOne<RemoteClienteContatoModel>(
        'clienteContato',
        contatoASalvar
      )

    const contatoSalvoComIndexedId = {
      ...contatoASalvar,
      indexed_id: contatoSalvo.indexed_id
    }

    const updated = [...(fila?.data?.updated || [])]
    const deleted = fila?.data?.deleted || []

    const updatedIndex = updated.findIndex(
      contato =>
        contato.id === contatoSalvoComIndexedId.id ||
        contato.indexed_id === contatoSalvoComIndexedId.indexed_id
    )

    if (updatedIndex >= 0) {
      // Se o contato já está na fila de atualização, atualiza-o
      const contato = this.stringifyData({
        ...updated[updatedIndex],
        ...contatoSalvoComIndexedId
      })
      updated[updatedIndex] = contato
    } else {
      // Se o contato não está na fila de atualização, adiciona-o
      const contato = this.stringifyData({
        ...contatoSalvoComIndexedId
      })
      updated.push(contato)
    }

    await this.repository.saveOne<SaveOneFila>('fila_sync', {
      ...fila,
      data: { updated, deleted }
    })

    return contatoSalvoComIndexedId as ClienteContatoModel
  }
}

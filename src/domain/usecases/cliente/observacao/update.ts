import { Entity } from '../../../../data/db'
import { SendFields } from '../../../../data/services/sync'
import { ClienteObservacaoModel } from '../../../models/cliente'

export interface Update {
  exec(
    observacao: SendFields<ClienteObservacaoModel>
  ): Promise<Entity<SendFields<ClienteObservacaoModel>>>
}

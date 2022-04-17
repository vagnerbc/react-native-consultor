import { Entity } from '../../../../data/db'
import { SendFields } from '../../../../data/services/sync'
import { ClienteContatoModel } from '../../../models/cliente'

export interface Update {
  exec(
    contato: SendFields<ClienteContatoModel>
  ): Promise<Entity<SendFields<ClienteContatoModel>>>
}

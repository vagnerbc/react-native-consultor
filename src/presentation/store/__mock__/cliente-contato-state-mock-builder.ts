import { ClienteContatoModel } from 'domain/models/cliente'

import { initialState, State } from '../ducks/cliente/contato'

export class ClienteContatoStateMockBuilder {
  private contatos: ClienteContatoModel[] = []

  withContatos(value: ClienteContatoModel[]) {
    this.contatos = value
    return this
  }

  build(): State {
    return { ...initialState, contatos: this.contatos }
  }
}

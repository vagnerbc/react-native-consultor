import { ClienteModel } from 'domain/models/cliente'

import { initialState, State } from '../ducks/cliente/index'

export class ClienteStateMockBuilder {
  private clientes: ClienteModel[] = []
  private term = ''

  withClientes(value: ClienteModel[]) {
    this.clientes = value
    return this
  }

  withTerm(value: string) {
    this.term = value
    return this
  }

  build(): State {
    return {
      ...initialState,
      clientes: this.clientes,
      term: this.term
    }
  }
}

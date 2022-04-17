import { ClienteObservacaoModel } from 'domain/models/cliente'

import { initialState, State } from '../ducks/cliente/observacao'

export class ClienteObservacaoStateMockBuilder {
  private observacoes: ClienteObservacaoModel[] = []

  withObservacoes(value: ClienteObservacaoModel[]) {
    this.observacoes = value
    return this
  }

  build(): State {
    return { ...initialState, observacoes: this.observacoes }
  }
}

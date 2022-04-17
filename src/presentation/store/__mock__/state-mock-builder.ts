import { State } from 'presentation/store/ducks'

import { State as ClienteContatoState } from '../ducks/cliente/contato'
import { State as ClienteState } from '../ducks/cliente/index'
import { State as ClienteObservacaoState } from '../ducks/cliente/observacao'
import { State as FilaSyncState } from '../ducks/fila-sync/index'
import { State as ModalState } from '../ducks/modal/index'
import { State as SessionState } from '../ducks/session/index'
import { ClienteContatoStateMockBuilder } from './cliente-contato-state-mock-builder'
import { ClienteObservacaoStateMockBuilder } from './cliente-observacao-state-mock-builder'
import { ClienteStateMockBuilder } from './cliente-state-mock-builder'
import { FilaSyncStateMockBuilder } from './fila-sync-state-mock-builder'
import { ModalStateMockBuilder } from './modal-state-mock-builder'
import { SessionStateMockBuilder } from './session-state-mock-builder'

export class StateMockBuilder {
  private sessionState = new SessionStateMockBuilder().build()

  private modalState = new ModalStateMockBuilder().build()

  private clienteState = new ClienteStateMockBuilder().build()

  private clienteContatoState = new ClienteContatoStateMockBuilder().build()

  private clienteObservacaoState =
    new ClienteObservacaoStateMockBuilder().build()

  private filaSyncState = new FilaSyncStateMockBuilder().build()

  withSessionState(value: SessionState) {
    this.sessionState = value
    return this
  }

  withModalState(value: ModalState) {
    this.modalState = value
    return this
  }

  withClienteState(value: ClienteState) {
    this.clienteState = value
    return this
  }

  withFilaSyncState(value: FilaSyncState) {
    this.filaSyncState = value
    return this
  }

  withClienteContatoState(value: ClienteContatoState) {
    this.clienteContatoState = value
    return this
  }

  withClienteObservacaoState(value: ClienteObservacaoState) {
    this.clienteObservacaoState = value
    return this
  }

  build(): State {
    return {
      session: this.sessionState,
      modal: this.modalState,
      cliente: this.clienteState,
      clienteContato: this.clienteContatoState,
      clienteObservacao: this.clienteObservacaoState,
      filaSync: this.filaSyncState
    }
  }
}

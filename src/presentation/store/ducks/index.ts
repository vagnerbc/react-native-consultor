import { all } from 'redux-saga/effects'

import * as clienteSlice from './cliente'
import * as clienteContatoSlice from './cliente/contato'
import * as clienteObservacaoSlice from './cliente/observacao'
import * as filaSyncSlice from './fila-sync'
import * as modalSlice from './modal'
import * as sessionSlice from './session'

export type State = {
  session: sessionSlice.State
  modal: modalSlice.State
  cliente: clienteSlice.State
  filaSync: filaSyncSlice.State
  clienteContato: clienteContatoSlice.State
  clienteObservacao: clienteObservacaoSlice.State
}

export const reducer = {
  session: sessionSlice.reducer,
  modal: modalSlice.reducer,
  cliente: clienteSlice.reducer,
  filaSync: filaSyncSlice.reducer,
  clienteContato: clienteContatoSlice.reducer,
  clienteObservacao: clienteObservacaoSlice.reducer
}

const fromRepoActions = Object.freeze({
  cliente: clienteSlice.actions
})

export const actions = Object.freeze({
  session: sessionSlice.actions,
  modal: modalSlice.actions,
  filaSync: filaSyncSlice.actions,
  ...fromRepoActions,
  cliente: clienteSlice.actions,
  clienteContato: clienteContatoSlice.actions,
  clienteObservacao: clienteObservacaoSlice.actions
})

export const getFromRepoActions: (keyof typeof fromRepoActions)[] = ['cliente']

export const selectors = Object.freeze({
  session: sessionSlice.selectors,
  modal: modalSlice.selectors,
  cliente: clienteSlice.selectors,
  clienteContato: clienteContatoSlice.selectors,
  clienteObservacao: clienteObservacaoSlice.selectors
})

export const sagas = function* () {
  yield all([...clienteSlice.sagas, ...filaSyncSlice.sagas])
}

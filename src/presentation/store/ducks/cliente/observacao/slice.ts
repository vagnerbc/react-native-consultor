/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { ClienteObservacaoModel } from 'domain/models/cliente'
import { deepMerge } from 'utils/object'

type LoadingStatus = 'pristine' | 'loading' | 'success' | 'failure'

export type State = {
  observacoes: ClienteObservacaoModel[]
  getFromRepoStatus: LoadingStatus
  updateStatus: LoadingStatus
  deleteStatus: LoadingStatus
}

export const initialState: State = {
  observacoes: [],
  getFromRepoStatus: 'pristine',
  updateStatus: 'pristine',
  deleteStatus: 'pristine'
}

const reducers = {
  getFromRepo: (state: State, action: PayloadAction<boolean>) => {
    state.getFromRepoStatus = 'loading'
  },
  getFromRepoSuccess: (
    state: State,
    action: PayloadAction<ClienteObservacaoModel[]>
  ) => {
    state.observacoes = action.payload
    state.getFromRepoStatus = 'success'
  },
  getFromRepoFailure: (state: State) => {
    state.getFromRepoStatus = 'failure'
  },
  update: (state: State, action: PayloadAction<ClienteObservacaoModel>) => {
    state.updateStatus = 'loading'
  },
  updateSuccess: (
    state: State,
    action: PayloadAction<ClienteObservacaoModel>
  ) => {
    const index = state.observacoes.findIndex(
      observacao =>
        observacao.id === action.payload.id ||
        observacao.indexed_id === action.payload.indexed_id
    )

    if (index >= 0) {
      const mergedChanges = deepMerge(state.observacoes[index], action.payload)
      state.observacoes.splice(index, 1, mergedChanges)
    } else {
      state.observacoes.unshift(action.payload)
    }

    state.updateStatus = 'success'
  },
  updateFailure: (state: State) => {
    state.updateStatus = 'failure'
  },
  delete: (state: State, action: PayloadAction<number>) => {
    state.deleteStatus = 'loading'
  },
  deleteSuccess: (state: State, action: PayloadAction<number>) => {
    state.observacoes = state.observacoes.filter(
      observacao =>
        observacao.id !== action.payload ||
        observacao.indexed_id !== action.payload
    )

    state.deleteStatus = 'success'
  },
  deleteFailure: (state: State) => {
    state.deleteStatus = 'failure'
  }
}

const clienteObservacao = createSlice({
  name: 'clienteObservacao',
  initialState,
  reducers
})

export const actions = clienteObservacao.actions
export const reducer = clienteObservacao.reducer

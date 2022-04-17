/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { ClienteContatoModel } from 'domain/models/cliente'
import { deepMerge } from 'utils/object'

type LoadingStatus = 'pristine' | 'loading' | 'success' | 'failure'

export type State = {
  contatos: ClienteContatoModel[]
  getFromRepoStatus: LoadingStatus
  updateStatus: LoadingStatus
  deleteStatus: LoadingStatus
}

export const initialState: State = {
  contatos: [],
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
    action: PayloadAction<ClienteContatoModel[]>
  ) => {
    state.contatos = action.payload
    state.getFromRepoStatus = 'success'
  },
  getFromRepoFailure: (state: State) => {
    state.getFromRepoStatus = 'failure'
  },
  update: (state: State, action: PayloadAction<ClienteContatoModel>) => {
    state.updateStatus = 'loading'
  },
  updateSuccess: (state: State, action: PayloadAction<ClienteContatoModel>) => {
    const index = state.contatos.findIndex(
      contato =>
        contato.id === action.payload.id ||
        contato.indexed_id === action.payload.indexed_id
    )

    if (index >= 0) {
      const mergedChanges = deepMerge(state.contatos[index], action.payload)
      state.contatos.splice(index, 1, mergedChanges)
    } else {
      state.contatos.unshift(action.payload)
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
    state.contatos = state.contatos.filter(
      contato =>
        contato.id !== action.payload || contato.indexed_id !== action.payload
    )

    state.deleteStatus = 'success'
  },
  deleteFailure: (state: State) => {
    state.deleteStatus = 'failure'
  }
}

const clienteContato = createSlice({
  name: 'clienteContato',
  initialState,
  reducers
})

export const actions = clienteContato.actions
export const reducer = clienteContato.reducer

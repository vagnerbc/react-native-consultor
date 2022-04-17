/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { ClienteModel } from 'domain/models/cliente'

type LoadingStatus = 'pristine' | 'loading' | 'success' | 'failure'

export type State = {
  clientes: ClienteModel[]
  getFromRepoStatus: LoadingStatus
  term: string
}

export const initialState: State = {
  clientes: [],
  getFromRepoStatus: 'pristine',
  term: ''
}

const reducers = {
  getFromRepo: (state: State, action: PayloadAction<boolean>) => {
    state.getFromRepoStatus = 'loading'
  },
  getFromRepoSuccess: (state: State, action: PayloadAction<ClienteModel[]>) => {
    state.clientes = action.payload
    state.getFromRepoStatus = 'success'
  },
  getFromRepoFailure: (state: State) => {
    state.getFromRepoStatus = 'failure'
  },
  search: (state: State, action: PayloadAction<{ term: string }>) => {
    state.term = action.payload.term
  }
}

const cliente = createSlice({
  name: 'cliente',
  initialState,
  reducers
})

export const actions = cliente.actions
export const reducer = cliente.reducer

/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type LoadingStatus = 'pristine' | 'loading' | 'success' | 'failure'

export type State = {
  syncStatus: LoadingStatus
  countChanges: number
}

export const initialState: State = {
  syncStatus: 'pristine',
  countChanges: 0
}

const reducers = {
  sync: (state: State) => {
    state.syncStatus = 'loading'
  },
  syncSuccess: (state: State) => {
    state.syncStatus = 'success'
    state.countChanges = 0
  },
  syncFailure: (state: State) => {
    state.syncStatus = 'failure'
  },
  countChanges: () => undefined,
  setCountChanges: (state: State, actions: PayloadAction<number>) => {
    state.countChanges = actions.payload
  }
}

const filaSync = createSlice({
  name: 'filaSync',
  initialState,
  reducers
})

export const actions = filaSync.actions
export const reducer = filaSync.reducer

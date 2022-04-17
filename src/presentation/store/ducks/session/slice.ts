import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { ParseTokenModel } from 'domain/models/autenticacao'
import { UserModel } from 'domain/models/user'

export type State = {
  user: UserModel
  bu: string
  hiddenChatbot: boolean
}

export const initialState: State = {
  user: {} as UserModel,
  bu: '',
  hiddenChatbot: true
}

const reducers = {
  authSuccess: (state: State, action: PayloadAction<ParseTokenModel>) => {
    const { bu, ...user } = action.payload
    state.user = user
    state.bu = bu
  },
  toggleChatbot: (state: State) => {
    const old = state.hiddenChatbot
    state.hiddenChatbot = !old
  }
}

const session = createSlice({
  name: 'session',
  initialState,
  reducers
})

export const actions = session.actions
export const reducer = session.reducer

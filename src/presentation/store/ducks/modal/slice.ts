import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ModalTypes } from 'types/modal'

export type PropsType = {
  [property in keyof ModalTypes]?: ModalTypes[property]
}

export type State = {
  isOpen: boolean
  currentModal: keyof ModalTypes | null
  propsByName: PropsType
}

export type OpenReducer = {
  name: keyof ModalTypes
  props?: PropsType
}

export const initialState: State = {
  isOpen: false,
  currentModal: null,
  propsByName: {}
}

const reducers = {
  open: (state: State, actions: PayloadAction<OpenReducer>) => {
    const { name, props } = actions.payload
    state.isOpen = true
    state.currentModal = name
    if (props) {
      state.propsByName = { ...state.propsByName, [name]: props[name] }
    }
  },
  close: (state: State) => {
    state.isOpen = false
  },
  clear: (state: State) => {
    state.propsByName = {}
    state.isOpen = false
    state.currentModal = null
  }
}

const modal = createSlice({
  name: 'modal',
  initialState,
  reducers
})

export const actions = modal.actions
export const reducer = modal.reducer

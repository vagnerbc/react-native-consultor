import { createSelector } from '@reduxjs/toolkit'

import { State } from '../'

export const getRoot = (state: State) => {
  return state.modal
}

export const getPropsByName = createSelector(
  [getRoot],
  state => state.propsByName
)

export const getOpenedModalName = createSelector(
  [getRoot],
  state => state.currentModal
)

import { createSelector } from '@reduxjs/toolkit'

import { Cliente } from 'domain/entity/cliente'

import { State } from '..'

export const getRoot = (state: State) => {
  return state.cliente
}

export const getClientes = createSelector([getRoot], state => {
  return state.clientes
})

export const getTerm = createSelector([getRoot], state => {
  return state.term
})

export const getClientesFiltered = createSelector(
  [getClientes, getTerm],
  (clientes, term) => Cliente.getFiltered(clientes, term)
)

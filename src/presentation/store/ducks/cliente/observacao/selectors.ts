import { createSelector } from '@reduxjs/toolkit'

import { ClienteObservacao } from 'domain/entity/cliente'

import { State } from '../..'

export const getRoot = (state: State) => {
  return state.clienteObservacao
}

export const getObservacoes = createSelector([getRoot], state => {
  return state.observacoes
})

export const getObservacoesByClienteId = createSelector(
  [getObservacoes],
  observacoes => {
    return (id: number) => ClienteObservacao.getByClienteId(observacoes, id)
  }
)

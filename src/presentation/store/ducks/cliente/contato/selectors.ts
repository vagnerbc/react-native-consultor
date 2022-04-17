import { createSelector } from '@reduxjs/toolkit'

import { ClienteContato } from 'domain/entity/cliente'

import { State } from '../..'

export const getRoot = (state: State) => {
  return state.clienteContato
}

export const getContatos = createSelector([getRoot], state => {
  return state.contatos
})

export const getContatosByClienteId = createSelector(
  [getContatos],
  contatos => {
    return (id: number) => ClienteContato.getByClienteId(contatos, id)
  }
)

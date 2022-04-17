import { ClienteStateMockBuilder } from 'presentation/store/__mock__/cliente-state-mock-builder'

import { actions, reducer } from '../'
import { initialState } from '../slice'

describe('Reducers dos clientes', () => {
  const term = 'TERMO_BUSCADO'
  const state = new ClienteStateMockBuilder().withTerm(term).build()

  test('deve retornar novo estado quando "search" for chamado, atualizando o term', () => {
    const result = reducer(initialState, actions.search({ term }))
    expect(result).toEqual(state)
  })
})

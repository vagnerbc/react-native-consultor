import { ClienteMockBuilder } from 'domain/models/__mocks__/cliente-mock'
import { ClienteStateMockBuilder } from 'presentation/store/__mock__/cliente-state-mock-builder'
import { StateMockBuilder } from 'presentation/store/__mock__/state-mock-builder'

import { selectors } from '..'

describe('Selectores de cliente', () => {
  const data = [
    new ClienteMockBuilder().withId(1).build(),
    new ClienteMockBuilder().withId(2).build()
  ]

  const state = new ClienteStateMockBuilder().withClientes(data).build()

  const coreState = new StateMockBuilder().withClienteState(state).build()

  test('deve retornar o estado root', () => {
    const result = selectors.getRoot(coreState)
    expect(result).toEqual(state)
  })

  test('deve retornar todos os clientes', () => {
    const result = selectors.getClientes(coreState)
    expect(result).toEqual(data)
  })

  describe('Quanto a busca de clientes', () => {
    const searchTerm = 'TERMO_BUSCADO'
    const clientWithTerm = new ClienteMockBuilder()
      .withId(3)
      .withNome(searchTerm)
      .build()
    const stateWithTerm = new ClienteStateMockBuilder()
      .withClientes([...data, clientWithTerm])
      .withTerm(searchTerm)
      .build()
    const coreStateWithTerm = new StateMockBuilder()
      .withClienteState(stateWithTerm)
      .build()

    test('deve retornar o termo de busca', () => {
      const result = selectors.getTerm(coreStateWithTerm)
      expect(result).toEqual(searchTerm)
    })

    test('deve retornar os clientes filtrados pelo termo de busca', () => {
      const result = selectors.getClientesFiltered(coreStateWithTerm)
      expect(result).toEqual([clientWithTerm])
    })
  })
})

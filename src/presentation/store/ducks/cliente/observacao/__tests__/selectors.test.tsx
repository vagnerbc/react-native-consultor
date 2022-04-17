import { ClienteObservacaoMockBuilder } from 'domain/models/__mocks__/cliente-observacao-mock'
import { ClienteObservacaoStateMockBuilder } from 'presentation/store/__mock__/cliente-observacao-state-mock-builder'
import { StateMockBuilder } from 'presentation/store/__mock__/state-mock-builder'

import { selectors } from '..'

describe('Selectores de observacoes', () => {
  const data = [
    new ClienteObservacaoMockBuilder().withId(1).build(),
    new ClienteObservacaoMockBuilder().withId(2).build()
  ]
  const state = new ClienteObservacaoStateMockBuilder()
    .withObservacoes(data)
    .build()

  const coreState = new StateMockBuilder()
    .withClienteObservacaoState(state)
    .build()

  test('deve retornar o estado root', () => {
    const result = selectors.getRoot(coreState)
    expect(result).toEqual(state)
  })

  test('deve retornar todos as observacoes', () => {
    const result = selectors.getObservacoes(coreState)
    expect(result).toEqual(data)
  })
})

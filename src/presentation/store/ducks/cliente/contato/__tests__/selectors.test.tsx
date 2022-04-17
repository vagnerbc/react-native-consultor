import { ClienteContatoMockBuilder } from 'domain/models/__mocks__/cliente-contato-mock'
import { ClienteContatoStateMockBuilder } from 'presentation/store/__mock__/cliente-contato-state-mock-builder'
import { StateMockBuilder } from 'presentation/store/__mock__/state-mock-builder'

import { selectors } from '..'

describe('Selectores de contatos', () => {
  const data = [
    new ClienteContatoMockBuilder().withId(1).build(),
    new ClienteContatoMockBuilder().withId(2).build()
  ]
  const state = new ClienteContatoStateMockBuilder().withContatos(data).build()

  const coreState = new StateMockBuilder()
    .withClienteContatoState(state)
    .build()

  test('deve retornar o estado root', () => {
    const result = selectors.getRoot(coreState)
    expect(result).toEqual(state)
  })

  test('deve retornar todos os contatos', () => {
    const result = selectors.getContatos(coreState)
    expect(result).toEqual(data)
  })
})

import { ModalStateMockBuilder } from 'presentation/store/__mock__/modal-state-mock-builder'
import { StateMockBuilder } from 'presentation/store/__mock__/state-mock-builder'

import { selectors } from '..'

describe('Selectores do modal', () => {
  const state = new ModalStateMockBuilder().build()
  const coreState = new StateMockBuilder().withModalState(state).build()

  test('deve retornar o estado root', () => {
    const result = selectors.getRoot(coreState)
    expect(result).toEqual(state)
  })
})

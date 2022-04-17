import { SessionStateMockBuilder } from 'presentation/store/__mock__/session-state-mock-builder'
import { StateMockBuilder } from 'presentation/store/__mock__/state-mock-builder'

import { selectors } from '..'

describe('Seletores da sessão', () => {
  const state = new SessionStateMockBuilder().build()
  const coreState = new StateMockBuilder().withSessionState(state).build()

  test('deve retornar o estado root', () => {
    const result = selectors.getRoot(coreState)
    expect(result).toEqual(state)
  })
  test('deve retornar se o usuario tem autorizacão', () => {
    const result = selectors.getHasAuth(coreState)
    expect(result).toBeTruthy()
  })

  test('deve retornar se o chatbot esta fechado ou não', () => {
    const result = selectors.getHiddenChatbot(coreState)
    expect(result).toBeTruthy()
  })
})

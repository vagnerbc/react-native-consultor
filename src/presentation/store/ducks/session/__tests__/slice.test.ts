import { UserMockBuilder } from 'domain/models/__mocks__/user-mock'
import { SessionStateMockBuilder } from 'presentation/store/__mock__/session-state-mock-builder'

import { actions, reducer } from '../'
import { initialState } from '../slice'

describe('Reducers da sessão', () => {
  const state = new SessionStateMockBuilder()
    .withUser(new UserMockBuilder().build())
    .build()
  const parseToken = { ...state.user, bu: state.bu }

  test('deve retornar novo estado quando "update" for chamado', () => {
    const result = reducer(initialState, actions.authSuccess(parseToken))
    expect(result).toEqual(state)
  })

  test('deve retornar o mesmo estado caso não houverem mudanças', () => {
    const result = reducer(state, actions.authSuccess(parseToken))
    expect(result).toEqual(state)
  })
})

import { Dispatch, MiddlewareAPI } from 'redux'

import { State, actions } from 'presentation/store/ducks'
import * as Token from 'utils/token'

import { authMiddleware, toCheckToken } from '../authMiddleware'

describe('Teste o funcionamento do authMiddleware', () => {
  const next = jest.fn()
  const store = {} as MiddlewareAPI<Dispatch, State>

  store.dispatch = jest.fn()

  test('deve prosseguir normalmente se o token não estiver expirado', async () => {
    jest
      .spyOn(Token, 'parseToken')
      .mockReturnValueOnce({ exp: 1000000000000000 })

    const type = actions.filaSync.sync.type
    const action = {
      type,
      payload: { forceLoad: true }
    }

    await authMiddleware(store)(next)(action)

    expect(toCheckToken.has(type)).toBeTruthy()
    expect(next).toHaveBeenCalledWith(action)
  })

  test('deve seguir normalmente se a action estiver inclusa nas dependencias a serem verificadas', async () => {
    const type = actions.filaSync.countChanges.type
    const action = {
      type
    }

    await authMiddleware(store)(next)(action)

    expect(toCheckToken.has(type)).toBeFalsy()
    expect(next).toHaveBeenCalledWith(action)
  })
})

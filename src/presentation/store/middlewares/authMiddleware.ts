import { fromUnixTime, differenceInSeconds } from 'date-fns'

import { makeLocalStorageAdapter } from 'main/factories/cache/local-storage-adapter-factory'
import { makeKeycloakService } from 'main/factories/services/keycloak'
import { actions } from 'presentation/store/ducks'
import { parseToken } from 'utils/token'

import { Middleware } from '.'

const localStorageAdapter = makeLocalStorageAdapter()
const keycloakService = makeKeycloakService()

export const toCheckToken = new Set([actions.filaSync.sync.type])

export const authMiddleware: Middleware = () => next => async action => {
  if (!toCheckToken.has(action.type)) {
    return next(action)
  }

  const accessToken = localStorageAdapter.get('access_token') || ''

  const info = parseToken(accessToken)
  const expiration = fromUnixTime(info.exp)
  const almostExpire = differenceInSeconds(expiration, new Date()) <= 30

  if (almostExpire) {
    const refreshToken = localStorageAdapter.get('refresh_token') || ''
    const data = await keycloakService.refresh(refreshToken)

    if (!data) {
      // eslint-disable-next-line no-console
      console.log('Fail to refresh token')
      return next(action)
    }

    localStorageAdapter.set('access_token', data.accessToken)
    localStorageAdapter.set('refresh_token', data.refreshToken)
  }

  return next(action)
}

import { HttpClient } from '../../../data/http'
import { AuthorizeHttpClientDecorator } from '../../decorators'
import { makeLocalStorageAdapter } from '../../factories/cache/local-storage-adapter-factory'
import { makeAxiosHttpClient } from '../../factories/http/axios-http-client-factory'

export const makeAuthorizeHttpClientDecorator = (): HttpClient =>
  new AuthorizeHttpClientDecorator(
    makeLocalStorageAdapter(),
    makeAxiosHttpClient()
  )

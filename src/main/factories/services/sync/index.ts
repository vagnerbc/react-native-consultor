import { SyncService } from '../../../../data/services/sync/sync'
import { makeAuthorizeHttpClientDecorator } from '../../decorators/authorize-http-client-decorator-factory'

export const makeSyncService = () => {
  return new SyncService(makeAuthorizeHttpClientDecorator())
}

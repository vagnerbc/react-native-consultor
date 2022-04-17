import { RemoteFilaSync } from '../../../../data/usecases/fila-sync/sync'
import { makeRepository } from '../../repositories/repository-factory'
import { makeSyncService } from '../../services/sync'

export const makeSync = () =>
  new RemoteFilaSync(makeSyncService(), makeRepository())

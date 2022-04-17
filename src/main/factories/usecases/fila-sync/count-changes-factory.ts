import { RepoCountChanges } from '../../../../data/usecases/fila-sync/count-changes'
import { CountChanges } from '../../../../domain/usecases/fila-sync/count-changes'
import { makeRepository } from '../../repositories/repository-factory'

export const makeCountChanges = (): CountChanges =>
  new RepoCountChanges(makeRepository())

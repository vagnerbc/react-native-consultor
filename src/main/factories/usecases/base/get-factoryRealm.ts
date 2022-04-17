import { DBTables } from '../../../../data/models/tables'
import { GetFromRepo } from '../../../../data/usecases/base/get'
import { makeRepository } from '../../repositories/repository-factory'

export const makeGetFromRepoRealm = <T>(entity: DBTables) =>
  new GetFromRepo<T>(entity, makeRepository())

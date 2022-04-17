import { Repository } from '../../../data/db/repository'
import { makeRealmDBRepository } from '../db/realm-db-repository-factory'

export const makeRepository = () => {
  return new Repository(makeRealmDBRepository())
}

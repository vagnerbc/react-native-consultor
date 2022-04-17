import { ReamlRepository } from 'infra/db/realm/repository'

const dbName = process.env.DB_NAME ?? ''

export const makeRealmDBRepository = () => {
  return new ReamlRepository(dbName)
}

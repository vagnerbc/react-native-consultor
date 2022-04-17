import { DBTables } from '../../../../data/models/tables'
import { RepoDelete } from '../../../../data/usecases/base/delete'
import { makeRepository } from '../../repositories/repository-factory'

export const makeDelete = (tableName: DBTables) =>
  new RepoDelete(tableName, makeRepository())

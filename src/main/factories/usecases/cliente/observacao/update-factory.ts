import { RepoUpdate } from '../../../../../data/usecases/cliente/observacao/update'
import { makeRepository } from '../../../repositories/repository-factory'

export const makeUpdate = () => new RepoUpdate(makeRepository())

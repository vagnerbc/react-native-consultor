import { RepoUpdate } from '../../../../../data/usecases/cliente/contato/update'
import { makeRepository } from '../../../repositories/repository-factory'

export const makeUpdate = () => new RepoUpdate(makeRepository())

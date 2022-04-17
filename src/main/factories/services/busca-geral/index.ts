import { BuscaGeralService } from '../../../../data/services/busca-geral'
import { makeAuthorizeHttpClientDecorator } from '../../decorators/authorize-http-client-decorator-factory'

export const makeBuscaGeralService = () =>
  new BuscaGeralService(makeAuthorizeHttpClientDecorator())

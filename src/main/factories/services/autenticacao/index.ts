import { AutenticacaoService } from '../../../../data/services/autenticacao'
import { makeAxiosHttpClient } from '../../http/axios-http-client-factory'

export const makeAutenticacaoService = () => {
  return new AutenticacaoService(makeAxiosHttpClient())
}

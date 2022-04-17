import { RemoteParseToken } from '../../../../data/usecases/autenticacao/parse-token'
import { ParseToken } from '../../../../domain/usecases/autenticacao/parse-token'
import { makeJWTParser } from '../../parser/jwt-parser'
import { makeAutenticacaoService } from '../../services/autenticacao'

export const makeParseToken = (): ParseToken =>
  new RemoteParseToken(makeAutenticacaoService(), makeJWTParser())

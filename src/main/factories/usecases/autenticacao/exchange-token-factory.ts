import { RemoteExchangeToken } from '../../../../data/usecases/autenticacao/exchange-token'
import { ExchangeToken } from '../../../../domain/usecases/autenticacao/exchange-token'
import { makeAutenticacaoService } from '../../services/autenticacao'

export const makeExchangeToken = (): ExchangeToken =>
  new RemoteExchangeToken(makeAutenticacaoService())

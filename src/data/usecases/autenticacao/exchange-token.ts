import { ExchangeToken } from '../../../domain/usecases/autenticacao/exchange-token'
import { RemoteAuthorizationModel } from '../../models/autenticacao'
import { AutenticacaoService } from '../../services/autenticacao'

export class RemoteExchangeToken implements ExchangeToken {
  constructor(private readonly autenticacaoService: AutenticacaoService) {
    this.autenticacaoService = autenticacaoService
  }

  async exec(token: string): Promise<RemoteAuthorizationModel> {
    const authorization = await this.autenticacaoService.exchangeToken(token)
    return authorization
  }
}

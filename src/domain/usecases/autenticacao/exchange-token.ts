import { RemoteAuthorizationModel } from '../../../data/models/autenticacao'

export interface ExchangeToken {
  exec(token: string): Promise<RemoteAuthorizationModel>
}

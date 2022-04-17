import {
  ParseTokenModel,
  TokenModel
} from '../../../domain/models/autenticacao'
import { ParseToken } from '../../../domain/usecases/autenticacao/parse-token'
import { Parser } from '../../parser'
import { AutenticacaoService } from '../../services/autenticacao'

export class RemoteParseToken implements ParseToken {
  constructor(
    private readonly autenticacaoService: AutenticacaoService,
    private readonly parser: Parser
  ) {
    this.autenticacaoService = autenticacaoService
    this.parser = parser
  }

  _getCPF = (tokenObject: TokenModel) => {
    let cpfs = tokenObject.cpf ?? []
    if (!Array.isArray(cpfs)) cpfs = []
    if (cpfs.length === 0) cpfs = []
    return cpfs[0]
  }

  _getBU = (tokenObject: TokenModel) => {
    let bus = tokenObject['b2b-api-business-unit'] ?? []
    if (!Array.isArray(bus)) bus = []
    if (bus.length === 0) bus = []
    return bus[0]
  }

  _getCustomerIDs = (tokenObject: TokenModel) => {
    let cnpjs = tokenObject.cnpj ?? []
    if (!Array.isArray(cnpjs)) cnpjs = []
    if (cnpjs.length === 0) cnpjs = []
    return cnpjs
  }

  async exec(token: string): Promise<ParseTokenModel> {
    const authorization = await this.autenticacaoService.exchangeToken(token)

    const tokenObject = this.parser.parse<TokenModel>(
      authorization.access_token
    )

    const roles = tokenObject.resource_access?.['b2b-api']?.roles || []
    const isMagicLinkSession = tokenObject.session_type?.['magic-link'] || false

    return {
      name: tokenObject.name ?? '',
      roles,
      username: tokenObject.preferred_username ?? '',
      email: tokenObject.email ?? '',
      cpf: this._getCPF(tokenObject),
      bu: this._getBU(tokenObject),
      customerIDs: this._getCustomerIDs(tokenObject),
      verified: tokenObject.email_verified ?? false,
      isMagicLinkSession
    }
  }
}

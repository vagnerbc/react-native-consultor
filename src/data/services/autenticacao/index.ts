import { AutenticacaoError } from '../../errors/autenticacao'
import { HttpClient, HttpStatusCode } from '../../http/http-client'
import {
  RemoteAuthorizationModel,
  RemoteHubUser
} from '../../models/autenticacao'

const hubApiURI = process.env.HUB_API_URI

export class AutenticacaoService {
  constructor(private readonly httpClient: HttpClient) {
    this.httpClient = httpClient
  }

  async exchangeToken(token: string): Promise<RemoteAuthorizationModel> {
    const Nil = {} as RemoteAuthorizationModel
    const body = { audience: process.env.B2B_AUDIENCE }

    const response = await this.httpClient.request(
      {
        url: '/token/exchange',
        method: 'post',
        headers: {
          Accept: 'application/json',
          Authorization: token
        },
        body
      },
      hubApiURI
    )

    switch (response.statusCode) {
      case HttpStatusCode.ok:
        return response.body ?? Nil
      case HttpStatusCode.noContent:
        return Nil
      default:
        AutenticacaoError.dispatch(response)
        return Nil
    }
  }

  async getHubUserId(token: string): Promise<string> {
    const response = await this.httpClient.request(
      {
        url: '/user',
        method: 'get',
        headers: {
          Accept: 'application/json',
          Authorization: token
        }
      },
      hubApiURI
    )

    const body = response.body as RemoteHubUser

    switch (response.statusCode) {
      case HttpStatusCode.ok:
        return body.data?.user?._id ?? ''
      case HttpStatusCode.noContent:
        return ''
      default:
        AutenticacaoError.dispatch(response)
        return ''
    }
  }
}

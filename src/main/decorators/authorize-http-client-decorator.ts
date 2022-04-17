import { HttpClient, HttpRequest, HttpResponse } from '../../data/http'
import { LocalStorageAdapter } from '../../infra/cache/local-storage-adapter'

export class AuthorizeHttpClientDecorator implements HttpClient {
  constructor(
    private readonly localStorage: LocalStorageAdapter,
    private readonly httpClient: HttpClient
  ) {
    this.localStorage = localStorage
    this.httpClient = httpClient
  }

  redirectToAuth() {
    this.localStorage.remove('access_token')
    window.location.reload()
  }

  async request(data: HttpRequest, customURI?: string): Promise<HttpResponse> {
    const accessToken = this.localStorage.get('access_token')

    if (accessToken) {
      Object.assign(data, {
        headers: Object.assign(data.headers || {}, {
          Authorization: `Bearer ${accessToken}`
        })
      })
    }

    const httpResponse = await this.httpClient.request(data, customURI)

    if (httpResponse.statusCode === 401) {
      this.redirectToAuth()
      return httpResponse
    }

    return httpResponse
  }
}

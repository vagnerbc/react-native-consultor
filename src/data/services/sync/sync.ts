import { GetModel, SetModel, Sync, SyncFailure } from '.'
import { HttpClient, HttpStatusCode, HttpResponse } from '../../http'

export class SyncService implements Sync {
  constructor(protected readonly httpClient: HttpClient<GetModel>) {
    this.httpClient = httpClient
  }

  async getSync(reference?: string | null): Promise<GetModel> {
    const Nil = {} as GetModel

    const query = reference ? `&reference=${reference}` : ''

    const response = await this.httpClient.request({
      url: `/sync?${query}`,
      method: 'get'
    })

    switch (response.statusCode) {
      case HttpStatusCode.ok:
        return response.body ?? Nil
      default:
        return Nil
    }
  }

  async sendSync(data: SetModel): Promise<SyncFailure | undefined> {
    const response = (await this.httpClient.request({
      url: '/sync',
      method: 'post',
      body: data
    })) as unknown as HttpResponse<SyncFailure | undefined>

    switch (response.statusCode) {
      case HttpStatusCode.ok:
        return response.body
      default:
        return response.body
    }
  }
}

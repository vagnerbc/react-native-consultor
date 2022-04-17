import axios, { AxiosResponse, AxiosError } from 'axios'

import {
  HttpRequest,
  HttpResponse,
  HttpClient,
  HttpStatusCode
} from '../../data/http'

export class AxiosHttpClient implements HttpClient {
  constructor(private apiURL: string) {
    this.apiURL = apiURL
  }

  async request(data: HttpRequest, customURL?: string): Promise<HttpResponse> {
    const baseURL = customURL || this.apiURL
    let axiosResponse: AxiosResponse | undefined

    try {
      axiosResponse = await axios.request({
        url: `${baseURL}${data.url}`,
        method: data.method,
        data: data.body,
        params: data.params,
        headers: data.headers
      })
    } catch (exception) {
      const error = exception as AxiosError
      axiosResponse = error.response
    }

    return {
      statusCode: axiosResponse?.status || HttpStatusCode.serverError,
      body: axiosResponse?.data
    }
  }
}

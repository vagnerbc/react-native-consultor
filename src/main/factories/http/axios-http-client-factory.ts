import { AxiosHttpClient } from '../../../infra/http/axios-http-client'

const apiURL = process.env.API_BASE_URL

export const makeAxiosHttpClient = (): AxiosHttpClient =>
  new AxiosHttpClient(apiURL)

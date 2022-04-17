import { AutenticacaoService } from '..'
import { makeAxiosHttpClient } from '../../../../main/factories/http/axios-http-client-factory'
import { RemoteAuthorizationModel } from '../../../models/autenticacao'

describe('services auth', () => {
  const axiosHttpClient = makeAxiosHttpClient()
  const service = new AutenticacaoService(axiosHttpClient)
  const token = 'testToken'
  const body = { data: { user: { _id: 'testId' } } }
  const Nil = {} as RemoteAuthorizationModel
  test('deve chamar metodo com retorno 200', async () => {
    const spyRequest = jest
      .spyOn(axiosHttpClient, 'request')
      .mockResolvedValue(Promise.resolve({ statusCode: 200, body }))

    const responseExchangeToken = await service.exchangeToken(token)
    const responseHubUserId = await service.getHubUserId(token)

    expect(spyRequest).toHaveBeenCalledTimes(2)
    expect(responseExchangeToken).toStrictEqual(body)
    expect(responseHubUserId).toStrictEqual('testId')
  })
  test('deve chamar metodo com retorno 204', async () => {
    const spyRequest = jest
      .spyOn(axiosHttpClient, 'request')
      .mockResolvedValue(Promise.resolve({ statusCode: 204, body }))

    const responseExchangeToken = await service.exchangeToken(token)
    const responseHubUserId = await service.getHubUserId(token)

    expect(spyRequest).toHaveBeenCalledTimes(2)
    expect(responseExchangeToken).toStrictEqual(Nil)
    expect(responseHubUserId).toStrictEqual('')
  })
  test('deve chamar metodo com retorno 404', async () => {
    const spyRequest = jest
      .spyOn(axiosHttpClient, 'request')
      .mockResolvedValue(Promise.resolve({ statusCode: 404, body }))

    const responseExchangeToken = await service.exchangeToken(token)
    const responseHubUserId = await service.getHubUserId(token)

    expect(spyRequest).toHaveBeenCalledTimes(2)
    expect(responseExchangeToken).toStrictEqual(Nil)
    expect(responseHubUserId).toStrictEqual('')
  })
})

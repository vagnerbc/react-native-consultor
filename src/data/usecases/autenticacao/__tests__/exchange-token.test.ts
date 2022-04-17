import { AuthorizationMockBuilder } from '../../../../domain/models/__mocks__/authorization-mock'
import { makeAutenticacaoService } from '../../../../main/factories/services/autenticacao'
import { RemoteExchangeToken } from '../exchange-token'

describe('Caso de uso do exchange do token', () => {
  const autenticacaoService = makeAutenticacaoService()

  const sut = new RemoteExchangeToken(autenticacaoService)

  test('deve executar o exchange do token e retornar um objeto do tipo AuthorizationModel', async () => {
    const authorization = new AuthorizationMockBuilder().build()
    const token = 'test_token'

    jest
      .spyOn(autenticacaoService, 'exchangeToken')
      .mockResolvedValueOnce(authorization)

    const result = await sut.exec(token)

    expect(result).toEqual(authorization)
  })
})

import { AuthorizationMockBuilder } from '../../../../domain/models/__mocks__/authorization-mock'
import { TokenMockBuilder } from '../../../../domain/models/__mocks__/token-mock'
import { JWTParser } from '../../../../infra/parser'
import { makeAutenticacaoService } from '../../../../main/factories/services/autenticacao'
import { RemoteParseToken } from '../parse-token'

describe('Caso de uso de realizar o parse do token', () => {
  const autenticacaoService = makeAutenticacaoService()
  const parser = new JWTParser()
  const authorization = new AuthorizationMockBuilder().build()
  const token = 'test_token'

  const sut = new RemoteParseToken(autenticacaoService, parser)

  beforeEach(() => {
    jest
      .spyOn(autenticacaoService, 'exchangeToken')
      .mockResolvedValueOnce(authorization)
  })

  test('deve realizar o parse do token, retornando um objeto com as informações do usuário', async () => {
    const tokenObject = new TokenMockBuilder().fill(1).build()

    jest.spyOn(parser, 'parse').mockReturnValueOnce(tokenObject)

    const result = await sut.exec(token)

    expect(result).toBeTruthy()
    expect(result.roles).toEqual([])
  })

  test('deve retornar o cnpj corretamente', async () => {
    const cpfs = ['cpf1', 'cpf2']
    const tokenObject = new TokenMockBuilder().withCpf(cpfs).build()

    jest.spyOn(parser, 'parse').mockReturnValueOnce(tokenObject)

    const result = await sut.exec(token)

    expect(result).toBeTruthy()
    expect(result.cpf).toEqual(cpfs[0])
  })

  test('deve retornar a BU corretamente', async () => {
    const bus = ['bu1', 'bu2']
    const tokenObject = new TokenMockBuilder()
      .withB2bApiBusinessUnit(bus)
      .build()

    jest.spyOn(parser, 'parse').mockReturnValueOnce(tokenObject)

    const result = await sut.exec(token)

    expect(result).toBeTruthy()
    expect(result.bu).toEqual(bus[0])
  })

  test('deve retornar a lista de customersID corretamente', async () => {
    const cnpjs = ['cnpj1', 'cnpj2', 'cnpj3']
    const tokenObject = new TokenMockBuilder().withCNPJ(cnpjs).build()

    jest.spyOn(parser, 'parse').mockReturnValueOnce(tokenObject)

    const result = await sut.exec(token)

    expect(result).toBeTruthy()
    expect(result.customerIDs).toEqual(cnpjs)
  })

  test('deve retornar as roles corretamente', async () => {
    const roles = ['role1', 'role2']
    const tokenObject = new TokenMockBuilder().withRoles(roles).build()

    jest.spyOn(parser, 'parse').mockReturnValueOnce(tokenObject)

    const result = await sut.exec(token)

    expect(result).toBeTruthy()
    expect(result.roles).toEqual(roles)
  })

  test('deve retornar se é um magic link session', async () => {
    const tokenObject = new TokenMockBuilder().withIsMagicLink(true).build()

    jest.spyOn(parser, 'parse').mockReturnValueOnce(tokenObject)

    const result = await sut.exec(token)

    expect(result).toBeTruthy()
    expect(result.isMagicLinkSession).toEqual(true)
  })

  test('deve retornar undefined caso o atributo cpf não seja um array', () => {
    const tokenObject = new TokenMockBuilder().build()

    const result = sut._getCPF({
      ...tokenObject,
      cpf: 'invalid_array' as unknown as string[]
    })

    expect(result).toEqual(undefined)
  })

  test('deve retornar undefined caso o atributo b2b-api-business-unit nao seja um array', () => {
    const tokenObject = new TokenMockBuilder().build()

    const result = sut._getBU({
      ...tokenObject,
      'b2b-api-business-unit': 'invalid_array' as unknown as string[]
    })

    expect(result).toEqual(undefined)
  })

  test('deve retornar uma lista vazia caso o atributo cnpj nao seja um array', () => {
    const tokenObject = new TokenMockBuilder().build()

    const result = sut._getCustomerIDs({
      ...tokenObject,
      cnpj: 'invalid_array' as unknown as string[]
    })

    expect(result).toEqual([])
  })
})

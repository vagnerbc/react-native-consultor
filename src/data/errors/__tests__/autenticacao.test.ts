/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */
import eventEmitter from '../../../utils/event-emitter'
import { HttpResponse } from '../../http'
import { AutenticacaoError, RemoteError } from '../autenticacao'

describe('Classe de tratamento de erro de autenticacao', () => {
  const sut = AutenticacaoError

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('deve inscrever um evento no eventEmitter', () => {
    const spy = jest.spyOn(eventEmitter, 'subscribe')
    const eventMock = (data: RemoteError) => {}

    sut.subscribe(eventMock)

    expect(spy).toHaveBeenCalledTimes(1)
  })

  test('deve disparar um httpResponse no eventEmitter', () => {
    const spy = jest.spyOn(eventEmitter, 'dispatch')
    const httpResponse: HttpResponse = {
      statusCode: 200,
      body: 'teste_body'
    }

    sut.dispatch(httpResponse)

    expect(spy).toHaveBeenNthCalledWith(
      1,
      'AutenticacaoError',
      httpResponse.body
    )
  })

  test('deve disparar uma string no eventEmitter', () => {
    const spy = jest.spyOn(eventEmitter, 'dispatch')
    const event = 'event_message_test'

    sut.dispatch(event)

    expect(spy).toHaveBeenNthCalledWith(1, 'AutenticacaoError', event)
  })

  test('deve remover um evento do eventEmitter', () => {
    const spy = jest.spyOn(eventEmitter, 'unsubscribe')

    sut.unsubscribe()

    expect(spy).toHaveBeenNthCalledWith(1, 'AutenticacaoError')
  })
})

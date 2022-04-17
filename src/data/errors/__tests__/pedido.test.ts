/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */
import eventEmitter from '../../../utils/event-emitter'
import { HttpResponse } from '../../http'
import { ErrorEventData, PedidoError } from '../pedido'

describe('Classe de tratamento de erro de pedido', () => {
  const sut = PedidoError

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('deve inscrever um evento no eventEmitter', () => {
    const spy = jest.spyOn(eventEmitter, 'subscribe')
    const eventMock = (data: ErrorEventData) => {}

    sut.subscribe(eventMock)

    expect(spy).toHaveBeenCalledTimes(1)
  })

  test('deve disparar um httpResponse no eventEmitter', () => {
    const spy = jest.spyOn(eventEmitter, 'dispatch')
    const httpResponse: HttpResponse = {
      statusCode: 200,
      body: {
        detail: [
          {
            loc: ['loc1', 'loc2'],
            msg: 'body_detail_test',
            type: 'body_type_test'
          }
        ]
      }
    }

    const expectedData = {
      title: '200',
      description: 'body_detail_test'
    }

    sut.dispatch(httpResponse)

    expect(spy).toHaveBeenNthCalledWith(1, 'PedidoError', expectedData)
  })

  test('deve remover um evento do eventEmitter', () => {
    const spy = jest.spyOn(eventEmitter, 'unsubscribe')

    sut.unsubscribe()

    expect(spy).toHaveBeenNthCalledWith(1, 'PedidoError')
  })
})

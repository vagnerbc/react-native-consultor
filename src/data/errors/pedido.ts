import EventEmitter from '../../utils/event-emitter'
import { HttpResponse } from '../http'

import { ErrorEvent } from '.'

export type RemoteError = {
  title: string
  detail: errorEventMsg[]
}
export type errorEventMsg = {
  loc: string[]
  msg: string
  type: string
}

export type ErrorEventData = {
  title: string
  description: string
}

const eventName = 'PedidoError'

export class Pedido implements ErrorEvent<HttpResponse, ErrorEventData> {
  dispatch(error: HttpResponse) {
    const body = error.body as RemoteError
    const data = {
      title: error.statusCode.toString(),
      description: body.detail[0]?.msg || ''
    }
    EventEmitter.dispatch<ErrorEventData>(eventName, data)
  }

  subscribe(callback: (data: ErrorEventData) => void) {
    EventEmitter.subscribe<ErrorEventData>(eventName, event => {
      callback(event)
    })
  }

  unsubscribe() {
    EventEmitter.unsubscribe(eventName)
  }
}

export const PedidoError = new Pedido()

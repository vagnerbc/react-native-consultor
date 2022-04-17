import EventEmitter from '../../utils/event-emitter'
import { HttpResponse } from '../http'

import { ErrorEvent } from '.'

export type RemoteError = {
  detail: string
}

export type ErrorEventData = {
  title: string
  description: string
}

const eventName = 'RequestError'

export class Request implements ErrorEvent<HttpResponse, ErrorEventData> {
  dispatch(error: HttpResponse) {
    const body = error.body as RemoteError
    const data = {
      title: error.statusCode.toString(),
      description: body?.detail || ''
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

export const RequestError = new Request()

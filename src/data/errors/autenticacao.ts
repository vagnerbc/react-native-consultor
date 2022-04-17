import EventEmitter from '../../utils/event-emitter'
import { HttpResponse } from '../http'

import { ErrorEvent } from '.'

export type RemoteError = {
  errorCode: number
  message: string
  name: string
}

const eventName = 'AutenticacaoError'

export class Autenticacao implements ErrorEvent<HttpResponse, RemoteError> {
  dispatch(error: string | HttpResponse) {
    const data = typeof error === 'string' ? error : (error.body as RemoteError)
    EventEmitter.dispatch<string | RemoteError>(eventName, data)
  }

  subscribe(callback: (data: RemoteError) => void) {
    EventEmitter.subscribe<RemoteError>(eventName, event => {
      callback(event)
    })
  }

  unsubscribe() {
    EventEmitter.unsubscribe(eventName)
  }
}

export const AutenticacaoError = new Autenticacao()

import decodeJWT from 'jwt-decode'

import { Parser } from '../../data/parser'

export class JWTParser implements Parser {
  parse<T>(token: string): T {
    return decodeJWT(token) as T
  }
}

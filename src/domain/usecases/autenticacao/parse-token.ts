import { ParseTokenModel } from '../../models/autenticacao'

export interface ParseToken {
  exec(token: string): Promise<ParseTokenModel>
}

import { UserModel } from './user'

export type AuthorizationModel = {
  ['access_token']: string
  ['refresh_token']: string
  ['scope']: string
  ['session_state']: string
  ['token_type']: string
  ['expires_in']: number
  ['not-before-policy']: number
  ['refresh_expires_in']: number
}

export type TokenModel = {
  ['preferred_username']?: string
  ['name']?: string
  ['given_name']?: string
  ['family_name']?: string
  ['locale']?: string
  ['email']?: string
  ['email_verified']?: boolean
  ['cpf']?: string[]
  ['cnpj']?: string[]
  ['exp']: number
  ['b2b-api-business-unit']?: string[]
  ['session_type']?: {
    ['magic-link']?: boolean
  }
  ['resource_access']?: {
    ['b2b-api']?: {
      ['roles']?: string[]
    }
  }
}

export type ParseTokenModel = UserModel & {
  ['bu']: string
}

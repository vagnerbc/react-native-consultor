export type RemoteAuthorizationModel = {
  ['access_token']: string
  ['refresh_token']: string
  ['scope']: string
  ['session_state']: string
  ['token_type']: string
  ['expires_in']: number
  ['not-before-policy']: number
  ['refresh_expires_in']: number
}

export type RemoteHubUser = {
  ['data']?: {
    ['user']?: {
      ['_id']: string
    }
  }
}

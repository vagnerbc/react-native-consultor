import { AuthorizationModel } from '../autenticacao'

export class AuthorizationMockBuilder {
  private accessToken = ''
  private refreshToken = ''
  private scope = ''
  private sessionState = ''
  private tokenType = ''
  private expiresIn = 0
  private notBeforePolicy = 0
  private refreshExpiresIn = 0

  build(): AuthorizationModel {
    return {
      access_token: this.accessToken,
      refresh_token: this.refreshToken,
      scope: this.scope,
      session_state: this.sessionState,
      token_type: this.tokenType,
      expires_in: this.expiresIn,
      'not-before-policy': this.notBeforePolicy,
      refresh_expires_in: this.refreshExpiresIn
    }
  }
}

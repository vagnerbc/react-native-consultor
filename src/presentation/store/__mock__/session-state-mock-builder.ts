import { UserModel } from 'domain/models/user'

import { State } from '../ducks/session/index'

export class SessionStateMockBuilder {
  private user: UserModel = {} as UserModel
  private bu = ''
  private hiddenChatbot = true

  withUser(value: UserModel) {
    this.user = value
    return this
  }

  withBu(value: string) {
    this.bu = value
    return this
  }

  withHiddenChatbot(value: boolean) {
    this.hiddenChatbot = value
    return this
  }

  build(): State {
    return {
      user: this.user,
      bu: this.bu,
      hiddenChatbot: this.hiddenChatbot
    }
  }
}

import { UserModel } from '../user'

export class UserMockBuilder {
  private name = ''
  private username = ''
  private email = ''
  private cpf = ''
  private verified = false
  private isMagicLinkSession = false
  private customerIDs: string[] = []
  private roles: string[] = []

  withName(value: string) {
    this.name = value
    return this
  }

  withUsername(value: string) {
    this.username = value
    return this
  }

  withEmail(value: string) {
    this.email = value
    return this
  }

  withCpf(value: string) {
    this.cpf = value
    return this
  }

  withVerified(value: boolean) {
    this.verified = value
    return this
  }

  withIsMagicLinkSession(value: boolean) {
    this.isMagicLinkSession = value
    return this
  }

  withCustomerIDs(value: string[]) {
    this.customerIDs = value
    return this
  }

  withRoles(value: string[]) {
    this.roles = value
    return this
  }

  build(): UserModel {
    return {
      name: this.name,
      username: this.username,
      email: this.email,
      cpf: this.cpf,
      verified: this.verified,
      isMagicLinkSession: this.isMagicLinkSession,
      customerIDs: this.customerIDs,
      roles: this.roles
    }
  }
}

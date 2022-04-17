import { TokenModel } from '../autenticacao'

export class TokenMockBuilder {
  private preferredUsername = ''
  private name = ''
  private givenName = ''
  private familyName = ''
  private locale = ''
  private email = ''
  private emailVerified = true
  private cpf: string[] = []
  private cnpj: string[] = []
  private exp = 0
  private b2bApiBusinessUnit: string[] = []
  private sessionType = {}
  private resourceAccess = {}

  fill(seed: number) {
    this.name = `name ${seed}`
    this.preferredUsername = `username ${seed}`
    this.givenName = `given name ${seed}`
    this.familyName = `family name ${seed}`
    this.locale = `locale ${seed}`
    this.email = `email${seed}@email.com`

    return this
  }

  withRoles(value: string[]) {
    this.resourceAccess = {
      'b2b-api': {
        roles: value
      }
    }

    return this
  }

  withIsMagicLink(value: boolean) {
    this.sessionType = {
      'magic-link': value
    }

    return this
  }

  withName(value: string) {
    this.name = value
    return this
  }

  withCpf(value: string[]) {
    this.cpf = value
    return this
  }

  withCNPJ(value: string[]) {
    this.cnpj = value
    return this
  }

  withB2bApiBusinessUnit(value: string[]) {
    this.b2bApiBusinessUnit = value
    return this
  }

  build(): TokenModel {
    return {
      preferred_username: this.preferredUsername,
      name: this.name,
      given_name: this.givenName,
      family_name: this.familyName,
      locale: this.locale,
      email: this.email,
      email_verified: this.emailVerified,
      cpf: this.cpf,
      cnpj: this.cnpj,
      exp: this.exp,
      'b2b-api-business-unit': this.b2bApiBusinessUnit,
      session_type: this.sessionType,
      resource_access: this.resourceAccess
    }
  }
}

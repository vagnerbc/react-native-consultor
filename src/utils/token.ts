import decodeJWT from 'jwt-decode'

import { TokenModel } from '../domain/models/autenticacao'

export const parseToken = (token: string): TokenModel => {
  return decodeJWT(token)
}

export const getUsername = (token: TokenModel) => {
  return token.preferred_username ?? ''
}

export const getName = (token: TokenModel) => {
  return token.given_name ?? ''
}

export const getEmail = (token: TokenModel) => {
  return token.email ?? ''
}

export const getCPF = (token: TokenModel) => {
  const cpfs = token.cpf ?? []
  if (!Array.isArray(cpfs)) return ''
  if (cpfs.length === 0) return ''
  return cpfs[0]
}

export const getCustomerIDs = (token: TokenModel) => {
  const cnpjs = token.cnpj ?? []
  if (!Array.isArray(cnpjs)) return []
  if (cnpjs.length === 0) return []
  return cnpjs
}

export const getBU = (token: TokenModel) => {
  const bus = token['b2b-api-business-unit'] ?? []
  if (!Array.isArray(bus)) return ''
  if (bus.length === 0) return ''
  return bus[0]
}

export const getRoles = (token: TokenModel) => {
  const roles = token?.resource_access?.['b2b-api']?.roles ?? []
  return Array.isArray(roles) ? roles : []
}

export const getVerified = (token: TokenModel) => {
  return Boolean(token.email_verified)
}

export const getIsMagicLinkSession = (token: TokenModel) => {
  const sessionType = token?.session_type ?? ''
  return sessionType === 'magic-link'
}

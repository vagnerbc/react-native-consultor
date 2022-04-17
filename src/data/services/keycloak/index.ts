export class KeycloakService {
  async auth(query: string) {
    const parameters = Object.fromEntries(new URLSearchParams(query))
    const keycloakCode = parameters.code
    const whereIAm = `${process.env.B2B_URI}/auth`
    const keycloakURL = process.env.KEYCLOAK_URL_GET_TOKEN

    const response = await fetch(keycloakURL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        code: keycloakCode,
        redirect_uri: whereIAm,
        client_id: process.env.KEYCLOAK_CLIENT_ID,
        grant_type: 'authorization_code'
      })
    })

    const data = await response.json()
    const accessToken = data.access_token
    const refreshToken = data.refresh_token

    if (!accessToken) {
      // eslint-disable-next-line no-console
      console.log('Token inválido')
      return
    }

    return {
      keycloakCode,
      accessToken,
      refreshToken
    }
  }

  async refresh(token: string) {
    const keycloakURL = process.env.KEYCLOAK_URL_GET_TOKEN

    const response = await fetch(keycloakURL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        client_id: process.env.KEYCLOAK_CLIENT_ID,
        grant_type: 'refresh_token',
        refresh_token: token
      })
    })

    const data = await response.json()
    const accessToken = data.access_token
    const refreshToken = data.refresh_token

    if (!accessToken) {
      // eslint-disable-next-line no-console
      console.log('Fail to refresh token')
      return
    }

    return { accessToken, refreshToken }
  }
}

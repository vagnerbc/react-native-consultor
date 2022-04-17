import { KeycloakService } from '../../../../data/services/keycloak'

export const makeKeycloakService = () => {
  return new KeycloakService()
}

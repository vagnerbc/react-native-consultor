export {}

declare global {
  declare namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production' | 'test'
      APP_NAME: string
      B2B_URI: string
      API_BASE_URL: string
      KEYCLOAK_URL_GET_CODE: string
      KEYCLOAK_URL_GET_TOKEN: string
      KEYCLOAK_CLIENT_ID: string
      GOOGLE_ANALYTICS_TRACKING_ID: string
      GOOGLE_ANALYTICS_DIMENSIONS: string
      HOTJAR_TRACKING_ID: number
      HOTJAR_TRACKING_VERSION: number
      SAC_CONTACT: string
      CHATBOT_URI: string
    }
  }
}

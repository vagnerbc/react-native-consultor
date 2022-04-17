import { AxiosInstance } from 'axios'

import { StoreMockBuilder } from 'presentation/store/__mock__'

import './utils/mock'

jest.mock('store', () => {
  const original = jest.requireActual('store')
  return {
    ...original,
    store: new StoreMockBuilder().build()
  }
})

jest.mock('axios', () => {
  const mockAxios = jest.createMockFromModule<AxiosInstance>('axios')
  return {
    ...jest.requireActual('axios'),
    create: jest.fn(() => mockAxios)
  }
})

export {}

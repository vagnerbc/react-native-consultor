import { jsonToCSV } from '../csv'

describe('Testes do utilitário de CSV', () => {
  window.URL.createObjectURL = jest.fn(
    () => 'blob:http://localhost:3333/b6e3fafe-2699-45c4-a8a2-831eb4c7cc94'
  )
  test('deve retornar a url de download do CSV', () => {
    const data = [
      {
        id: 1,
        name: 'teste',
        email: ''
      },
      {
        id: 2,
        name: 'teste 2',
        email: ''
      }
    ]

    const url = jsonToCSV<typeof data[0]>(data)
    expect(url).toEqual(
      'blob:http://localhost:3333/b6e3fafe-2699-45c4-a8a2-831eb4c7cc94'
    )
  })
})

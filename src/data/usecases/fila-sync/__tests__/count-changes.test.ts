/* eslint-disable no-proto */
import { FilaSyncMockBuilder } from '../../../../domain/models/__mocks__/fila-sync-mock'
import { RepositoryMock } from '../../../db/__mock__/repositoryMock'
import { Repository } from '../../../db/repository'
import { RepoCountChanges } from '../count-changes'

describe('Caso de uso de produtos', () => {
  const repository = new Repository(new RepositoryMock())

  const sut = new RepoCountChanges(repository)

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('deve retornar a quantidade de mudanças ainda não sincronizadas', async () => {
    const fila = new FilaSyncMockBuilder()
      .withDeleted(['1', '2'])
      .withUpdated([{ id: '3' }])
      .build()

    jest.spyOn(repository, 'getByFilter').mockResolvedValueOnce([fila])

    const count = await sut.exec()

    expect(count).toEqual(fila.data.deleted.length + fila.data.updated.length)
  })
})

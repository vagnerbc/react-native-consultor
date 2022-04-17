/* eslint-disable no-proto */
import { FilaSyncMockBuilder } from '../../../../domain/models/__mocks__/fila-sync-mock'
import { ProdutoMockBuilder } from '../../../../domain/models/__mocks__/produto-mock'
import { RepositoryMock } from '../../../db/__mock__/repositoryMock'
import { Repository } from '../../../db/repository'
import { RepoDelete } from '../delete'

describe('Caso de uso delete base', () => {
  const repository = new Repository(new RepositoryMock())

  const sut = new RepoDelete('produto', repository)

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('deve inserir os produtos deletados na fila de sync', async () => {
    const produto = new ProdutoMockBuilder().withId(2).build()
    const fila = new FilaSyncMockBuilder().build()

    jest
      .spyOn(repository, 'getByFilter')
      .mockResolvedValueOnce([fila])
      .mockResolvedValueOnce([produto])

    const spySaveOne = jest.spyOn(repository, 'saveOne')

    const deletedId = await sut.exec(2)

    expect(spySaveOne).toHaveBeenCalledWith('fila_sync', {
      ...fila,
      data: {
        deleted: [String(produto.id)],
        updated: fila.data.updated
      }
    })

    expect(deletedId).toEqual(produto.id)
  })

  test('não deve inserir os produtos deletados na fila de sync caso o mesmo já foi deletado', async () => {
    const produto = new ProdutoMockBuilder().withId(429).build()
    const fila = new FilaSyncMockBuilder().withDeleted(['429']).build()

    jest
      .spyOn(repository, 'getByFilter')
      .mockResolvedValueOnce([fila])
      .mockResolvedValueOnce([produto])

    const spySaveOne = jest.spyOn(repository, 'saveOne')

    const deletedId = await sut.exec(429)

    expect(spySaveOne).not.toHaveBeenCalled()
    expect(deletedId).toEqual(produto.id)
  })
})

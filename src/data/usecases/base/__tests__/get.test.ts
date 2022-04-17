/* eslint-disable no-proto */
import { FilaSyncMockBuilder } from '../../../../domain/models/__mocks__/fila-sync-mock'
import { ProdutoMockBuilder } from '../../../../domain/models/__mocks__/produto-mock'
import { ProdutoModel } from '../../../../domain/models/produto'
import { RepositoryMock } from '../../../db/__mock__/repositoryMock'
import { Repository } from '../../../db/repository'
import { GetFromRepo } from '../get'

describe('Caso de uso get base', () => {
  const repository = new Repository(new RepositoryMock())

  const sut = new GetFromRepo<ProdutoModel>('produto', repository)

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('deve buscar os produtos no repositório', async () => {
    const produtoAtualizado = new ProdutoMockBuilder().withId(1).build()
    const fila = new FilaSyncMockBuilder().build()

    jest.spyOn(repository, 'getByFilter').mockResolvedValue([fila])

    jest.spyOn(repository, 'getAll').mockResolvedValue([produtoAtualizado])

    const produtos = await sut.exec()

    expect(produtos.length).toEqual(1)
    expect(produtos[0].id).toEqual(produtoAtualizado.id)
  })

  test('deve retornar os dados mergeados se o produto já existir na fila de sync', async () => {
    const produto1 = new ProdutoMockBuilder()
      .withId(1)
      .withNome('Produto 1')
      .build()

    const produto2 = new ProdutoMockBuilder()
      .withId(2)
      .withNome('Produto 2')
      .build()

    const produtoAtualizadoFila = new ProdutoMockBuilder()
      .withId(1)
      .withNome('Produto Fila')

    const fila = new FilaSyncMockBuilder()
      .withUpdated([produtoAtualizadoFila.build()])
      .withDeleted(['2'])
      .build()

    jest.spyOn(repository, 'getByFilter').mockResolvedValue([fila])

    jest.spyOn(repository, 'getAll').mockResolvedValue([produto1, produto2])

    const produtos = await sut.exec()

    expect(produtos.length).toEqual(1)
    expect(produtos[0].id).toEqual(produto1.id)
    expect(produtos).toEqual([produtoAtualizadoFila.build()])
  })
})

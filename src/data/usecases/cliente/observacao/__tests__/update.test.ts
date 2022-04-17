/* eslint-disable no-proto */
import { ClienteObservacaoMockBuilder } from '../../../../../domain/models/__mocks__/cliente-observacao-mock'
import { FilaSyncMockBuilder } from '../../../../../domain/models/__mocks__/fila-sync-mock'
import { RepositoryMock } from '../../../../db/__mock__/repositoryMock'
import { Repository } from '../../../../db/repository'
import { RepoUpdate } from '../update'

describe('Caso de uso de atualizar observacao', () => {
  const repository = new Repository(new RepositoryMock())

  const sut = new RepoUpdate(repository)

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('deve salvar o observacao', async () => {
    const observacao = new ClienteObservacaoMockBuilder().withId(1).build()
    const fila = new FilaSyncMockBuilder()
      .withEntity('clienteObservacao')
      .build()

    const observacaoASalvar = {
      id: observacao.id,
      observacao: observacao.observacao
    }

    jest.spyOn(repository, 'getByFilter').mockResolvedValue([fila])
    const spySaveOne = jest
      .spyOn(repository, 'saveOne')
      .mockResolvedValueOnce(observacaoASalvar)

    await sut.exec(observacao)

    expect(spySaveOne).toHaveBeenNthCalledWith(
      1,
      'clienteObservacao',
      observacaoASalvar
    )

    expect(spySaveOne).toHaveBeenNthCalledWith(2, 'fila_sync', {
      data: {
        deleted: [],
        updated: [
          {
            id: observacao.id,
            observacao: observacao.observacao,
            indexed_id: undefined
          }
        ]
      },
      entity: 'clienteObservacao'
    })
  })
})

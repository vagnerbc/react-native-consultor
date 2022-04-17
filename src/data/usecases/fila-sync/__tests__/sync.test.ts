/* eslint-disable no-proto */
import { makeAxiosHttpClient } from '../../../../main/factories/http/axios-http-client-factory'
import { RepositoryMock } from '../../../db/__mock__/repositoryMock'
import { Repository } from '../../../db/repository'
import { SyncService } from '../../../services/sync/sync'
import { RemoteFilaSync } from '../sync'

describe('Caso de uso da fila de sync', () => {
  const syncBaseResponse = {
    embalagem: [],
    acao_venda: [],
    categoria: [],
    cliente: [],
    clienteContato: [],
    clienteObservacao: [],
    distribuicao: [],
    estoque: [],
    fila_sync: [],
    fornecedor: [],
    industria: [],
    lista: [],
    marca: [],
    motivo_cancelamento: [],
    pedido: [],
    produto: []
  }
  const axiosHttpClient = makeAxiosHttpClient()
  const service = new SyncService(axiosHttpClient)
  const repository = new Repository(new RepositoryMock())

  const sut = new RemoteFilaSync(service, repository)

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('deve buscar as mudancas do servidor por meio da sincronização', async () => {
    const spySave = jest.spyOn(repository, 'save')
    const spyDelete = jest.spyOn(repository, 'delete')

    jest.spyOn(service, 'getSync').mockResolvedValue({
      last_sync: '88875',
      deleted: {
        ...syncBaseResponse,
        embalagem: ['1', '2']
      },
      updated: {
        ...syncBaseResponse,
        categoria: [{ id: 3, mae: 4, nome: 'Categoria 3', ordem: 45 }]
      }
    })

    await sut.getSync()

    expect(spySave).toHaveBeenNthCalledWith(1, 'categoria', [
      { id: 3, mae: 4, nome: 'Categoria 3', ordem: 45 }
    ])
    expect(spyDelete).toHaveBeenNthCalledWith(1, 'embalagem', {
      ids: ['1', '2']
    })
  })

  test('deve realizar a sincronização', async () => {
    const spySendSync = jest.spyOn(sut, 'sendSync')
    const spyGetSync = jest.spyOn(sut, 'getSync')

    await sut.exec()

    expect(spySendSync).toHaveBeenCalled()
    expect(spyGetSync).toHaveBeenCalled()
  })
})

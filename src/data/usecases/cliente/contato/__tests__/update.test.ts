/* eslint-disable no-proto */
import { ClienteContatoMockBuilder } from '../../../../../domain/models/__mocks__/cliente-contato-mock'
import { FilaSyncMockBuilder } from '../../../../../domain/models/__mocks__/fila-sync-mock'
import { RepositoryMock } from '../../../../db/__mock__/repositoryMock'
import { Repository } from '../../../../db/repository'
import { RepoUpdate } from '../update'

describe('Caso de uso de atualizar contato', () => {
  const repository = new Repository(new RepositoryMock())

  const sut = new RepoUpdate(repository)

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('deve salvar o contato', async () => {
    const contato = new ClienteContatoMockBuilder().withId(1).build()
    const fila = new FilaSyncMockBuilder().withEntity('clienteContato').build()

    const contatoASalvar = {
      id: contato.id,
      email: contato.email,
      telefone: contato.telefone,
      principal: contato.principal,
      whatsapp: contato.whatsapp,
      responsavel: contato.responsavel
    }

    jest.spyOn(repository, 'getByFilter').mockResolvedValue([fila])
    const spySaveOne = jest
      .spyOn(repository, 'saveOne')
      .mockResolvedValueOnce(contatoASalvar)

    await sut.exec(contato)

    expect(spySaveOne).toHaveBeenNthCalledWith(
      1,
      'clienteContato',
      contatoASalvar
    )

    expect(spySaveOne).toHaveBeenNthCalledWith(2, 'fila_sync', {
      data: {
        deleted: [],
        updated: [
          {
            id: contato.id,
            email: contato.email,
            telefone: contato.telefone,
            principal: contato.principal,
            whatsapp: contato.whatsapp,
            responsavel: contato.responsavel,
            indexed_id: undefined
          }
        ]
      },
      entity: 'clienteContato'
    })
  })
})

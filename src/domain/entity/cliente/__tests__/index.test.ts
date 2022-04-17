import { sortValues } from 'utils/array'

import { Cliente, ClienteContato, ClienteObservacao } from '..'
import { ClienteContatoMockBuilder } from '../../../../domain/models/__mocks__/cliente-contato-mock'
import { ClienteMockBuilder } from '../../../../domain/models/__mocks__/cliente-mock'
import { ClienteObservacaoMockBuilder } from '../../../../domain/models/__mocks__/cliente-observacao-mock'

describe('Testes de entidade Cliente', () => {
  const clientes = [
    new ClienteMockBuilder().withId(1).build(),
    new ClienteMockBuilder().withId(2).build()
  ]

  test('Deve retornar o cliente pelo id informado', () => {
    const expected = new ClienteMockBuilder().withId(3).build()

    const sut = Cliente.getById([...clientes, expected], 3)

    expect(sut).toEqual(expected)
  })

  test('Deve retornar undefined caso não encontre o cliente pelo id informado', () => {
    const sut = Cliente.getById(clientes, 4)

    expect(sut).toBeUndefined()
  })

  test('Deve filtrar a lista pelo termo nos campos nome, razao_social, cnpj, cod_fornecedor', () => {
    const expected = sortValues(
      [
        new ClienteMockBuilder().withId(3).withNome('TesteBusca').build(),
        new ClienteMockBuilder().withId(5).withCnpj('TesteBusca').build(),
        new ClienteMockBuilder()
          .withId(6)
          .withRazaoSocial('TesteBusca')
          .build(),
        new ClienteMockBuilder()
          .withId(7)
          .withCodFornecedor('TesteBusca')
          .build()
      ],
      (a, b) => a.nome.localeCompare(b.nome)
    )

    const sut = Cliente.getFiltered([...clientes, ...expected], 'TesteBusca')
    expect(sut).toEqual(expected)
  })

  describe('Testes da entidade ClienteContato', () => {
    const contatos = [
      new ClienteContatoMockBuilder().withId(1).build(),
      new ClienteContatoMockBuilder().withId(2).build()
    ]

    test('Deve retornar o contato pelo id informado', () => {
      const expected = new ClienteContatoMockBuilder().withId(3).build()

      const sut = ClienteContato.getById([...contatos, expected], 3)

      expect(sut).toEqual(expected)
    })

    test('Deve retornar undefined caso não encontre o contato pelo id informado', () => {
      const sut = ClienteContato.getById(contatos, 4)

      expect(sut).toBeUndefined()
    })

    test('Deve retornar a lista de contatos do cliente', () => {
      const expected = new ClienteContatoMockBuilder().withIdCliente(2).build()

      const sut = ClienteContato.getByClienteId([...contatos, expected], 2)

      expect(sut).toEqual([expected])
    })
  })

  describe('Testes da entidade ClienteObservacao', () => {
    const contatos = [
      new ClienteObservacaoMockBuilder().withId(1).build(),
      new ClienteObservacaoMockBuilder().withId(2).build()
    ]

    test('Deve retornar a observacao pelo id informado', () => {
      const expected = new ClienteObservacaoMockBuilder().withId(3).build()

      const sut = ClienteObservacao.getById([...contatos, expected], 3)

      expect(sut).toEqual(expected)
    })

    test('Deve retornar undefined caso não encontre a observacao pelo id informado', () => {
      const sut = ClienteObservacao.getById(contatos, 4)

      expect(sut).toBeUndefined()
    })

    test('Deve retornar a lista de observacoes do cliente', () => {
      const expected = new ClienteObservacaoMockBuilder()
        .withIdCliente(2)
        .build()

      const sut = ClienteObservacao.getByClienteId([...contatos, expected], 2)

      expect(sut).toEqual([expected])
    })
  })
})

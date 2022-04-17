import faker from '@faker-js/faker'

import { ClienteObservacaoModel } from '../cliente'

export class ClienteObservacaoMockBuilder {
  private id: number = faker.datatype.number()
  private id_consultor: number = faker.datatype.number()
  private id_cliente: number = faker.datatype.number()
  private observacao: string = faker.lorem.sentence(15)

  withId(value: number) {
    this.id = value

    return this
  }

  withIdConsultor(value: number) {
    this.id_consultor = value

    return this
  }

  withIdCliente(value: number) {
    this.id_cliente = value

    return this
  }

  withObservacao(value: string) {
    this.observacao = value

    return this
  }

  build(): ClienteObservacaoModel {
    return {
      id: this.id,
      id_consultor: this.id_consultor,
      id_cliente: this.id_cliente,
      observacao: this.observacao
    }
  }
}

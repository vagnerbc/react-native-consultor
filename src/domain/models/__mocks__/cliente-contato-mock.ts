import faker from '@faker-js/faker'

import { ClienteContatoModel } from '../cliente'

export class ClienteContatoMockBuilder {
  private id: number = faker.datatype.number()
  private id_consultor: number = faker.datatype.number()
  private id_cliente: number = faker.datatype.number()
  private id_fornecedor: number = faker.datatype.number()
  private responsavel: string = faker.lorem.sentence(15)
  private telefone: string = faker.phone.phoneNumber()
  private whatsapp: string = faker.phone.phoneNumber()
  private email: string = faker.internet.email()
  private principal: boolean = faker.datatype.boolean()

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

  withIdFornecedor(value: number) {
    this.id_fornecedor = value

    return this
  }

  withResponsavel(value: string) {
    this.responsavel = value

    return this
  }

  withTelefone(value: string) {
    this.telefone = value

    return this
  }

  withWhatsapp(value: string) {
    this.whatsapp = value

    return this
  }

  withEmail(value: string) {
    this.email = value

    return this
  }

  withPrincipal(value: boolean) {
    this.principal = value

    return this
  }

  build(): ClienteContatoModel {
    return {
      id: this.id,
      id_consultor: this.id_consultor,
      id_cliente: this.id_cliente,
      id_fornecedor: this.id_fornecedor,
      responsavel: this.responsavel,
      telefone: this.telefone,
      whatsapp: this.whatsapp,
      email: this.email,
      principal: this.principal
    }
  }
}

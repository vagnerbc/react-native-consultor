import faker from '@faker-js/faker'

import { ClienteModel } from '../cliente'

export class ClienteMockBuilder {
  private id: number = faker.datatype.number()
  private nome: string = faker.word.noun()
  private razao_social: string = faker.word.noun()
  private cnpj: string = faker.datatype.number().toString()
  private cep: string = faker.address.zipCode()
  private uf: string = faker.address.stateAbbr()
  private cidade: string = faker.address.city()
  private bairro: string = faker.datatype.string()
  private logradouro: string = faker.address.streetName()
  private numero: string = faker.address.streetAddress()
  private complemento: string = faker.address.secondaryAddress()
  private cod_fornecedor: string = faker.datatype.number().toString()

  withId(value: number) {
    this.id = value

    return this
  }

  withNome(value: string) {
    this.nome = value

    return this
  }

  withCnpj(value: string) {
    this.cnpj = value

    return this
  }

  withRazaoSocial(value: string) {
    this.razao_social = value

    return this
  }

  withCep(value: string) {
    this.cep = value

    return this
  }

  withUf(value: string) {
    this.uf = value

    return this
  }

  withCidade(value: string) {
    this.cidade = value

    return this
  }

  withBairro(value: string) {
    this.bairro = value

    return this
  }

  withLogradouro(value: string) {
    this.logradouro = value

    return this
  }

  withNumero(value: string) {
    this.numero = value

    return this
  }

  withComplemento(value: string) {
    this.complemento = value

    return this
  }

  withCodFornecedor(value: string) {
    this.cod_fornecedor = value

    return this
  }

  build(): ClienteModel {
    return {
      id: this.id,
      nome: this.nome,
      razao_social: this.razao_social,
      cnpj: this.cnpj,
      cep: this.cep,
      uf: this.uf,
      cidade: this.cidade,
      bairro: this.bairro,
      logradouro: this.logradouro,
      numero: this.numero,
      complemento: this.complemento,
      cod_fornecedor: this.cod_fornecedor
    }
  }
}

import {
  ClienteContatoModel,
  ClienteModel,
  ClienteObservacaoModel
} from '../../../domain/models/cliente'
import { filterValue, findOneValue, sortValues } from '../../../utils/array'

export class Cliente {
  static getById(clientes: ClienteModel[], value: number) {
    return findOneValue<ClienteModel>(clientes, 'id', value)
  }

  static getFiltered(clientes: ClienteModel[], term: string) {
    const filtered = !term
      ? clientes
      : clientes.filter(cliente => {
          const { cnpj, razao_social, nome, cod_fornecedor } = cliente
          return (
            nome.includes(term) ||
            razao_social.includes(term) ||
            cnpj.includes(term) ||
            cod_fornecedor.includes(term)
          )
        })
    return sortValues(filtered, (a, b) => a.nome.localeCompare(b.nome))
  }
}

export class ClienteContato {
  static getById(contatos: ClienteContatoModel[], value: number) {
    return findOneValue<ClienteContatoModel>(contatos, 'id', value)
  }

  static getByClienteId(contatos: ClienteContatoModel[], value: number) {
    return filterValue<ClienteContatoModel>(contatos, 'id_cliente', value)
  }
}

export class ClienteObservacao {
  static getById(observacoes: ClienteObservacaoModel[], value: number) {
    return findOneValue<ClienteObservacaoModel>(observacoes, 'id', value)
  }

  static getByClienteId(observacoes: ClienteObservacaoModel[], value: number) {
    return filterValue<ClienteObservacaoModel>(observacoes, 'id_cliente', value)
  }
}

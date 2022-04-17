export type RemoteClienteContatoModel = {
  ['id']: number
  ['id_consultor']: number
  ['id_cliente']: number
  ['id_fornecedor']: number
  ['responsavel']: string
  ['telefone']: string
  ['whatsapp']: string
  ['email']: string
  ['principal']: boolean
}

export type RemoteClienteObservacaoModel = {
  ['id']: number
  ['id_consultor']: number
  ['id_cliente']: number
  ['observacao']: string
}

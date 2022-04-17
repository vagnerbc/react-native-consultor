export type ClienteModel = {
  ['id']: number
  ['nome']: string
  ['razao_social']: string
  ['cnpj']: string
  ['cep']: string
  ['uf']: string
  ['cidade']: string
  ['bairro']: string
  ['logradouro']: string
  ['numero']: string
  ['complemento']: string
  ['cod_fornecedor']: string
  ['indexed_id']?: number
}

export type ClienteContatoModel = {
  ['id']: number
  ['id_consultor']: number
  ['id_cliente']: number
  ['id_fornecedor']: number
  ['responsavel']: string
  ['telefone']: string
  ['whatsapp']: string
  ['email']: string
  ['principal']: boolean
  ['indexed_id']?: number
}

export type ClienteObservacaoModel = {
  ['id']: number
  ['id_consultor']: number
  ['id_cliente']: number
  ['observacao']: string
  ['indexed_id']?: number
}

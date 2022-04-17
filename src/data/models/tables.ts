import {
  ClienteContatoModel,
  ClienteModel,
  ClienteObservacaoModel
} from '../../domain/models/cliente'
import { FilaSyncModel } from './fila-sync'

export type DBTables =
  | 'cliente'
  | 'clienteContato'
  | 'clienteObservacao'
  | 'fila_sync'

export type DBSchema = {
  [key in DBTables]: string
}

export const clienteIndexes: (keyof ClienteModel)[] = [
  'indexed_id',
  'id',
  'cnpj'
]

export const clienteContatoIndexes: (keyof ClienteContatoModel)[] = [
  'indexed_id',
  'id',
  'responsavel'
]

export const clienteObservacaoIndexes: (keyof ClienteObservacaoModel)[] = [
  'indexed_id',
  'id',
  'observacao'
]

export const filaSyncIndexes: (keyof FilaSyncModel)[] = ['indexed_id', 'entity']

export const DBSchemaAndIndexes: DBSchema = {
  cliente: `++${clienteIndexes.join(', ')}`,
  clienteContato: `++${clienteContatoIndexes.join(', ')}`,
  clienteObservacao: `++${clienteObservacaoIndexes.join(', ')}`,
  fila_sync: `++${filaSyncIndexes.join(', ')}`
}

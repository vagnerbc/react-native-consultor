import { FilaSyncModel } from '../../data/models/fila-sync'
import {
  ClienteContatoModel,
  ClienteModel,
  ClienteObservacaoModel
} from './cliente'

export interface SyncEntities {
  cliente: ClienteModel
  clienteContato: ClienteContatoModel
  clienteObservacao: ClienteObservacaoModel
  fila_sync: FilaSyncModel
}

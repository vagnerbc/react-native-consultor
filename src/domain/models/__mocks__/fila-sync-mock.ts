import { FilaSyncModel } from '../../../data/models/fila-sync'
import { DBTables } from '../../../data/models/tables'

export class FilaSyncMockBuilder<T = any> {
  private entity: DBTables = 'pedido'
  private updated: FilaSyncModel<T>['data']['updated'] = []
  private deleted: string[] = []

  withEntity(value: DBTables) {
    this.entity = value
    return this
  }

  withUpdated(value: FilaSyncModel<T>['data']['updated']) {
    this.updated = value
    return this
  }

  withDeleted(value: string[]) {
    this.deleted = value
    return this
  }

  build(): FilaSyncModel<T> {
    return {
      data: {
        deleted: this.deleted,
        updated: this.updated
      },
      entity: this.entity
    }
  }
}

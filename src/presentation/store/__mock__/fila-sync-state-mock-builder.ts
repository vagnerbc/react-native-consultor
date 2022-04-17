import { State, initialState } from '../ducks/fila-sync/index'

export class FilaSyncStateMockBuilder {
  private countChanges = 0

  withCountChanges(value: number) {
    this.countChanges = value
    return this
  }

  build(): State {
    return { ...initialState, countChanges: this.countChanges }
  }
}

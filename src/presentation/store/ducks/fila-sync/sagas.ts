import { call, put, takeLatest } from 'redux-saga/effects'

import { makeSync, makeCountChanges } from 'main/factories/usecases/fila-sync'

import { actions } from './slice'

export const sagas = [
  takeLatest(actions.sync.type, syncSaga),
  takeLatest(actions.countChanges.type, countChangesSaga)
]

function* syncSaga() {
  try {
    const getFromRepoUseCase = makeSync()
    yield call(() => getFromRepoUseCase.exec())

    yield put(actions.syncSuccess())
  } catch (error) {
    // eslint-disable-next-line no-console
    console.warn(error)
    yield put(actions.syncFailure())
  }
}

function* countChangesSaga() {
  try {
    const countChangesUseCase = makeCountChanges()
    const count: number = yield call(() => countChangesUseCase.exec())
    yield put(actions.setCountChanges(count))
  } catch (error) {
    // eslint-disable-next-line no-console
    console.warn(error)
  }
}

import { PayloadAction } from '@reduxjs/toolkit'
import { call, put, takeLatest } from 'redux-saga/effects'

import { DBTables } from 'data/models/tables'
import { ClienteObservacaoModel } from 'domain/models/cliente'
import { makeLocalStorageAdapter } from 'main/factories/cache/local-storage-adapter-factory'
import { makeGetFromRepo } from 'main/factories/usecases/base'
import { makeDelete } from 'main/factories/usecases/base/delete-factory'
import { makeUpdate } from 'main/factories/usecases/cliente/observacao/update-factory'

import { actions } from './slice'

const localStorageAdapter = makeLocalStorageAdapter()

export const sagas = [
  takeLatest(actions.getFromRepo.type, getFromRepoSaga),
  takeLatest(actions.update.type, updateSaga),
  takeLatest(actions.delete.type, deleteSaga)
]

function* getFromRepoSaga(action: PayloadAction<boolean>) {
  try {
    const alteracoes: DBTables[] = JSON.parse(
      localStorageAdapter.get('sync_changes') || '[]'
    )

    if (!action.payload && !alteracoes.includes('clienteObservacao')) return

    const getFromRepoUseCase =
      makeGetFromRepo<ClienteObservacaoModel>('clienteObservacao')
    const observacoes: ClienteObservacaoModel[] = yield call(() =>
      getFromRepoUseCase.exec()
    )
    yield put(actions.getFromRepoSuccess(observacoes))
  } catch (error) {
    // eslint-disable-next-line no-console
    console.warn(error)
    yield put(actions.getFromRepoFailure())
  }
}

function* updateSaga(action: PayloadAction<ClienteObservacaoModel>) {
  try {
    const updateUseCase = makeUpdate()
    const observacao: ClienteObservacaoModel = yield call(() =>
      updateUseCase.exec(action.payload)
    )

    yield put(actions.updateSuccess(observacao))
  } catch (error) {
    // eslint-disable-next-line no-console
    console.warn(error)
    yield put(actions.updateFailure())
  }
}

function* deleteSaga(action: PayloadAction<number>) {
  try {
    const deleteUseCase = makeDelete('clienteObservacao')
    const observacaoId: number = yield call(() =>
      deleteUseCase.exec(action.payload)
    )
    yield put(actions.deleteSuccess(observacaoId))
  } catch (error) {
    // eslint-disable-next-line no-console
    console.warn(error)
    yield put(actions.deleteFailure())
  }
}

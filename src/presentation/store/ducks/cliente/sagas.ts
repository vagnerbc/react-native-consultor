import { PayloadAction } from '@reduxjs/toolkit'
import { call, put, takeLatest } from 'redux-saga/effects'

import { DBTables } from 'data/models/tables'
import { ClienteModel } from 'domain/models/cliente'
import { makeLocalStorageAdapter } from 'main/factories/cache/local-storage-adapter-factory'
import { makeGetFromRepo } from 'main/factories/usecases/base'

import { actions } from './slice'

const localStorageAdapter = makeLocalStorageAdapter()

export const sagas = [takeLatest(actions.getFromRepo.type, getFromRepoSaga)]

function* getFromRepoSaga(action: PayloadAction<boolean>) {
  try {
    const alteracoes: DBTables[] = JSON.parse(
      localStorageAdapter.get('sync_changes') || '[]'
    )

    if (!action.payload && !alteracoes.includes('cliente')) return

    const getFromRepoUseCase = makeGetFromRepo<ClienteModel>('cliente')
    const clientes: ClienteModel[] = yield call(() => getFromRepoUseCase.exec())
    yield put(actions.getFromRepoSuccess(clientes))
  } catch (error) {
    // eslint-disable-next-line no-console
    console.warn(error)
    yield put(actions.getFromRepoFailure())
  }
}

import { PayloadAction } from '@reduxjs/toolkit'
import { call, put, takeLatest } from 'redux-saga/effects'

import { DBTables } from 'data/models/tables'
import { ClienteContatoModel } from 'domain/models/cliente'
import { makeLocalStorageAdapter } from 'main/factories/cache/local-storage-adapter-factory'
import { makeGetFromRepo } from 'main/factories/usecases/base'
import { makeDelete } from 'main/factories/usecases/base/delete-factory'
import { makeUpdate } from 'main/factories/usecases/cliente/contato/update-factory'

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

    if (!action.payload && !alteracoes.includes('clienteContato')) return

    const getFromRepoUseCase =
      makeGetFromRepo<ClienteContatoModel>('clienteContato')
    const contatos: ClienteContatoModel[] = yield call(() =>
      getFromRepoUseCase.exec()
    )
    yield put(actions.getFromRepoSuccess(contatos))
  } catch (error) {
    // eslint-disable-next-line no-console
    console.warn(error)
    yield put(actions.getFromRepoFailure())
  }
}

function* updateSaga(action: PayloadAction<ClienteContatoModel>) {
  try {
    const updateUseCase = makeUpdate()
    const contato: ClienteContatoModel = yield call(() =>
      updateUseCase.exec(action.payload)
    )

    yield put(actions.updateSuccess(contato))
  } catch (error) {
    // eslint-disable-next-line no-console
    console.warn(error)
    yield put(actions.updateFailure())
  }
}

function* deleteSaga(action: PayloadAction<number>) {
  try {
    const deleteUseCase = makeDelete('clienteContato')
    const contatoId: number = yield call(() =>
      deleteUseCase.exec(action.payload)
    )
    yield put(actions.deleteSuccess(contatoId))
  } catch (error) {
    // eslint-disable-next-line no-console
    console.warn(error)
    yield put(actions.deleteFailure())
  }
}

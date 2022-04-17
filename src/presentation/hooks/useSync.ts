import { useEffect, useCallback, useState } from 'react'

import { makeLocalStorageAdapter } from 'main/factories/cache/local-storage-adapter-factory'
import {
  store,
  actions,
  useSelector,
  getFromRepoActions
} from 'presentation/store'

import { useNetwork } from './useNetwork'

const localStorageAdapter = makeLocalStorageAdapter()

export const useSync = (segundos = 16) => {
  const isOnline = useNetwork()
  const [forceLoad, setForceLoad] = useState(true)
  const syncStatus = useSelector(state => state.filaSync.syncStatus)
  const lastSync = localStorageAdapter.get('last_sync')

  const sync = useCallback(() => {
    store.dispatch(actions.filaSync.sync())
  }, [])

  useEffect(() => {
    if (
      ['success', 'failure'].includes(syncStatus) ||
      (forceLoad && lastSync !== null)
    ) {
      getFromRepoActions.forEach(entity => {
        store.dispatch(actions[entity].getFromRepo(forceLoad))
      })

      setForceLoad(false)
    }
  }, [forceLoad, lastSync, syncStatus])

  useEffect(() => {
    sync()

    const timeoutHash = setTimeout(function run() {
      sync()
      setTimeout(run, segundos * 1000)
    }, segundos * 1000)

    if (!isOnline) {
      clearTimeout(timeoutHash)
    }

    return () => clearTimeout(timeoutHash)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [segundos, isOnline])
}

import { useCallback, useEffect } from 'react'

import { actions, store } from 'presentation/store'

export const useChanges = () => {
  const countChanges = useCallback(() => {
    store.dispatch(actions.filaSync.countChanges())
  }, [])

  useEffect(() => {
    countChanges()
  }, [countChanges])
}

/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { Dispatch, MiddlewareAPI } from 'redux'

import { State } from 'presentation/store/ducks'

export * from './authMiddleware'

export type Middleware<
  _DispatchExt = {},
  S = State,
  D extends Dispatch = Dispatch
> = {
  (api: MiddlewareAPI<D, S>): (
    next: D
  ) => (action: D extends Dispatch<infer A> ? A : never) => any
}

/* eslint-disable import/export */
/* eslint-disable @typescript-eslint/no-explicit-any */
import '@testing-library/jest-dom/extend-expect'
import { render, RenderOptions } from '@testing-library/react-native'
import userEvent from '@testing-library/user-event'
import React from 'react'
import { Provider } from 'react-redux'

import { StoreMockBuilder } from 'presentation/store/__mock__'
import { StateMockBuilder } from 'presentation/store/__mock__/state-mock-builder'
import { State } from 'presentation/store/ducks'

interface CustomRenderOptions extends RenderOptions {
  initialState: State
}

const wrapperProvider = (initialState: State) => {
  const store = new StoreMockBuilder().withState(initialState).build()

  const wrapper = ({ children }: any) => {
    return <Provider store={store}>{children}</Provider>
  }

  return wrapper
}

const customRender = (
  component: React.ReactElement,
  options: CustomRenderOptions = {
    initialState: new StateMockBuilder().build()
  }
) => {
  const wrapper = wrapperProvider(options.initialState)

  return render(component, { wrapper, ...options })
}

export * from '@testing-library/react-native'
export { customRender as render, userEvent }

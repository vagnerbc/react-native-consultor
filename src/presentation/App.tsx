import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import { Provider as ReduxProvider } from 'react-redux'

import Home from 'presentation/screens'

// import Authentication from '../components/template/authentication'
import { store } from './store'

const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <ReduxProvider store={store}>
      {/* <Authentication /> */}

      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={Home}
            options={{ title: 'Welcome' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ReduxProvider>
  )
}

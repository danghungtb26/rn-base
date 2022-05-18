import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { RootNavigationParamList, routes } from './routes'
import HomeScreen from '../features/Home'
import TextScreen from '../features/Text'
import { AlertScreen } from '../features/Alert'
import ButtonScreen from '../features/Button'
import InputFilter from '../features/Input/FilterInput'

const Stack = createNativeStackNavigator<RootNavigationParamList>()

const MainStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name={routes.Home} component={HomeScreen} />
      <Stack.Screen name={routes.Text} component={TextScreen} />
      <Stack.Screen name={routes.Alert} component={AlertScreen} />
      <Stack.Screen name={routes.Button} component={ButtonScreen} />
      <Stack.Screen name={routes.Input} component={InputFilter} />
    </Stack.Navigator>
  )
}

export default MainStack

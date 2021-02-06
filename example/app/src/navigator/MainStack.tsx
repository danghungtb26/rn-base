import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { RootNavigationParamList, routes } from './routes'
import HomeScreen from '../features/Home'
import TextScreen from '../features/Text'
import { AlertScreen } from '../features/Alert'
import ButtonScreen from '../features/Button'
const Stack = createStackNavigator<RootNavigationParamList>()

const MainStack = () => {
  return (
    <Stack.Navigator screenOptions={{ gestureEnabled: true, cardShadowEnabled: true }}>
      <Stack.Screen name={routes.Home} component={HomeScreen} />
      <Stack.Screen name={routes.Text} component={TextScreen} />
      <Stack.Screen name={routes.Alert} component={AlertScreen} />
      <Stack.Screen name={routes.Button} component={ButtonScreen} />
    </Stack.Navigator>
  )
}

export default MainStack

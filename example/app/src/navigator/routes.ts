import type { RouteProp } from '@react-navigation/core'
import type { StackNavigationProp } from '@react-navigation/stack'

export type RootNavigationParamList = {
  Home: undefined
  Text: {
    id?: number
  }
  Alert: undefined
}

export const routes: Record<keyof RootNavigationParamList, keyof RootNavigationParamList> = {
  Home: 'Home',
  Text: 'Text',
  Alert: 'Alert',
}

export interface HomeScreenNavigationProps {
  navigation: StackNavigationProp<RootNavigationParamList, 'Home'>
  route: RouteProp<RootNavigationParamList, 'Home'>
}

export interface TextScreenNavigationProps {
  navigation: StackNavigationProp<RootNavigationParamList, 'Text'>
  route: RouteProp<RootNavigationParamList, 'Text'>
}

export interface AlertScreenNavigationProps {
  navigation: StackNavigationProp<RootNavigationParamList, 'Alert'>
  route: RouteProp<RootNavigationParamList, 'Alert'>
}

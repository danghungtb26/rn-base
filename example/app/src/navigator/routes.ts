import type { RouteProp } from '@react-navigation/core'
import type { NativeStackNavigationProp } from '@react-navigation/native-stack'

export type RootNavigationParamList = {
  Home: undefined
  Text: {
    id?: number
  }
  Alert: undefined
  Button: undefined
  Input: undefined
}

export const routes: Record<keyof RootNavigationParamList, keyof RootNavigationParamList> = {
  Home: 'Home',
  Text: 'Text',
  Alert: 'Alert',
  Button: 'Button',
  Input: 'Input',
}

export interface HomeScreenNavigationProps {
  navigation: NativeStackNavigationProp<RootNavigationParamList, 'Home'>
  route: RouteProp<RootNavigationParamList, 'Home'>
}

export interface TextScreenNavigationProps {
  navigation: NativeStackNavigationProp<RootNavigationParamList, 'Text'>
  route: RouteProp<RootNavigationParamList, 'Text'>
}

export interface AlertScreenNavigationProps {
  navigation: NativeStackNavigationProp<RootNavigationParamList, 'Alert'>
  route: RouteProp<RootNavigationParamList, 'Alert'>
}

export interface ButtonScreenNavigationProps {
  navigation: NativeStackNavigationProp<RootNavigationParamList, 'Button'>
  route: RouteProp<RootNavigationParamList, 'Button'>
}

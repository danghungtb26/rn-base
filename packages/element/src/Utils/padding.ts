import type { ViewStyle } from 'react-native'
import type { PaddingProps } from '../types'
import { calculateValue, removeUndefined } from './other'

export const calculatePadding: (p: PaddingProps) => ViewStyle = props => {
  const { padding, ...rest } = props
  return {
    ...calculateValue(padding, 'padding'),
    ...removeUndefined<Omit<PaddingProps, 'padding'>>(rest),
  }
}

import type { ViewStyle } from 'react-native'
import type { BorderProps } from '../types'
import { removeUndefined } from './other'

export const calculateBorder: (p: Omit<BorderProps, 'radius'>) => ViewStyle = props => {
  const { border, borderColor, borderWidth, ...rest } = props
  return {
    ...calculateBorderForType(border, 'Width'),
    ...calculateBorderForType(borderWidth, 'Width'),
    ...calculateBorderForType(borderColor, 'Color'),
    ...removeUndefined<typeof rest>(rest),
  }
}

export const calculateBorderForType: (
  value?: number | string | number[] | string[],
  type?: 'Width' | 'Color',
) => ViewStyle = (value, type = 'Width') => {
  if (typeof value === 'number' || typeof value === 'string') {
    return {
      [`border${type}`]: value,
    }
  }

  if (Array.isArray(value)) {
    const state: Record<string, any> = {}

    if (value.length <= 1 && value.length > 0) {
      state[`border${type}`] = value[0]
    }

    if (value.length < 4 && value.length > 1) {
      state[`borderTop${type}`] = value[1]
      state[`borderBottom${type}`] = value[1]
      state[`borderLeft${type}`] = value[0]
      state[`borderRight${type}`] = value[0]
    } else {
      state[`borderTop${type}`] = value[0]

      state[`borderBottom${type}`] = value[1]

      state[`borderLeft${type}`] = value[2]

      state[`borderRight${type}`] = value[3]
    }

    return state
  }
  return {}
}

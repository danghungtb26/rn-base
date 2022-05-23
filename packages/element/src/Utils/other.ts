import isEqual from 'lodash.isequal'
import type { ViewStyle } from 'react-native'
import type { NumberOrString } from '../types'

export const calculateValue: (
  value?: NumberOrString | NumberOrString[],
  type?: 'margin' | 'padding'
) => ViewStyle = (value, type = 'margin') => {
  if (typeof value === 'number') {
    return {
      [type]: value,
    }
  }

  if (Array.isArray(value)) {
    const state: ViewStyle = {}

    if (value.length <= 1 && value.length > 0) {
      state[`${type}`] = value[0]
    }

    if (value.length < 4 && value.length > 1) {
      state[`${type}Vertical`] = value[1]

      state[`${type}Horizontal`] = value[0]
    } else {
      state[`${type}Top`] = value[0]

      state[`${type}Bottom`] = value[1]

      state[`${type}Left`] = value[2]

      state[`${type}Right`] = value[3]
    }

    return state
  }
  return {}
}

export const removeUndefined: <T extends Record<string, any>>(value: T) => T = value => {
  // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
  Object.keys(value).forEach(key => (value[key] === undefined ? delete value[key] : {}))
  return value
}

export const equal = (p: any, n: any) => isEqual(p, n)

export const hasProperty = (value: any) => {
  return !!Object.keys(value).length
}

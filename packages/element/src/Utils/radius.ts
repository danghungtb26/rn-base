import type { ViewStyle } from 'react-native'

export const calculateRadius: (radius?: number | number[]) => ViewStyle = radius => {
  if (typeof radius === 'number') {
    return { borderRadius: radius }
  }

  if (Array.isArray(radius)) {
    if (radius.length <= 0) return {}

    if (radius.length <= 1) {
      return { borderRadius: radius[0] }
    }
    if (radius.length <= 2) {
      return {
        borderTopLeftRadius: radius[0],
        borderTopRightRadius: radius[0],
        borderBottomRightRadius: radius[1],
        borderBottomLeftRadius: radius[1],
      }
    }

    if (radius.length <= 4) {
      return {
        borderTopLeftRadius: radius[0],
        borderTopRightRadius: radius[1],
        borderBottomRightRadius: radius[2],
        borderBottomLeftRadius: radius[3],
      }
    }
  }

  return {}
}

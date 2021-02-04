import { Dimensions, Platform, PixelRatio } from 'react-native'
import { getOffset } from '../IphoneXHelper'

const { width, height } = Dimensions.get('window')

const SCREEN_WIDTH = width
const SCREEN_HEIGHT = height - getOffset().top - getOffset().bottom

let fixed_width = 375
let fixed_height = 812 - 78

export const setDimensions: (w: number, h: number) => void = (w, h) => {
  fixed_width = w
  fixed_height = h
}

// based on iPhoneX's scale
const wscale: number = SCREEN_WIDTH / fixed_width
const hscale: number = SCREEN_HEIGHT / fixed_height

/**
 * func tinh toán lại width theo kich thước của từng device
 * @param size
 */

export const widthLize: (size: number | number[], w?: number) => number | number[] = (size, w) => {
  if (Array.isArray(size)) {
    return size.map(i => widthLize(i, w) as number)
  }

  if (typeof size === 'number') {
    const newSize = size * (w || wscale)
    if (Platform.OS === 'ios') {
      return Math.round(PixelRatio.roundToNearestPixel(newSize))
    }
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2
  }

  return size
}

/**
 * func tính toán lại height theo kích thước của device
 * @param size
 */
export const heightLize: (size: number | number[], h?: number) => number | number[] = (size, h) => {
  if (Array.isArray(size)) {
    return size.map(i => heightLize(i, h)) as number[]
  }

  const newSize = size * (h || hscale)
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize))
  }
  return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2
}

/**
 * func tinhs toan fontsize theo kích thước của device
 */

export const fontSizeLine: (size: number, w?: number, h?: number) => number = (size, w, h) => {
  return Math.round((size * (w || wscale)) / (h || hscale) - (Platform.OS === 'android' ? 0.5 : 0))
}

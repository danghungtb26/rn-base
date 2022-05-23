import { Dimensions, Platform, PixelRatio } from 'react-native'
import { getOffset } from '../IphoneXHelper'

const { width, height } = Dimensions.get('window')

const SCREEN_WIDTH = width
const SCREEN_HEIGHT = height - getOffset().top - getOffset().bottom

let fixed_width = 375
let fixed_height = 812 - 78

//
export const setDimensions: (w: number, h: number) => void = (w, h) => {
  fixed_width = w
  fixed_height = h
}

// based on iPhoneX's scale
const wscale: number = SCREEN_WIDTH / fixed_width
const hscale: number = SCREEN_HEIGHT / fixed_height

/**
 * @param size
 */

export const widthLize: (size: number, w?: number) => number = (size, w) => {
  const newSize = size * (w || wscale)
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize))
  }
  return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2
}

/**
 * @param size
 */
export const heightLize: (size: number, h?: number) => number = (size, h) => {
  const newSize = size * (h || hscale)
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize))
  }
  return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2
}

/**
 */

export const fontSizeLine: (size: number, w?: number, h?: number) => number = (size, w, h) => {
  return Math.round((size * (w || wscale)) / (h || hscale) - (Platform.OS === 'android' ? 0.5 : 0))
}

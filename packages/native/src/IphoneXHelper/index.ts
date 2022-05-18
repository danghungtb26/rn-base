import { Platform, NativeModules, StatusBar } from 'react-native'

const { NativeCommonManager } = NativeModules

// kiểm tra xem có phải là iphoneX hay không
export const isIphoneX: () => boolean = () => {
  return Boolean(Platform.OS === 'ios' && NativeCommonManager.is_iphone_x)
}

const defaultTop: number = isIphoneX() ? 44 : 20

const defaultTopWithoutMarin: number = isIphoneX() ? 34 : 20

const defaultBottomWithoutMargin: number = isIphoneX() ? 24 : 0

const defaultBottom: number = isIphoneX() ? 34 : 0

interface Offset {
  top: number
  top_without_margin: number
  bottom: number
  bottom_without_margin: number
}

const offset: Offset = {
  top: Platform.OS === 'android' ? StatusBar.currentHeight : NativeCommonManager?.top || defaultTop,
  top_without_margin:
    Platform.OS === 'android'
      ? StatusBar.currentHeight ?? defaultTopWithoutMarin
      : (NativeCommonManager?.top ?? 0) - (isIphoneX() ? 12 : 0) || defaultTopWithoutMarin,
  bottom: NativeCommonManager?.bottom || defaultBottom,
  bottom_without_margin:
    Platform.OS === 'android'
      ? 0
      : (NativeCommonManager?.bottom ?? 0) - (isIphoneX() ? 10 : 0) ?? defaultBottomWithoutMargin,
}

// func lấy ra khoảng cách safe area view
export const getOffset: () => Offset = () => {
  return offset
}

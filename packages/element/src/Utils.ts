import { StyleProp, StyleSheet, TextProps, TextStyle, ViewProps, ViewStyle } from 'react-native'
import removeUndifined from '@rn-base/core/removeUndifined'
import type {
  BoxProps,
  ShadowProps,
  MarginProps,
  PaddingProps,
  NumberOrString,
  BorderProps,
  TextBaseProps,
} from './types'

export const getRadius: (radius?: number | number[]) => ViewStyle = radius => {
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

export const getShadow: (shadow?: number | ShadowProps) => ViewStyle = shadow => {
  if (typeof shadow === 'number') return elevationShadowStyle(shadow)

  return shadow as ViewStyle
}

export const getValue: (
  value?: NumberOrString | NumberOrString[],
  type?: 'margin' | 'padding'
) => Record<string, any> = (value, type = 'margin') => {
  if (typeof value === 'number') {
    return {
      [type]: value,
    }
  }

  if (Array.isArray(value)) {
    const state: Record<string, any> = {}

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

export const getMargin: (p: MarginProps) => ViewStyle = props => {
  const { margin, ...rest } = props
  return {
    ...getValue(margin, 'margin'),
    ...removeUndifined<Omit<MarginProps, 'margin'>>(rest),
  }
}

export const getPadding: (p: PaddingProps) => ViewStyle = props => {
  const { padding, ...rest } = props
  return {
    ...getValue(padding, 'padding'),
    ...removeUndifined<Omit<PaddingProps, 'padding'>>(rest),
  }
}

export const getValueBorder: (
  value?: number | string | number[] | string[],
  type?: 'Width' | 'Color'
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

export const getBorder: (p: Omit<BorderProps, 'radius'>) => ViewStyle = props => {
  const { border, borderColor, borderWidth, ...rest } = props

  return {
    ...getValueBorder(border, 'Width'),
    ...getValueBorder(borderWidth, 'Width'),
    ...getValueBorder(borderColor, 'Color'),
    ...removeUndifined<typeof rest>(rest),
  }
}

export const usePropsForView: (props: BoxProps) => ViewProps = props => {
  const {
    center,
    middle,
    row,
    color,
    width,
    height,
    radius,
    style,
    shadow,
    flex,
    margin,
    marginTop,
    marginBottom,
    marginLeft,
    marginRight,
    marginHorizontal,
    marginVertical,
    padding,
    paddingTop,
    paddingBottom,
    paddingLeft,
    paddingRight,
    paddingHorizontal,
    paddingVertical,
    justifyContent,
    alignItems,
    display,
    hidden,
    grow,
    shrink,
    wrap,
    basis,
    zIndex,
    position,
    top,
    right,
    left,
    bottom,
    opacity,
    border,
    borderStyle,
    borderRightColor,
    borderRightWidth,
    borderWidth,
    borderBottomColor,
    borderBottomWidth,
    borderColor,
    borderLeftColor,
    borderLeftWidth,
    borderTopColor,
    borderTopWidth,

    ...restProps
  } = props

  const style_custom: StyleProp<ViewStyle> = [
    justifyContent ? { justifyContent } : null,
    alignItems ? { alignItems } : null,
    flex ? { flex } : null,
    center && styles.center,
    middle && styles.middle,
    row && styles.row,
    !!color && { backgroundColor: color },
    (typeof width === 'number' || typeof width === 'string') && { width },
    (typeof height === 'number' || typeof height === 'string') && { height },
    getRadius(radius),
    getShadow(shadow),
    // lấy ra margin và padding dựa vào props
    getMargin({
      margin,
      marginBottom,
      marginHorizontal,
      marginLeft,
      marginRight,
      marginTop,
      marginVertical,
    }),
    getPadding({
      paddingBottom,
      paddingHorizontal,
      paddingLeft,
      paddingRight,
      paddingTop,
      paddingVertical,
      padding,
    }),
    // lấy ra thông tin style border
    getBorder({
      borderStyle,
      border,
      borderRightColor,
      borderRightWidth,
      borderWidth,
      borderBottomColor,
      borderBottomWidth,
      borderColor,
      borderLeftColor,
      borderLeftWidth,
      borderTopColor,
      borderTopWidth,
    }),
    typeof grow === 'number' ? { flexGrow: grow } : null,
    typeof shrink === 'number' ? { flexShrink: shrink } : null,
    wrap ? { flexWrap: wrap } : null,
    typeof basis === 'number' ? { flexBasis: grow } : null,

    typeof zIndex === 'number' ? { zIndex } : null,
    { display: display ?? 'flex' },
    hidden && { display: 'none' },
    removeUndifined({ position, top, right, left, bottom, opacity }),
    // @ts-ignore
    style,
  ]

  const customProps: ViewProps = {
    style: style_custom,
    ...restProps,
  }

  return customProps
}

const styles = StyleSheet.create({
  center: {
    alignItems: 'center',
  },
  middle: {
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
  },
})

const color = '#000'

const shadow = (height: number, opacity: number, radius: number, elevation: number) => {
  if (elevation === 0) return {}
  return {
    shadowColor: color,
    shadowOffset: {
      width: 0,
      height,
    },
    shadowOpacity: opacity,
    shadowRadius: radius,

    elevation,
  }
}

export const elevationShadowStyle = (elevation: number) => {
  return {
    elevation,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 0.5 * elevation },
    shadowOpacity: !elevation ? 0 : 0.3,
    shadowRadius: 0.8 * elevation,
  }
}

export const shadowOpacity = (elevation: number) => {
  switch (elevation) {
    case 1:
      return shadow(1, 0.18, 1, elevation)
    case 2:
      return shadow(1, 0.2, 1.14, elevation)
    case 3:
      return shadow(1, 0.22, 2.22, elevation)
    case 4:
      return shadow(2, 0.23, 2.62, elevation)
    case 5:
      return shadow(2, 0.25, 3.84, elevation)
    case 6:
      return shadow(3, 0.27, 4.65, elevation)
    case 7:
      return shadow(3, 0.29, 4.65, elevation)
    case 8:
      return shadow(4, 0.3, 4.65, elevation)
    case 9:
      return shadow(4, 0.32, 5.46, elevation)
    case 10:
      return shadow(5, 0.34, 6.27, elevation)
    case 11:
      return shadow(5, 0.36, 6.68, elevation)
    case 12:
      return shadow(6, 0.37, 7.49, elevation)
    case 13:
      return shadow(6, 0.39, 8.3, elevation)
    case 14:
      return shadow(7, 0.41, 9.11, elevation)
    case 15:
      return shadow(7, 0.43, 9.51, elevation)
    case 16:
      return shadow(8, 0.44, 10.32, elevation)
    case 17:
      return shadow(8, 0.46, 11.14, elevation)
    case 18:
      return shadow(9, 0.48, 11.95, elevation)
    case 19:
      return shadow(9, 0.5, 12.35, elevation)
    case 20:
      return shadow(10, 0.51, 13.16, elevation)
    case 21:
      return shadow(10, 0.53, 13.97, elevation)
    case 22:
      return shadow(11, 0.55, 14.78, elevation)
    case 23:
      return shadow(11, 0.57, 15.19, elevation)
    case 24:
      return shadow(12, 0.58, 16, elevation)
    default:
      return shadow(2, 0.23, 2.62, 0)
  }
}

export const elevation = {
  component: shadowOpacity(24),
  dialog: shadowOpacity(16),
  modalBottomSheet: shadowOpacity(16),
  modalSideSheet: shadowOpacity(16),
  navigationDrawer: shadowOpacity(16),
  FABPressed: shadowOpacity(12),
  standardBottomSheet: shadowOpacity(8),
  standardSideSheet: shadowOpacity(8),
  bottomNavigationBar: shadowOpacity(8),
  bottomAppBar: shadowOpacity(8),
  menuAndSub: shadowOpacity(8),
  cardPickedUp: shadowOpacity(8),
  containedButton: shadowOpacity(8),
  FABRestElevetion: shadowOpacity(6),
  Snackbar: shadowOpacity(6),
  topAppBar: shadowOpacity(4),
  refreshIndicator: shadowOpacity(3),
  searchBar: shadowOpacity(3),
  contrainButton: shadowOpacity(2),
  card: shadowOpacity(1),
  switch: shadowOpacity(1),
  textButton: shadowOpacity(0),
}

export const usePropsForText: (props: TextBaseProps) => TextProps = props => {
  const {
    opacity,
    weight,
    row,
    middle,
    center,
    radius,
    shadow,
    style,
    color,
    size,
    margin,
    marginBottom,
    marginHorizontal,
    marginLeft,
    marginRight,
    marginTop,
    marginVertical,
    backgroundColor,
    paddingBottom,
    paddingHorizontal,
    paddingLeft,
    paddingRight,
    paddingTop,
    paddingVertical,
    padding,
    width,
    height,
    lineHeight,
    borderStyle,
    border,
    borderRightColor,
    borderRightWidth,
    borderWidth,
    borderBottomColor,
    borderBottomWidth,
    borderColor,
    borderLeftColor,
    borderLeftWidth,
    borderTopColor,
    borderTopWidth,

    textDecorationColor,
    textDecorationStyle,
    textDecorationLine,

    textAlign,

    fontStyle,
    fontFamily,
    textTransform,

    ...restProps
  } = props
  const custom_style: StyleProp<TextStyle> = [
    removeUndifined({
      opacity,
      textDecorationColor,
      textDecorationStyle,
      textDecorationLine,

      textAlign,
      fontFamily,
      fontStyle,
      textTransform,
      backgroundColor,
    }),
    center && { textAlign: 'center' },
    middle && { textAlignVertical: 'center' },
    size !== undefined ? { fontSize: size } : null,
    color !== undefined ? { color } : null,
    (typeof width === 'number' || typeof width === 'string') && { width },
    (typeof height === 'number' || typeof height === 'string') && { height },
    getMargin({
      margin,
      marginBottom,
      marginHorizontal,
      marginLeft,
      marginRight,
      marginTop,
      marginVertical,
    }),
    getPadding({
      paddingBottom,
      paddingHorizontal,
      paddingLeft,
      paddingRight,
      paddingTop,
      paddingVertical,
      padding,
    }),
    // lấy ra thông tin style border
    lineHeight ? { lineHeight } : {},
    { fontWeight: weight },

    shadow,
    style,
  ]

  return {
    style: custom_style,
    ...restProps,
  }
}

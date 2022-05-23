import { useMemo } from 'react'
import type { StyleProp, TextProps, TextStyle, ViewProps, ViewStyle } from 'react-native'
import type { BoxProps, TextBaseProps } from '../types'
import { calculateBorder } from './border'
import { calculateMargin } from './margin'
import { hasProperty, removeUndefined } from './other'
import { calculatePadding } from './padding'
import { calculateRadius } from './radius'
import { calculateShadow } from './shadow'
import { styles } from './styles'

export const useViewProps: (props: BoxProps) => ViewProps = props => {
  const {
    style,

    center,
    middle,
    row,
    color,
    width,
    height,
    radius,
    shadow,
    flex,
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
    ...rest
  } = props

  const makeMargin = useMemo(() => {
    return calculateMargin({
      margin,
      marginTop,
      marginBottom,
      marginLeft,
      marginRight,
      marginHorizontal,
      marginVertical,
    })
  }, [margin, marginBottom, marginHorizontal, marginLeft, marginRight, marginTop, marginVertical])

  const makeBorder = useMemo(() => {
    return calculateBorder({
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
    })
  }, [
    border,
    borderBottomColor,
    borderBottomWidth,
    borderColor,
    borderLeftColor,
    borderLeftWidth,
    borderRightColor,
    borderRightWidth,
    borderStyle,
    borderTopColor,
    borderTopWidth,
    borderWidth,
  ])

  const makePadding = useMemo(() => {
    return calculatePadding({
      paddingBottom,
      paddingHorizontal,
      paddingLeft,
      paddingRight,
      paddingTop,
      paddingVertical,
      padding,
    })
  }, [
    padding,
    paddingBottom,
    paddingHorizontal,
    paddingLeft,
    paddingRight,
    paddingTop,
    paddingVertical,
  ])

  const makeOther = removeUndefined({
    backgroundColor: color,
    justifyContent,
    alignItems,
    width,
    height,
    position,
    top,
    right,
    left,
    bottom,
    opacity,
    display: display ?? (hidden ? 'none' : undefined),
    zIndex,
    flexBasis: basis,
    flexWrap: wrap,
    flexShrink: shrink,
    flexGrow: grow,
    flex,
  })

  const makeRadius = useMemo(() => {
    return calculateRadius(radius)
  }, [radius])

  const makeShadow = useMemo(() => {
    return calculateShadow(shadow)
  }, [shadow])
  const custom_style: StyleProp<ViewStyle> = []

  if (row) {
    custom_style.push(styles.row)
  }

  if (middle) {
    custom_style.push(styles.middle)
  }

  if (center) {
    custom_style.push(styles.center)
  }

  if (hasProperty(makeRadius)) {
    custom_style.push(makeRadius)
  }

  if (hasProperty(makeShadow)) {
    custom_style.push(makeShadow)
  }

  if (hasProperty(makeOther)) {
    custom_style.push(makeOther)
  }

  if (hasProperty(makePadding)) {
    custom_style.push(makePadding)
  }

  if (hasProperty(makeMargin)) {
    custom_style.push(makeMargin)
  }

  if (hasProperty(makeBorder)) {
    custom_style.push(makeBorder)
  }

  if (style && ((Array.isArray(style) && style.length > 0) || hasProperty(style))) {
    custom_style.push(style)
  }

  return {
    style: custom_style,
    ...rest,
  }
}

export const useTextProps: (props: TextBaseProps) => TextProps = props => {
  const {
    weight,
    middle,
    center,
    color,
    size,
    backgroundColor,
    textDecorationColor,
    textDecorationStyle,
    textDecorationLine,
    textAlign,
    fontStyle,
    fontFamily,
    textTransform,
    lineHeight,
    shadow,
    style,
    ...rest
  } = props
  const makeOther = useMemo(() => {
    return removeUndefined<TextStyle>({
      textDecorationColor,
      textDecorationStyle,
      textDecorationLine,
      textAlign,
      fontFamily,
      fontStyle,
      textTransform,
      backgroundColor,
      fontSize: size ?? undefined,
      lineHeight,
      color,
      fontWeight: weight,
      ...(shadow ?? {}),
    })
  }, [
    backgroundColor,
    color,
    fontFamily,
    fontStyle,
    lineHeight,
    size,
    textAlign,
    textDecorationColor,
    textDecorationLine,
    textDecorationStyle,
    textTransform,
    weight,
    shadow,
  ])

  const custom_style: StyleProp<TextStyle> = []

  if (hasProperty(makeOther)) {
    custom_style.push(makeOther)
  }

  if (center) {
    custom_style.push(styles.text_center)
  }

  if (middle) {
    custom_style.push(styles.text_middle)
  }

  if (style && ((Array.isArray(style) && style.length > 0) || hasProperty(style))) {
    custom_style.push(style)
  }

  return useViewProps({ ...rest, style: custom_style })
}

export * from './other'
export * from './border'
export * from './margin'
export * from './padding'
export * from './shadow'
export * from './radius'

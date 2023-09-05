import type React from 'react'
import type {
  ShadowStyleIOS,
  TextProps,
  View,
  ViewProps,
  Text,
  TextInputProps,
  TextInput,
} from 'react-native'

export interface ShadowProps extends ShadowStyleIOS {
  elevation?: number
}

export type RefView = View

export type RefText = Text

export type RefInput = TextInput

export declare type NumberOrString = number | string

export interface BorderProps {
  border?: number | number[]
  borderColor?: string | string[]
  borderWidth?: number | number[]
  radius?: number | number[]
  borderStyle?: 'solid' | 'dotted' | 'dashed'

  borderRightWidth?: number

  borderRightColor?: string

  borderLeftWidth?: number

  borderLeftColor?: string

  borderTopWidth?: number

  borderTopColor?: string

  borderBottomWidth?: number

  borderBottomColor?: string
}

export interface PaddingProps {
  padding?: NumberOrString | NumberOrString[]
  paddingBottom?: number | string
  paddingHorizontal?: number | string
  paddingLeft?: number | string
  paddingRight?: number | string
  paddingTop?: number | string
  paddingVertical?: number | string
}

export interface MarginProps {
  margin?: NumberOrString | NumberOrString[]
  marginBottom?: number | string
  marginHorizontal?: number | string
  marginLeft?: number | string
  marginRight?: number | string
  marginTop?: number | string
  marginVertical?: number | string
}

export interface BoxProps extends ViewProps, BorderProps, PaddingProps, MarginProps {
  shadow?: number | ShadowProps

  hidden?: boolean

  // children?: React.ReactNode

  center?: boolean

  row?: boolean

  middle?: boolean

  color?: string

  width?: NumberOrString

  height?: NumberOrString

  flex?: number
  justifyContent?:
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'space-between'
    | 'space-around'
    | 'space-evenly'

  overflow?: 'visible' | 'hidden' | 'scroll'

  display?: 'none' | 'flex'

  grow?: number
  shrink?: number
  wrap?: 'wrap' | 'nowrap' | 'wrap-reverse'
  basis?: number | string
  alignItems?: 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline'
  position?: 'absolute' | 'relative'
  right?: number | string
  left?: NumberOrString
  bottom?: NumberOrString
  top?: number | string
  zIndex?: number

  opacity?: number
}

export interface CircleProps extends BoxProps {
  size: number
}

export interface TextBaseProps extends Omit<BoxProps, 'style' | 'children' | 'shadow'>, TextProps {
  size: number

  lineHeight?: number

  weight?: 'normal' | 'bold' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900'

  textAlign?: 'auto' | 'left' | 'right' | 'center' | 'justify'

  fontStyle?: 'normal' | 'italic'

  fontFamily?: string

  textDecorationLine?: 'none' | 'underline' | 'line-through' | 'underline line-through'
  textDecorationStyle?: 'solid' | 'double' | 'dotted' | 'dashed'
  textDecorationColor?: string

  shadow?: {
    textShadowColor?: string

    textShadowOffset?: {
      width: number
      height: number
    }

    textShadowRadius?: number
  }

  textTransform?: 'none' | 'capitalize' | 'uppercase' | 'lowercase'

  children?: any

  backgroundColor?: string
}

export interface ITextInputBaseProps
  extends TextInputProps,
    Omit<TextBaseProps, 'children' | 'style' | 'textAlign'> {
  children?: React.ReactNode

  rows?: number
}

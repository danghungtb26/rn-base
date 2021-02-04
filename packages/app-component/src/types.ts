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

  children?: React.ReactNode
  /**
   * làm cho children nằm giữa view
   * row == false => theo chiều ngang
   * row == true => theo chiều dọc
   */
  center?: Boolean
  /**
   * đặt view theo chiều ngang
   */
  row?: Boolean
  /**
   * làm cho children nằm giữa view
   * row == true => theo chiều ngang
   * row == false => theo chiều dọc
   */
  middle?: Boolean
  /**
   * đặt background cho view
   * nếu đặt shadow thì phải đặt color
   */
  color?: string
  /**
   * đặt width cho view
   */
  width?: NumberOrString
  /**
   * đặt height cho view
   */
  height?: NumberOrString
  /**
   * đặt borderradius cho view
   * nếu radius not define => đặt cả 4 góc của view
   */

  /**
   * đặt flex cho view (viewstyle)
   */
  flex?: number
  /**
   * đặt shadow cho view
   * @android : elevation
   * @ios : shadow (xem getShadow)
   */

  /**
   * có sửa dụng animation hay không
   */
  animted?: 'reanimated' | 'animated' | 'none'

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

  /**
   * thuoc tinh zindex cua style
   */
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

export interface ITextInputBaseProps extends TextInputProps, TextBaseProps {
  /**
   * backgroundColor cho input
   *
   */

  /**
   * text hien thi
   * Override
   */
  children?: any

  rows?: number
}

import React from 'react'
import { StyleSheet, TextInput } from 'react-native'
import type { ITextInputBaseProps, RefInput } from '../types'
import { equal, useTextProps } from '../Utils'

export const Input = React.memo(
  React.forwardRef<RefInput, ITextInputBaseProps>((props, ref) => {
    const p = useTextProps(props)
    return <TextInput ref={ref} {...p} />
  }),
  equal
)

export const AreaInput = React.memo(
  React.forwardRef<RefInput, ITextInputBaseProps>((props, ref) => {
    const { rows = 1, size = 14 } = props

    const p = useTextProps(props)

    const paddingObject = StyleSheet.flatten(p.style)
    const getSize = paddingObject.lineHeight || (size || 14) * 1.2
    let cal: number = Number(paddingObject.paddingVertical || paddingObject.padding || 0) * 2

    if (typeof paddingObject.paddingTop === 'number') {
      cal =
        cal -
        Number(paddingObject.paddingVertical || paddingObject.padding || 0) +
        paddingObject.paddingTop
    }

    if (typeof paddingObject.paddingBottom === 'number') {
      cal =
        cal -
        Number(paddingObject.paddingVertical || paddingObject.padding || 0) +
        paddingObject.paddingBottom
    }

    const height = getSize * rows + cal

    return <Input ref={ref} multiline height={height} size={size} {...p} />
  }),
  equal
)

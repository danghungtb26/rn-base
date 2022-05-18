import React from 'react'
import { StyleSheet, TextInput } from 'react-native'
import type { ITextInputBaseProps, RefInput } from '../types'
import { equal, usePropsForText } from '../Utils'

/**
 * component base của input
 * @param props xem ITextInputBaseProps
 * @return React.Node
 */
export const Input = React.memo(
  React.forwardRef<RefInput, ITextInputBaseProps>((props, ref) => {
    const p = usePropsForText(props)
    return (
      <TextInput
        ref={ref}
        autoCapitalize="none"
        autoCorrect={false}
        spellCheck={false}
        contextMenuHidden
        textAlign={props.textAlign}
        {...p}
      />
    )
  }),
  equal
)

export const AreaInput = React.memo(
  React.forwardRef<RefInput, ITextInputBaseProps>((props, ref) => {
    const { rows = 1, size = 14, textAlign } = props

    const p = usePropsForText(props)

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

    return <Input textAlign={textAlign} ref={ref} multiline height={height} size={size} {...p} />
  }),
  equal
)

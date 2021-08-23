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

    // lấy ra toàn bộ object liên quan đến
    const paddingObject = StyleSheet.flatten(p.style)
    const getsize = paddingObject.lineHeight || (size || 14) * 1.2
    // giá trị default dựa vào padding hoặc là paddingvertical
    let cal: number = Number(paddingObject.paddingVertical || paddingObject.padding || 0) * 2

    // nếu có paddingTop sẽ bỏ đi 1phần padding và + với padding top
    if (typeof paddingObject.paddingTop === 'number') {
      cal =
        cal -
        Number(paddingObject.paddingVertical || paddingObject.padding || 0) +
        paddingObject.paddingTop
    }

    // nếu có paddingbottom sẽ bỏ đi 1 phần padding và + padding bôttm
    if (typeof paddingObject.paddingBottom === 'number') {
      cal =
        cal -
        Number(paddingObject.paddingVertical || paddingObject.padding || 0) +
        paddingObject.paddingBottom
    }

    const height = getsize * rows + cal

    return <Input textAlign={textAlign} ref={ref} multiline height={height} size={size} {...p} />
  }),
  equal
)

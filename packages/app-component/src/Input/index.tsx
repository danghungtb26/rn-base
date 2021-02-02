import React from 'react'
import { StyleSheet, TextInput } from 'react-native'
import type { ITextInputBaseProps, RefInput } from '../types'
import { usePropsForText } from '../Utils'

/**
 * component base của input
 * @param props xem ITextInputBaseProps
 * @return React.Node
 */
export const Input = React.forwardRef<RefInput, ITextInputBaseProps>((props, ref) => {
  const p = usePropsForText(props)
  return (
    <TextInput
      ref={ref}
      autoCapitalize="none"
      autoCorrect={false}
      spellCheck={false}
      contextMenuHidden
      {...p}
    />
  )
})

export const AreaInput = React.forwardRef<RefInput, ITextInputBaseProps>((props, ref) => {
  const { rows = 1, size = 14 } = props
  const getsize = (size || 14) * 1.2

  const p = usePropsForText(props)

  // lấy ra toàn bộ object liên quan đến
  const paddingObject = StyleSheet.flatten(p.style)

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

  return <Input ref={ref} multiline height={height} size={size} {...p} />
})
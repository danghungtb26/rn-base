import React from 'react'
import { View } from 'react-native'
import type { BoxProps, RefView } from '../types'
import { usePropsForView } from '../Utils'

/**
 * component thay thế component View của react-native
 */

export const Box = React.forwardRef<RefView, BoxProps>((props, ref) => {
  const { children, ...restProps } = props
  const p = usePropsForView(restProps)
  return (
    <View ref={ref} {...p}>
      {children}
    </View>
  )
})

Box.displayName = 'View'

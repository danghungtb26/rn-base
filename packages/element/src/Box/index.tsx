import React from 'react'
import { View } from 'react-native'
import type { BoxProps, RefView } from '../types'
import { equal, usePropsForView } from '../Utils'

/**
 * component thay thế component View của react-native
 */

export const Box = React.memo(
  React.forwardRef<RefView, BoxProps>((props, ref) => {
    const { children, ...restProps } = props
    const p = usePropsForView(restProps)
    return (
      <View ref={ref} {...p}>
        {children}
      </View>
    )
  }),
  equal
)

Box.displayName = 'View'

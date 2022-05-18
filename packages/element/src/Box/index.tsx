import React from 'react'
import { View } from 'react-native'
import type { BoxProps, RefView } from '../types'
import { equal, useViewProps } from '../Utils'

export const Box = React.memo(
  React.forwardRef<RefView, BoxProps>((props, ref) => {
    const { children, ...restProps } = props
    const p = useViewProps(restProps)
    return (
      <View ref={ref} {...p}>
        {children}
      </View>
    )
  }),
  equal
)

Box.displayName = 'View'

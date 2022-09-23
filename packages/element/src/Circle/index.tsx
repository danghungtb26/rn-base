import React from 'react'
import { Box } from '../Box'
import type { CircleProps, RefView } from '../types'
import { equal } from '../Utils'

export const Circle = React.memo(
  React.forwardRef<RefView, CircleProps>((props, ref) => {
    const { size = 0, height, width, radius, children, ...restProps } = props
    return (
      <Box ref={ref} width={size} height={size} radius={size / 2} {...restProps}>
        {children}
      </Box>
    )
  }),
  equal,
)

Circle.displayName = 'Circle'

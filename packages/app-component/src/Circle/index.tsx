import React from 'react'
import { Box } from '../Box'
import type { CircleProps, RefView } from '../types'

/**
 * component thay thế component View của react-native
 */
export const Circle = React.forwardRef<RefView, CircleProps>((props, ref) => {
  const { size = 0, height, width, radius, children, ...restProps } = props
  return (
    <Box ref={ref} width={size} height={size} radius={size / 2} {...restProps}>
      {children}
    </Box>
  )
})

Circle.displayName = 'View'

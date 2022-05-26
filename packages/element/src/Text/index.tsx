import React from 'react'
import { Text as RNText } from 'react-native'
import type { RefText, TextBaseProps } from '../types'
import { equal, useTextProps } from '../Utils'

export const Text = React.memo(
  React.forwardRef<RefText, TextBaseProps>((props, ref) => {
    const custom_props = useTextProps(props)
    return <RNText ref={ref} {...custom_props} />
  }),
  equal
)

Text.displayName = 'Text'

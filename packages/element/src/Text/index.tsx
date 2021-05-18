import React from 'react'
import { Text as RNText } from 'react-native'
import type { RefText, TextBaseProps } from '../types'
import { usePropsForText } from '../Utils'

export const Text = React.forwardRef<RefText, TextBaseProps>((props, ref) => {
  const custom_props = usePropsForText(props)
  return <RNText ref={ref} {...custom_props} />
})

Text.displayName = 'Text'

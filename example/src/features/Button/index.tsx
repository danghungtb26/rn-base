import { Box, Text, TouchRipple, TouchSingle } from '@rn-base/element'
import React from 'react'
import { TouchableOpacityProps, View } from 'react-native'

import { TouchableOpacity } from 'react-native-gesture-handler'
import type { ButtonScreenNavigationProps } from '../../navigator/routes'

interface IProps extends ButtonScreenNavigationProps {}

const ButtonScreen: React.FC<IProps> = () => {
  const refa = React.useRef<TouchableOpacity>(null)
  return (
    <Box flex={1} alignItems="flex-start">
      <TouchSingle
        delay={1000}
        renderTouchComponent={({
          children,
          ...props
        }: TouchableOpacityProps & { children: any }) => (
          <TouchableOpacity ref={refa} {...(props as typeof TouchableOpacity)}>
            <Box
              style={{ backgroundColor: '#fff', alignItems: 'center' }}
              color="#fff"
              shadow={2}
              padding={12}
            >
              {children}
            </Box>
          </TouchableOpacity>
        )}
        hitSlop={{ top: 10, left: 10, right: 10, bottom: 10 }}
      >
        <Text size={12}>Button</Text>
      </TouchSingle>
      <View
        style={{
          backgroundColor: 'red',
        }}
      >
        <Text size={12}>Button</Text>
      </View>
      <TouchRipple>
        <Box height={100} width={200} color="red" />
      </TouchRipple>
    </Box>
  )
}

export default ButtonScreen

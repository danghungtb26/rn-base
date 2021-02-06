import { Box } from '@dvh-module/app-component'
import React from 'react'
import { Text, View } from 'react-native'
import type { TextScreenNavigationProps } from '../../navigator/routes'

interface IProps extends TextScreenNavigationProps {}

const TextScreen: React.FC<IProps> = () => {
  return (
    <View>
      <Text>TextScreen</Text>
      <Box width={100} height={100} shadow={3} color="red" margin={[2, 3, 4, 5]} />
    </View>
  )
}

export default TextScreen

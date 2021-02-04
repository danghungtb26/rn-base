import React from 'react'
import { Text, View } from 'react-native'
import type { TextScreenNavigationProps } from '../../navigator/routes'

interface IProps extends TextScreenNavigationProps {}

const TextScreen: React.FC<IProps> = () => {
  return (
    <View>
      <Text>TextScreen</Text>
    </View>
  )
}

export default TextScreen

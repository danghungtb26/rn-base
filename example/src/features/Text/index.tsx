import { Box, elevation, Text } from '@rn-base/element'
import React from 'react'
import { View } from 'react-native'

interface IProps {}

const TextScreen: React.FC<IProps> = () => {
  return (
    <View>
      <Text color="red" size={12} margin={100}>
        TextScreen
      </Text>
      <Box
        width={100}
        height={100}
        shadow={elevation.FABPressed}
        color="red"
        margin={[2, 3, 4, 5]}
      />
    </View>
  )
}

export default TextScreen

import React from 'react'
import { Box, Text } from '@rn-base/element'

const NativeScreen: React.FC<{}> = () => {
  const string = 'native'
  return (
    <Box center middle flex={1}>
      <Text size={14}>{string}</Text>
    </Box>
  )
}

export default NativeScreen

import React from 'react'
import { Box, Text } from '@rn-base/element'

declare global {
  var getArea2: () => void
  var getString: () => string
}

const NativeScreen: React.FC<{}> = () => {
  const string = typeof global.getString === 'function' ? global.getString() : 'aaaa'
  return (
    <Box center middle flex={1}>
      <Text size={14}>{string}</Text>
    </Box>
  )
}

export default NativeScreen

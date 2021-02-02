import React, { useRef } from 'react'

import { StyleSheet, View } from 'react-native'
import Splash from '@dvh-module/splash'
import { formatMoneyVnd } from '@dvh-module/core'
import { isIphoneX } from '@dvh-module/native-common'
import { Box, Circle, Text } from '@dvh-module/app-component'

export default function App() {
  React.useEffect(() => {
    Splash?.hide(0)
    console.log(isIphoneX())
  }, [])

  const a = useRef<any>(null)

  return (
    <View style={styles.container}>
      <Text
        size={40}
        color="red"
        padding={[20, 10]}
        fontStyle="italic"
        textDecorationLine="underline line-through"
        textBreakStrategy="highQuality"
        textTransform="capitalize">
        result {formatMoneyVnd(300000)}
      </Text>
      <Box ref={a}>{/* <Box flex={1} color="#fff" /> */}</Box>
      <Circle size={200} color="blue" border={2} borderColor="red" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})

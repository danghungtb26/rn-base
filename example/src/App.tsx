import React from 'react'

import { StyleSheet, View, Text } from 'react-native'
import Splash from '@dvh-module/splash'
import { formatMoney } from '@dvh-module/core'

export default function App() {
  React.useEffect(() => {
    Splash?.hide(0)
  }, [])

  return (
    <View style={styles.container}>
      <Text>Result {formatMoney(300000)}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
})

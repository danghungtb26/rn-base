import React from 'react'

import Splash from '@rn-base/splash'
// import { isIphoneX } from '@rn-base/native-common'
import { AlertProvider, AppProvider, DefaultColor, PopupProvider } from '@rn-base/element'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import Navigator from './src/navigator'

const App = () => {
  React.useEffect(() => {
    Splash?.hide(0)
    // console.log(isIphoneX())
  }, [])

  return (
    <AlertProvider>
      <AppProvider
        colors={{
          ...DefaultColor,
          default: {
            primary: '#fff',
          },
        }}
      >
        <SafeAreaProvider style={{ flex: 1 }}>
          <Navigator />
        </SafeAreaProvider>
      </AppProvider>
      <PopupProvider />
    </AlertProvider>
  )
}

export default App

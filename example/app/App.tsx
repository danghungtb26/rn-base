import React, { useState } from 'react'

import Splash from '@rn-base/splash'
// import { isIphoneX } from '@rn-base/native-common'
import { AlertProvider, AppProvider, DefaultColor } from '@rn-base/element'
import { enableScreens } from 'react-native-screens'

import { SafeAreaProvider } from 'react-native-safe-area-context'

import Navigator from './src/navigator'

enableScreens()

export default () => {
  React.useEffect(() => {
    Splash?.hide(0)
    // console.log(isIphoneX())
  }, [])
  const [locale, setLocale] = useState('ja')

  return (
    <AlertProvider>
      <AppProvider
        locale={locale}
        colors={{
          ...DefaultColor,
          default: {
            primary: '#fff',
          },
        }}
        onChangeLocale={v => setLocale(v)}
        translations={{
          vi: {
            labels: {
              title: 'vi haha',
            },
            actions: {},
            errors: {},
            messages: {},
            placeholders: {},
            languages: {},
          },
          ja: {
            labels: {
              title: 'ja haha',
            },
            actions: {},
            errors: {},
            messages: {},
            placeholders: {},
            languages: {},
          },
        }}>
        <SafeAreaProvider>
          <Navigator />
        </SafeAreaProvider>
      </AppProvider>
    </AlertProvider>
  )
}

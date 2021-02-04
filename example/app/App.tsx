import React, { useState } from 'react'

import Splash from '@dvh-module/splash'
import { isIphoneX } from '@dvh-module/native-common'
import { AlertProvider, AppProvider, DefaultColor } from '@dvh-module/app-component'
import { enableScreens } from 'react-native-screens'

import { SafeAreaProvider } from 'react-native-safe-area-context'

import Navigator from './src/navigator'

enableScreens()

export default () => {
  React.useEffect(() => {
    Splash?.hide(0)
    console.log(isIphoneX())
  }, [])
  const [locale, setLocale] = useState('ja')

  return (
    <AlertProvider>
      <AppProvider
        locale={locale}
        colors={DefaultColor}
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
          },
          ja: {
            labels: {
              title: 'ja haha',
            },
            actions: {},
            errors: {},
            messages: {},
            placeholders: {},
          },
        }}>
        <SafeAreaProvider>
          <Navigator />
        </SafeAreaProvider>
      </AppProvider>
    </AlertProvider>
  )
}

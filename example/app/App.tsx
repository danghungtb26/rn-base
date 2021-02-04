import React, { useRef, useState } from 'react'

import { StyleSheet, View, Pressable } from 'react-native'
import Splash from '@dvh-module/splash'
import { formatMoneyVnd } from '@dvh-module/core'
import { fontSizeLine, isIphoneX, widthLize } from '@dvh-module/native-common'
import {
  AppProvider,
  Box,
  Text,
  useChangeLocale,
  useI18n,
  useI18nLocale,
  DefaultColor,
} from '@dvh-module/app-component'
import { enableScreens } from 'react-native-screens'
import type { RefView } from '@dvh-module/app-component'
import { createStackNavigator } from '@react-navigation/stack'
import { SafeAreaProvider } from 'react-native-safe-area-context'

import { NavigationContainer } from '@react-navigation/native'

import MoreText from './src/components/MoreText'

enableScreens()

const text_test =
  "React Native's Image component handles image caching like browsers for the most part. If the server is returning proper cache control headers for images you'll generally get the sort of built in caching behavior you'd have in a browser. Even so many people have noticed: React Native's Image component handles image caching like browsers for the most part. If the server is returning proper cache control headers for images you'll generally get the sort of built in caching behavior you'd have in a browser. Even so many people have noticed:"

function App() {
  React.useEffect(() => {
    Splash?.hide(0)
    console.log(isIphoneX())
  }, [])

  const a = useRef<RefView>(null)

  const i18n = useI18n()
  console.log('🚀 ~ file: App.tsx ~ line 38 ~ App ~ i18n', i18n)

  const keyI18n = useI18nLocale()
  const change = useChangeLocale()

  return (
    <View style={styles.container}>
      <Text
        size={fontSizeLine(22)}
        color="red"
        padding={widthLize([20, 10])}
        fontStyle="italic"
        textDecorationLine="underline line-through"
        textBreakStrategy="highQuality"
        textTransform="capitalize">
        result {formatMoneyVnd(300000)}
      </Text>
      <Box ref={a}>{/* <Box flex={1} color="#fff" /> */}</Box>
      <MoreText
        fontStyle="italic"
        weight="normal"
        lineHeight={23}
        color="#000"
        size={20}
        numberOfLines={3}>
        {text_test}
        {/* <Text size={44}>xin chao moi nguoi nha hahahahah ahah</Text> */}
      </MoreText>
      <Pressable onPress={() => change(keyI18n === 'vi' ? 'ja' : 'vi')}>
        <Text size={12}>{i18n.t('labels.title')}</Text>
      </Pressable>
    </View>
  )
}

const screen2 = () => {
  return (
    <Box flex={1}>
      <Text size={12}>any</Text>
    </Box>
  )
}

const Stack = createStackNavigator()

export default () => {
  React.useEffect(() => {
    Splash?.hide(0)
    console.log(isIphoneX())
  }, [])
  const [locale, setLocale] = useState('ja')

  return (
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
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ gestureEnabled: true, cardShadowEnabled: true }}>
            <Stack.Screen name="Screen1" component={App} />
            <Stack.Screen
              name="Screen2"
              component={screen2}
              options={{
                // animationEnabled: false,
                // detachPreviousScreen: false,
                cardStyle: {
                  // backgroundColor: 'transparent',
                },
                // cardStyleInterpolator: ({ closing }) => {
                //   return {}
                // },
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </AppProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
})

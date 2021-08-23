import React, { useEffect, useState } from 'react'
import { Appearance, StyleSheet } from 'react-native'
import I18njs from 'i18n-js'

export type IColorApp = Record<string, string>

type i18nbase = 'labels' | 'errors' | 'messages' | 'placeholders' | 'actions' | 'languages'

export type I18nApp = Record<i18nbase, Record<string, string | Record<string, string>>>

interface IStates {
  i18n: typeof I18njs
  i18nLocale: string
  colors: IColorApp
  onChangeLocale: (locale: string) => void
}

export const DefaultColor: {
  dark: IColorApp
  light: IColorApp
  default: IColorApp
} = {
  dark: {},
  light: {},
  default: {},
}

export const AppContext = React.createContext<IStates>({
  i18n: I18njs,
  i18nLocale: I18njs.locale,
  colors: DefaultColor.default,
  onChangeLocale: () => {},
})

export const useI18n: () => typeof I18njs = () => {
  const { i18n } = React.useContext(AppContext)
  return i18n
}

export const useChangeLocale: () => (locale: string) => void = () => {
  return React.useContext(AppContext).onChangeLocale
}

export const useI18nLocale: () => string = () => {
  return React.useContext(AppContext).i18nLocale
}

export const useColors: <T extends IColorApp>() => T = () => {
  const { colors: color } = React.useContext(AppContext)
  return color as any
}

export const makeStyle: <
  C extends IColorApp,
  T extends StyleSheet.NamedStyles<T> | StyleSheet.NamedStyles<any> = StyleSheet.NamedStyles<any>
>(
  input: T | ((theme: { colors: C }) => T)
) => () => StyleSheet.NamedStyles<T> = input => {
  if (typeof input === 'function') {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const colors = useColors()
    // @ts-ignore
    return () => input({ colors })
  }

  return () => input
}

I18njs.fallbacks = false
I18njs.defaultLocale = 'vi'

export const AppProvider: React.FC<{
  locale: string
  onChangeLocale?: (locale: string) => void
  translations: Record<keyof typeof I18njs.translations, I18nApp>
  colors: {
    dark: IColorApp
    light: IColorApp
    default: IColorApp
  }
}> = ({ locale, children, colors, translations, onChangeLocale = () => {} }) => {
  const [i18n, setI18n] = useState<typeof I18njs>(() => {
    I18njs.locale = locale

    I18njs.translations = translations
    return { ...I18njs }
  })
  const [color, setColor] = useState<IColorApp>({
    ...(Appearance.getColorScheme() === 'dark' ? colors.dark : colors.light),
    ...colors.default,
  })

  useEffect(() => {
    I18njs.locale = locale
    setI18n({ ...I18njs })
  }, [locale])

  const changeColor = ({ colorScheme }: Appearance.AppearancePreferences) => {
    setColor({
      ...(colorScheme === 'dark' ? colors.dark : colors.light),
      ...colors.default,
    })
  }

  useEffect(() => {
    const listener = Appearance.addChangeListener(changeColor)

    return () => {
      // @ts-ignore
      if (typeof listener?.remove === 'function') {
        // @ts-ignore
        listener.remove()
        return
      }
      Appearance.removeChangeListener(changeColor)
    }
  })

  return (
    <AppContext.Provider value={{ onChangeLocale, i18n, i18nLocale: locale, colors: color }}>
      {children}
    </AppContext.Provider>
  )
}

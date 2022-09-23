import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Appearance, StyleSheet } from 'react-native'

export type IColorApp = Record<string, string>

interface IStates {
  colors: IColorApp
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
  colors: DefaultColor.default,
})

export const useColors: <T extends IColorApp>() => T = () => {
  const { colors: color } = React.useContext(AppContext)
  return color as any
}

export const makeStyle: <
  C extends IColorApp,
  T extends StyleSheet.NamedStyles<T> | StyleSheet.NamedStyles<any> = StyleSheet.NamedStyles<any>,
>(
  input: T | ((theme: { colors: C }) => T),
) => () => StyleSheet.NamedStyles<T> = input => {
  if (typeof input === 'function') {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const colors = useColors()
    // @ts-ignore
    return () => input({ colors })
  }

  return () => input
}

export const AppProvider: React.FC<{
  colors: {
    dark: IColorApp
    light: IColorApp
    default: IColorApp
  }
}> = ({ children, colors }) => {
  const [color, setColor] = useState<IColorApp>({
    ...(Appearance.getColorScheme() === 'dark' ? colors.dark : colors.light),
    ...colors.default,
  })
  const changeColor = useCallback(
    ({ colorScheme }: Appearance.AppearancePreferences) => {
      setColor({
        ...(colorScheme === 'dark' ? colors.dark : colors.light),
        ...colors.default,
      })
    },
    [colors.dark, colors.default, colors.light],
  )

  useEffect(() => {
    const listener = Appearance.addChangeListener(changeColor)

    return () => {
      listener.remove?.()
    }
  }, [changeColor])
  const value = useMemo(() => ({ colors: color }), [color])

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

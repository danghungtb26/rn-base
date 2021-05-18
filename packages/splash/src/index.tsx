import { NativeModules } from 'react-native'
// import moduleName from '@rn-base'

type SplashType = {
  show: (duration?: number) => void
  hide: (duration?: number) => void
}

const { Splash } = NativeModules

export default Splash as SplashType

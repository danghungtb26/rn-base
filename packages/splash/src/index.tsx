import { NativeModules } from 'react-native'
// import moduleName from '@dvh'

type SplashType = {
  show: (duration?: number) => void
  hide: (duration?: number) => void
  none(): any
}

const { Splash } = NativeModules
console.log('🚀 ~ file: index.tsx ~ line 11 ~ Splash', Splash)

export default Splash as SplashType

/* eslint-disable import/no-import-module-exports */
/* eslint-disable global-require */
import type AlertProvider from './Alert/Provider'
import type { Box } from './Box'
import type { TouchRipple, TouchSingle } from './Button'
import type { Circle } from './Circle'
import type { AreaInput, Input } from './Input'
import type { PopupProvider } from './Popup'
import type { Text } from './Text'

let BoxComponent: typeof Box
let CircleComponent: typeof Circle
let TextComponent: typeof Text
let InputComponent: typeof Input
let AreaInputComponent: typeof AreaInput
let TouchSingleComponent: typeof TouchSingle
let TouchRippleComponent: typeof TouchRipple
let AlertProviderComponent: typeof AlertProvider
let PopupProviderComponent: typeof PopupProvider

module.exports = {
  get Box(): typeof Box {
    BoxComponent = BoxComponent || require('./Box').Box
    return BoxComponent
  },

  get Circle(): typeof Circle {
    CircleComponent = CircleComponent || require('./Circle').Circle
    return CircleComponent
  },

  get Text(): typeof Text {
    TextComponent = TextComponent || require('./Text').Text
    return TextComponent
  },

  get Input(): typeof Input {
    InputComponent = InputComponent || require('./Input').Input
    return InputComponent
  },

  get AreaInputComponent(): typeof Input {
    AreaInputComponent = AreaInputComponent || require('./Input').AreaInput
    return AreaInputComponent
  },

  get TouchSingle(): typeof TouchSingle {
    TouchSingleComponent = TouchSingleComponent || require('./Button/TouchSingle').default
    return TouchSingleComponent
  },

  get TouchRipple(): typeof TouchRipple {
    TouchRippleComponent = TouchRippleComponent || require('./Button/TouchRipple').default
    return TouchRippleComponent
  },

  get AlertProvider(): typeof AlertProvider {
    AlertProviderComponent = AlertProviderComponent || require('./Alert/Provider').default
    return AlertProviderComponent
  },

  ...require('./Alert/types'),

  get PopupProvider(): typeof PopupProvider {
    PopupProviderComponent = PopupProviderComponent || require('./Popup/Provider').default
    return PopupProviderComponent
  },

  ...require('./Popup/types'),

  ...require('./types'),
  ...require('./Provider/AppProvider'),
  ...require('./Utils'),
}

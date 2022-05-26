import type { ViewStyle } from 'react-native'
import type { ShadowProps } from '../types'

export const calculateShadow: (shadow?: number | ShadowProps) => ViewStyle = shadow => {
  if (typeof shadow === 'number') return elevationShadowStyle(shadow)

  return shadow ?? {}
}

export const elevationShadowStyle = (elevation: number) => {
  return {
    elevation,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 0.5 * elevation },
    shadowOpacity: !elevation ? 0 : 0.3,
    shadowRadius: 0.8 * elevation,
  }
}

const color = '#000'

const shadow = (height: number, opacity: number, radius: number, elevation: number) => {
  if (elevation === 0) return {}
  return {
    shadowColor: color,
    shadowOffset: {
      width: 0,
      height,
    },
    shadowOpacity: opacity,
    shadowRadius: radius,
    elevation,
  }
}

export const shadowOpacity = (elevation: number) => {
  switch (elevation) {
    case 1:
      return shadow(1, 0.18, 1, elevation)
    case 2:
      return shadow(1, 0.2, 1.14, elevation)
    case 3:
      return shadow(1, 0.22, 2.22, elevation)
    case 4:
      return shadow(2, 0.23, 2.62, elevation)
    case 5:
      return shadow(2, 0.25, 3.84, elevation)
    case 6:
      return shadow(3, 0.27, 4.65, elevation)
    case 7:
      return shadow(3, 0.29, 4.65, elevation)
    case 8:
      return shadow(4, 0.3, 4.65, elevation)
    case 9:
      return shadow(4, 0.32, 5.46, elevation)
    case 10:
      return shadow(5, 0.34, 6.27, elevation)
    case 11:
      return shadow(5, 0.36, 6.68, elevation)
    case 12:
      return shadow(6, 0.37, 7.49, elevation)
    case 13:
      return shadow(6, 0.39, 8.3, elevation)
    case 14:
      return shadow(7, 0.41, 9.11, elevation)
    case 15:
      return shadow(7, 0.43, 9.51, elevation)
    case 16:
      return shadow(8, 0.44, 10.32, elevation)
    case 17:
      return shadow(8, 0.46, 11.14, elevation)
    case 18:
      return shadow(9, 0.48, 11.95, elevation)
    case 19:
      return shadow(9, 0.5, 12.35, elevation)
    case 20:
      return shadow(10, 0.51, 13.16, elevation)
    case 21:
      return shadow(10, 0.53, 13.97, elevation)
    case 22:
      return shadow(11, 0.55, 14.78, elevation)
    case 23:
      return shadow(11, 0.57, 15.19, elevation)
    case 24:
      return shadow(12, 0.58, 16, elevation)
    default:
      return shadow(2, 0.23, 2.62, 0)
  }
}

export const elevation = {
  component: shadowOpacity(24),
  dialog: shadowOpacity(16),
  modalBottomSheet: shadowOpacity(16),
  modalSideSheet: shadowOpacity(16),
  navigationDrawer: shadowOpacity(16),
  FABPressed: shadowOpacity(12),
  standardBottomSheet: shadowOpacity(8),
  standardSideSheet: shadowOpacity(8),
  bottomNavigationBar: shadowOpacity(8),
  bottomAppBar: shadowOpacity(8),
  menuAndSub: shadowOpacity(8),
  cardPickedUp: shadowOpacity(8),
  containedButton: shadowOpacity(8),
  FABRestElevation: shadowOpacity(6),
  Snackbar: shadowOpacity(6),
  topAppBar: shadowOpacity(4),
  refreshIndicator: shadowOpacity(3),
  searchBar: shadowOpacity(3),
  containButton: shadowOpacity(2),
  card: shadowOpacity(1),
  switch: shadowOpacity(1),
  textButton: shadowOpacity(0),
}

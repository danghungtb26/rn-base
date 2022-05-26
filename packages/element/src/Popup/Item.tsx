import React, { useEffect, useRef } from 'react'
import { StyleSheet, Dimensions, StatusBar, Platform, Animated } from 'react-native'
import { Box } from '../Box'
import type { PopupItemProps } from './types'

const { height } = Dimensions.get('window')

const maxHeight = height + (Platform.OS === 'android' ? (StatusBar.currentHeight ?? 20) + 20 : 20)

const AnimationBox = Animated.createAnimatedComponent(Box)

const springConfig: Omit<Animated.SpringAnimationConfig, 'toValue'> = {
  damping: 4,
  mass: 0.1,
  stiffness: 65,

  overshootClamping: true,
  restSpeedThreshold: 0.1,
  restDisplacementThreshold: 0.1,
  useNativeDriver: true,
}

const PopupItem: React.FC<PopupItemProps> = ({ value, onClose }) => {
  const animation = useRef(new Animated.Value(0)).current

  useEffect(() => {
    Animated.spring(animation, { ...springConfig, toValue: 1 }).start()
  }, [animation])

  const onHide = (animated: boolean = true) => {
    if (animated) {
      Animated.spring(animation, { ...springConfig, toValue: 2 }).start(() => {
        callback()
      })
      return
    }
    animation.setValue(1)
    callback()
  }

  const callback = () => {
    if (typeof onClose === 'function') {
      onClose(value.id)
    }
  }

  const overlayStyle = {
    opacity: animation.interpolate({
      inputRange: [0, 1, 2],
      outputRange: [0.2, 1, 0.2],
      extrapolate: 'clamp',
    }),
  }

  const contentStyle = {
    transform: [
      {
        translateY: animation.interpolate({
          inputRange: [0, 1, 2],
          outputRange: [maxHeight, 0, maxHeight],
          extrapolate: 'clamp',
        }),
      },
    ],
  }

  return (
    <Box {...StyleSheet.absoluteFillObject}>
      <AnimationBox
        {...StyleSheet.absoluteFillObject}
        color="rgba(0,0,0,0.4)"
        style={overlayStyle}
      />
      <AnimationBox flex={1} style={contentStyle}>
        {value.children({ onClose: onHide })}
      </AnimationBox>
    </Box>
  )
}

export default PopupItem

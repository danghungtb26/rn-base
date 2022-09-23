import React, { useEffect, useRef, useState } from 'react'
import {
  Animated,
  Easing,
  GestureResponderEvent,
  LayoutChangeEvent,
  Pressable,
  PressableProps,
  StyleSheet,
} from 'react-native'
import { Box } from '../Box'
import type { RefView } from '../types'
import { equal } from '../Utils'

const { timing } = Animated

const radius = 8
const styles = StyleSheet.create({
  ripple: {
    width: radius * 2,
    height: radius * 2,
    borderRadius: radius,
    overflow: 'hidden',
    position: 'absolute',
  },
})

interface TouchRippleProps extends PressableProps {
  renderTouchComponent?: (props: any) => React.ReactElement<any>
  color?: string
  duration?: number
}

interface Ripple {
  unique: number
  R: number
  progress: Animated.Value
  locationX: number
  locationY: number
  // eslint-disable-next-line react/no-unused-prop-types
  started: boolean
}
export const getRipple: (p: {
  dimension: { width: number; height: number }
  event: GestureResponderEvent
  unique: number
}) => Ripple = ({ unique = 0, dimension, event }) => {
  const { width = 0, height = 0 } = dimension
  const { locationX, locationY } = event.nativeEvent

  const w2 = width / 2
  const h2 = height / 2

  const ofX = Math.abs(w2 - locationX)
  const ofY = Math.abs(h2 - locationY)

  const R = Math.sqrt((w2 + ofX) ** 2 + (h2 + ofY) ** 2)

  return {
    unique: unique + 1,
    progress: new Animated.Value(0),
    R,
    locationX,
    locationY,
    started: false,
  }
}

interface RippleProps extends Ripple {
  color?: string
}

const RippleComponent: React.FC<RippleProps> = ({
  locationX,
  locationY,
  R,
  progress,
  color = '#fff',
  unique,
}) => {
  const style = {
    top: locationY - radius,
    left: locationX - radius,
    transform: [
      {
        scale: progress.interpolate({
          inputRange: [0, 1],
          outputRange: [0.5 / radius, R / radius],
        }),
      },
    ],
    opacity: progress.interpolate({
      inputRange: [0, 1],
      outputRange: [0.5, 0.05],
    }),
    backgroundColor: color,
  }
  return <Animated.View pointerEvents="box-only" key={unique} style={[styles.ripple, style]} />
}

const TouchRippleBase = React.forwardRef<RefView, TouchRippleProps>(
  (
    {
      renderTouchComponent = (props: PressableProps) => <Pressable {...props} />,
      onPressIn = () => {},
      //   onLongPress,
      onLayout,
      children,
      duration = 300,
      color = '#fff',
      ...props
    },
    ref,
  ) => {
    const [offset, setOffset] = useState({
      width: 0,
      height: 0,
    })
    const [ripples, setRipples] = useState<Ripple[]>([])

    const unique = useRef<number>(0)
    const onLayoutTouch = (event: LayoutChangeEvent) => {
      const { layout } = event.nativeEvent
      setOffset({ width: layout.width || 0, height: layout.height || 0 })
      onLayout?.(event)
    }

    const press = (event: GestureResponderEvent) => {
      startRipple(event)
      onPressIn?.(event)
    }

    // const longPress = (event: GestureResponderEvent) => {
    //   startRipple(event)
    // }

    const startRipple = (event: GestureResponderEvent) => {
      unique.current += 1
      const ripple = getRipple({ dimension: offset, event, unique: unique.current })
      setRipples(s => s.concat(ripple))
    }

    useEffect(() => {
      const ripple = ripples[ripples.length - 1]
      if (ripple && !ripple.started) {
        let checkFinished = false
        ripple.started = true
        timing(ripple.progress, {
          toValue: 1,
          duration,
          easing: Easing.in(Easing.ease),
          useNativeDriver: true,
        }).start(() => {
          if (!checkFinished) {
            checkFinished = true
            setRipples(s => s.filter(i => i.unique !== s[0]?.unique))
          }
        })
      }
    }, [duration, ripples])

    const renderChildren = () => {
      return (
        <>
          {children}
          <Box
            pointerEvents="box-only"
            overflow="hidden"
            position="absolute"
            top={0}
            left={0}
            right={0}
            bottom={0}
          >
            {ripples.map(item => (
              <RippleComponent key={item.unique} {...item} color={color} />
            ))}
          </Box>
        </>
      )
    }

    return React.cloneElement(
      renderTouchComponent({
        hitSlop: { top: 10, left: 10, right: 10, bottom: 10 },
        onLayout: onLayoutTouch,
        onPressIn: press,
        // onLongPress: onLongPress ? longPress : undefined,
        ...props,
        children: renderChildren(),
      }),
      ref
        ? {
            ref,
          }
        : {},
    )
  },
)

const TouchRipple = React.memo(TouchRippleBase, equal)

export default TouchRipple

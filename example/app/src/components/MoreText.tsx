// @ts-nocheck

import React, { useRef } from 'react'
import { Pressable } from 'react-native'
import { Box, Text } from '@dvh-module/element'
import type { TextBaseProps } from '@dvh-module/element'
import Animated, { timing, useValue, Easing } from 'react-native-reanimated'

const BoxA = Animated.createAnimatedComponent(Box)
const TextA = Animated.createAnimatedComponent(Text)

interface IProps extends TextBaseProps {}

const MoreText: React.FC<IProps> = ({ children, numberOfLines, ...rest }) => {
  const v = useValue<number>(0)
  const heightFullText = useRef<number>(0)
  const height = useRef<number>(0)
  const show = useRef<0 | 1>(0)

  const heightOverlay = useValue<number>(0)

  const press = () => {
    timing(v, {
      duration: 200,
      toValue: show.current ? 0 : 1,
      easing: Easing.ease,
    }).start(() => {
      show.current = show.current ? 0 : 1
    })

    timing(heightOverlay, {
      duration: 200,
      toValue: show.current ? 0 : heightFullText.current - height.current,
      easing: Easing.ease,
    }).start()
  }

  const onTextLayout = (e: any) => {
    heightFullText.current = e.nativeEvent.lines.reduce((a, b) => {
      return a + b.height
    }, 0)
    height.current = e.nativeEvent.lines.slice(0, numberOfLines).reduce((a, b) => {
      return a + b.height
    }, 0)
  }

  return (
    <Box>
      {numberOfLines !== undefined ? (
        <BoxA
          opacity={v.interpolate({
            inputRange: [0, 0.5, 1],
            outputRange: [0, 1, 1],
          })}
          position="absolute"
          top={0}
          right={0}
          left={0}>
          <Text {...rest} onTextLayout={onTextLayout}>
            {children}
          </Text>
        </BoxA>
      ) : null}
      <TextA
        opacity={v.interpolate({
          inputRange: [0, 0.5, 1],
          outputRange: [1, 1, 0],
        })}
        numberOfLines={3}
        {...rest}>
        {children}
      </TextA>
      <BoxA height={heightOverlay} style={{ transform: [{ scaleY: v }] }} />
      <Pressable onPress={press}>
        <Text size={20} margin={20}>
          More
        </Text>
      </Pressable>
    </Box>
  )
}

export default MoreText

import React, { useRef } from 'react'
import { GestureResponderEvent, PressableProps, Pressable } from 'react-native'
import type { RefView } from '../types'
import { equal } from '../Utils'

export interface TouchSingleProps extends PressableProps {
  renderTouchComponent?: (props: any) => React.ReactElement<any>
  delay?: number
}
const TouchSingleBase = React.forwardRef<RefView, TouchSingleProps>(
  (
    {
      renderTouchComponent = (props: PressableProps) => <Pressable {...props} />,
      delay = 500,
      onPress = () => {},
      ...restProps
    },
    ref,
  ) => {
    const last_time = useRef<number>(-delay)
    const press = (event: GestureResponderEvent) => {
      if (Date.now() - last_time.current >= delay * 0.9) {
        last_time.current = Date.now()
        onPress?.(event)
      }
    }

    return React.cloneElement(
      renderTouchComponent({
        hitSlop: { top: 10, left: 10, right: 10, bottom: 10 },
        onPress: typeof onPress === 'function' ? press : undefined,
        ...restProps,
      }),
      ref
        ? {
            ref,
          }
        : {},
    )
  },
)

const TouchSingle = React.memo(TouchSingleBase, equal)

export default TouchSingle

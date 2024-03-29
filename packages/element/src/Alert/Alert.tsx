import React, { useCallback, useEffect, useRef } from 'react'
import { TouchableOpacity, StyleSheet, View, Animated } from 'react-native'
import { Text } from '../Text'
import type { AlertContent } from './types'

const { spring, Value } = Animated

interface IProps {
  value: AlertContent
  onClose?: (id: number) => void
}

const springConfig: Omit<Animated.SpringAnimationConfig, 'toValue'> = {
  damping: 4,
  mass: 0.1,
  stiffness: 65,

  overshootClamping: true,
  restSpeedThreshold: 0.1,
  restDisplacementThreshold: 0.1,
  useNativeDriver: true,
}

const Alert: React.FC<IProps> = ({ value, onClose }) => {
  const { id, title, content, cancelable, actions } = value
  const animation = useRef<Animated.Value>(new Value(0))

  const open = useCallback(() => {
    animation.current.setValue(0)
    spring(animation.current, { ...springConfig, toValue: 1 }).start()
  }, [animation])

  const close = (callback?: () => void) => () => {
    let finished = false
    spring(animation.current, { ...springConfig, toValue: 2 }).start(() => {
      if (!finished) {
        finished = true
        if (typeof onClose === 'function') onClose(id)
        if (typeof callback === 'function') callback()
      }
    })
  }

  useEffect(() => {
    open()
  }, [open])

  const renderButtonAction = (text: string) => {
    return (
      <Text numberOfLines={1} size={16} color="#0080FF" weight="normal">
        {text}
      </Text>
    )
  }

  const renderAction = () => {
    if (!Array.isArray(actions)) {
      return (
        <TouchableOpacity style={styles.action} onPress={close()}>
          {renderButtonAction('OK')}
        </TouchableOpacity>
      )
    }

    if (actions.length === 1) {
      return (
        <TouchableOpacity style={styles.action} onPress={close(actions[0].onPress)}>
          {renderButtonAction(actions[0].text)}
        </TouchableOpacity>
      )
    }

    if (actions.length === 2 && actions[0].text.length < 13 && actions[1].text.length < 13) {
      return (
        <View style={[styles.viewActions, styles.twoAction]}>
          <TouchableOpacity style={[styles.action, styles.two]} onPress={close(actions[0].onPress)}>
            {renderButtonAction(actions[0].text)}
          </TouchableOpacity>
          <View style={styles.divide} />
          <TouchableOpacity style={[styles.action, styles.two]} onPress={close(actions[1].onPress)}>
            {renderButtonAction(actions[1].text)}
          </TouchableOpacity>
        </View>
      )
    }
    return (
      <>
        {actions.map((item, index) => (
          <TouchableOpacity
            key={`${item.text}-${index}`}
            style={styles.action}
            onPress={close(actions[index].onPress)}
          >
            {renderButtonAction(actions[index].text)}
          </TouchableOpacity>
        ))}
      </>
    )
  }

  return (
    <Animated.View
      style={[
        StyleSheet.absoluteFillObject,
        styles.container,
        {
          opacity: animation.current.interpolate({
            inputRange: [0, 1, 2],
            outputRange: [0, 1, 0.05],
            extrapolate: 'clamp',
          }),
        },
      ]}
    >
      {cancelable ? (
        <TouchableOpacity
          activeOpacity={0}
          style={[StyleSheet.absoluteFillObject]}
          onPress={close()}
        >
          <View />
        </TouchableOpacity>
      ) : null}
      <Animated.View
        style={[
          styles.content,
          {
            transform: [
              {
                scale: animation.current.interpolate({
                  inputRange: [0, 1, 2],
                  outputRange: [1.15, 1, 1],
                  extrapolate: 'clamp',
                }),
              },
            ],
          },
        ]}
      >
        <View style={styles.viewLabel}>
          <Text size={18} color="#000" weight="500">
            {title}
          </Text>
          <Text paddingTop={4} textAlign="center" lineHeight={18} size={13} color="#000">
            {content}
          </Text>
        </View>

        {renderAction()}
      </Animated.View>
    </Animated.View>
  )
}

export default Alert

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.18)',
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 272,
    backgroundColor: '#fff',
    borderRadius: 12,
  },
  viewLabel: {
    padding: 20,
    alignItems: 'center',
  },
  viewActions: {
    width: '100%',
  },
  twoAction: {
    flexDirection: 'row',
  },
  divide: {
    width: StyleSheet.hairlineWidth,
    backgroundColor: '#848484',
  },
  action: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#848484',
    alignItems: 'center',
    paddingVertical: 14,
    width: '100%',
  },
  two: {
    width: '50%',
  },
})

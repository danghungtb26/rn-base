import React, { useEffect, useImperativeHandle, useRef } from 'react'
import { findNodeHandle, NativeModules, TextInput, TextInputProps } from 'react-native'

type InputRef = TextInput

const { RNCustomInput } = NativeModules

type constant_type = {
  regex: 'string'
  character: 'string'
}

type Entries<T> = {
  [K in keyof T]: K
}

export const InputFilterConstants: Entries<constant_type> = RNCustomInput.getConstants()

const { setCustom } = RNCustomInput

interface Filter {
  text: string
  type: keyof constant_type
  // only ios and type == character
  inverted?: boolean
}

interface InputFilterProps extends TextInputProps {
  filters?: Filter[]
}

const InputFilter = React.forwardRef<InputRef, InputFilterProps>((props, forwardRef) => {
  const ref = useRef<InputRef>(null)

  const setFilter = useRef<boolean>(false)
  const { filters } = props

  // @ts-ignore
  useImperativeHandle(forwardRef, () => ({
    focus: () => {
      if (typeof ref.current?.focus === 'function') {
        ref.current.focus()
      }
    },
    blur: () => {
      if (typeof ref.current?.blur === 'function') {
        ref.current.blur()
      }
    },
    clear: () => {
      if (typeof ref.current?.clear === 'function') {
        ref.current.clear()
      }
    },
    forceUpdate: () => {
      if (typeof ref.current?.forceUpdate === 'function') {
        ref.current.forceUpdate()
      }
    },
    measure: (...arg) => {
      if (typeof ref.current?.measure === 'function') {
        ref.current.measure(...arg)
      }
    },
    measureInWindow: (...arg) => {
      if (typeof ref.current?.measureInWindow === 'function') {
        ref.current.measureInWindow(...arg)
      }
    },
    measureLayout: (...arg) => {
      if (typeof ref.current?.measureLayout === 'function') {
        ref.current.measureLayout(...arg)
      }
    },
  }))

  useEffect(() => {
    if (setFilter.current) return
    setFilter.current = true

    if ((filters?.length ?? 0) > 0) {
      setCustom(findNodeHandle(ref.current), {
        filter: filters,
      })
    }
  }, [filters])

  return <TextInput ref={ref} {...props} />
})

export default InputFilter

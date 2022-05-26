import React, { useEffect, useImperativeHandle, useRef } from 'react'
import { findNodeHandle, NativeModules, TextInput, TextInputProps } from 'react-native'

type InputRef = TextInput

const { RNCustomInput } = NativeModules

export type constant_type = {
  regex: 'string'
  character: 'string'
}

type Entries<T> = {
  [K in keyof T]: K
}

export const InputFilterConstants: Entries<constant_type> = RNCustomInput.getConstants()

const { setCustom } = RNCustomInput

export interface Filter {
  text: string
  type: keyof constant_type
  // only ios and type == character
  inverted?: boolean
}

export interface InputFilterProps extends TextInputProps {
  filters?: Filter[]
}

const InputFilter = React.forwardRef<InputRef, InputFilterProps>((props, forwardRef) => {
  const ref = useRef<InputRef>(null)

  const setFilter = useRef<boolean>(false)
  const { filters } = props

  // @ts-ignore
  useImperativeHandle(forwardRef, () => ({
    focus: () => {
      ref.current?.focus?.()
    },
    blur: () => {
      ref.current?.blur?.()
    },
    clear: () => {
      ref.current?.clear?.()
    },
    forceUpdate: () => {
      ref.current?.forceUpdate?.()
    },
    measure: (...arg) => {
      ref.current?.measure?.(...arg)
    },
    measureInWindow: (...arg) => {
      ref.current?.measureInWindow?.(...arg)
    },
    measureLayout: (...arg) => {
      ref.current?.measureLayout?.(...arg)
    },
    setNativeProps: (...arg) => {
      ref.current?.setNativeProps?.(...arg)
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

    // not update,
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <TextInput ref={ref} {...props} />
})

export default InputFilter

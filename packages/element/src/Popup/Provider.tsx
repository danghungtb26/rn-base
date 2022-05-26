import React, { useEffect, useState } from 'react'
import { BackHandler, StyleSheet, View } from 'react-native'
import type { PopupAction, PopupContent, PopupItemProps } from './types'
import PopupItem from './Item'

const Provider = React.forwardRef<
  PopupAction,
  {
    RenderItem?: React.FC<PopupItemProps>
  }
>(({ RenderItem = PopupItem }, ref) => {
  const [popup, setPopup] = useState<PopupContent[]>([])

  React.useImperativeHandle(ref, () => ({
    show: (value: Omit<PopupContent, 'id'>) => {
      const id = Number(Date.now().toString())
      setPopup(s => s.concat([{ ...value, id }]))
      return id
    },
    hide: onHide,
    hideAll: () => {
      setPopup([])
    },
  }))

  useEffect(() => {
    const onBackPress = () => {
      if (popup.length !== 0) {
        return true
      }

      return false
    }
    BackHandler.addEventListener('hardwareBackPress', onBackPress)

    return () => BackHandler.removeEventListener('hardwareBackPress', onBackPress)
  }, [popup.length])

  const onHide = (id: number) => {
    setPopup(s => s.filter(i => i.id !== id))
  }

  if (popup.length === 0) return null

  return (
    <PopupProvider.View {...StyleSheet.absoluteFillObject} pointerEvents="box-none">
      {popup.length > 0
        ? popup.map(item => <RenderItem onClose={onHide} key={item.id} value={item} />)
        : null}
    </PopupProvider.View>
  )
})

let AlertProviderRef: any

const setRef = (ref: any) => {
  if (ref) AlertProviderRef = ref
}

const PopupProvider: PopupAction & { View: typeof View } & React.FC<any> = props => {
  return <Provider {...props} ref={setRef} />
}

PopupProvider.show = (...arg) => AlertProviderRef?.show(...arg) || 0

PopupProvider.hide = (...arg) => AlertProviderRef?.hide(...arg)

PopupProvider.hideAll = () => AlertProviderRef?.hideAll() || (() => {})

PopupProvider.View = View

export default PopupProvider

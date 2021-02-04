import { Box } from '@dvh-module/app-component'
import React, { useState } from 'react'

import Alert from './Alert'
import type { AlertAction, AlertContent } from './types'

const Provider = React.forwardRef<AlertAction, any>(({ children }, ref) => {
  const [alert, setAlert] = useState<AlertContent[]>([])

  React.useImperativeHandle(ref, () => ({
    show: (value: Omit<AlertContent, 'id'>) => {
      const id = Number(Date.now().toString())
      setAlert(s => s.concat([{ ...value, cancelable: value.cancelable ?? true, id }]))
      return id
    },
    hide: onHide,
  }))

  const onHide = (id: number) => {
    setAlert(s => s.filter(i => i.id !== id))
  }

  return (
    <Box flex={1}>
      {children}
      {alert.length > 0 ? (
        <Box pointerEvents="box-none" position="absolute" top={0} bottom={0} right={0} left={0}>
          {alert.map(item => (
            <Alert onClose={onHide} key={item.id} value={item} />
          ))}
        </Box>
      ) : null}
    </Box>
  )
})

const AlertProvider: AlertAction & React.FC<any> = props => {
  return <Provider {...props} ref={AlertProviderRef} />
}

AlertProvider.show = (...arg) => AlertProviderRef.current?.show(...arg) || 0

AlertProvider.hide = (...arg) => AlertProviderRef.current?.hide(...arg)

export default AlertProvider

export const AlertProviderRef = React.createRef<AlertAction>()

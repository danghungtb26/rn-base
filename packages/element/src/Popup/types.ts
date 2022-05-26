import type React from 'react'

export interface PopupContent {
  id: number
  children: (p: { onClose: (animated?: boolean) => void }) => React.ReactNode
  type?: 'fade' | 'bottom'
}

export type PopupShowAction = (value: Omit<PopupContent, 'id'>) => number
export type PopupHideAction = (id: number) => void

export interface PopupAction {
  show: PopupShowAction
  hide: PopupHideAction
  hideAll: () => void
}

export interface PopupItemProps {
  value: PopupContent
  onClose?: (id: number) => void
}

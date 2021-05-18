export interface AlertButton {
  text: string
  onPress?: () => void
}

export interface AlertContent {
  id: number
  title: string
  content: string
  cancelable?: boolean
  actions?: AlertButton[]
}

export type ShowAction = (value: Omit<AlertContent, 'id'>) => number
export type HideAction = (id: number) => void

export interface AlertAction {
  show: ShowAction
  hide: HideAction
}

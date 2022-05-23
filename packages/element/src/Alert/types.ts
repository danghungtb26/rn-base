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

export type ShowAlertAction = (value: Omit<AlertContent, 'id'>) => number
export type HideAlertAction = (id: number) => void

export interface AlertAction {
  show: ShowAlertAction
  hide: HideAlertAction
}

import type { FunctionTypeArray } from '../types'

export const generateHeader: FunctionTypeArray = p => {
  if (!p.header) return []
  return [`      <Header title="${p.name}" />`]
}

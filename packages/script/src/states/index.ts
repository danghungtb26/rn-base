import type { FunctionTypeArray } from '../types'
import { generateBaseState, generatePageState, generateRefreshState } from './base'

export const generateState: FunctionTypeArray = p => {
  const { isList, isScroll, useState } = p
  const props: string[] = []
  if (!useState) return props

  props.push(...generateBaseState(p))
  if (isScroll || isList) props.push(...generateRefreshState(p))
  if (isList) props.push(...generatePageState(p))

  return props
}

export type Params = {
  name: string
  useBase: boolean
  useTypescript: boolean
  useState: boolean
  isList: boolean
  isScroll: boolean
  header: boolean
  model: string
  base: BASE_COMPONENT
  content: CONTENT_VIEW
  props?: { name: string; type: string }[]
}
export enum BASE_COMPONENT {
  REACT_NATIVE,
  RN_BASE,
}

export enum CONTENT_VIEW {
  STATIC,

  SCROLL_VIEW,

  FLAT_LIST,
}

export type FunctionType = (p: Params) => string

export type FunctionTypeArray = (p: Params) => string[]

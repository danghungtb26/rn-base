import type { FunctionTypeArray } from '../types'

export const generateBaseState: FunctionTypeArray = ({ useTypescript, model, isList }) => {
  return [
    `const [data, setData] = useState${useTypescript ? `<${model}${isList ? '[]' : ''}>` : ''}(${
      isList ? '[]' : ''
    })`,
    `const [loading, setLoading] = useState${useTypescript ? '<boolean>' : ''}(false)`,
    `const [error, setError] = useState${useTypescript ? '<boolean | string>' : ''}(false)`,
  ].map(i => `  ${i}`)
}

export const generateRefreshState: FunctionTypeArray = ({ useTypescript }) => {
  return [
    `  const [refreshing, setRefreshing] = useState${useTypescript ? '<boolean>' : ''}(false)`,
  ]
}

export const generatePageType: FunctionTypeArray = p => {
  if (!p.useTypescript || !p.useState || !p.isList) return []
  return ['', 'type Page = {', '  current: number', '  max: number', '}']
}

export const generatePageState: FunctionTypeArray = ({ useTypescript }) => {
  return [
    `  const [page, setPage] = useState${useTypescript ? '<Page>' : ''}({ current: 1, max: 10 })`,
  ]
}

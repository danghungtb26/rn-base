import type { FunctionTypeArray } from '../types'

export const generateFetchDataFunction: FunctionTypeArray = () => {
  return [
    '',
    '  const fetchData = useCallback(() => {}, [])',
    '',
    '  useEffect(() => {',
    '    fetchData()',
    '  }, [fetchData])',
  ]
}

export const generateLoadMoreFunction: FunctionTypeArray = p => {
  if (!p.isList) return []
  return [
    '',
    '  const onLoadMore = useCallback(() => {',
    '    if (page.current >= page.max) return',
    '    const _ = () => {}',
    '  }, [])',
  ]
}

export const generateRefreshFunction: FunctionTypeArray = p => {
  if (!p.isScroll) return []
  return [
    '',
    '  const onRefresh = useCallback(() => {',
    '    setRefreshing(true)',
    '    fetchData()',
    '  }, [fetchData])',
  ]
}

export const generateFunction: FunctionTypeArray = p => {
  if (!p.useState) return []

  return [
    ...generateFetchDataFunction(p),
    ...generateRefreshFunction(p),
    ...generateLoadMoreFunction(p),
  ]
}

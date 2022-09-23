import type { FunctionTypeArray } from '../types'

export const generateFlatListComponent: FunctionTypeArray = p => {
  const props: string[] = [
    'style={styles.full}',
    'data={data}',
    'keyExtractor={item => item.toString()}',
    'renderItem={renderItem}',
  ]
  if (p.useState) {
    props.push(
      'refreshControl={<RefreshControl onRefresh={onRefresh} refreshing={refreshing} />}',
      'scrollEventThrottle={0.5}',
      'onEndReached={onLoadMore}',
      'ListFooterComponent={renderPage}',
      'ListEmptyComponent={renderEmpty}',
    )
  }

  return ['<FlatList', ...props.map(i => `  ${i}`), '/>'].map(i => `      ${i}`)
}

export const generateRenderItem: FunctionTypeArray = p => {
  if (!p.isList) return []
  return [
    '',
    `  const renderItem${
      p.useTypescript ? `: FlatListProps<${p.model}>['renderItem']` : ''
    } = ({ item }) => {`,
    '    return <Item data={item} />',
    '  }',
  ]
}

export const generateMorePage: FunctionTypeArray = p => {
  if (!p.isList || !p.useState) return []
  return [
    '',
    '  const renderPage = () => {',
    '    if (page.current >= page.max) {',
    '      return null',
    '    }',
    '',
    '    return <LoadMore />',
    '  }',
  ]
}

export const generateRenderEmpty: FunctionTypeArray = p => {
  if (!p.isList || !p.useState) return []
  return ['', '  const renderEmpty = () => {', '    return <Empty />', '  }']
}

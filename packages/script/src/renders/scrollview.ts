import type { FunctionTypeArray } from '../types'

export const generateScrollViewComponent: FunctionTypeArray = p => {
  let props = ['style={styles.full}']
  if (p.useState) {
    props = props.concat(
      'refreshControl={<RefreshControl onRefresh={onRefresh} refreshing={refreshing} />}'
    )
  }
  return [
    '<ScrollView',
    ...props.map(i => `  ${i}`),
    '>',
    `  <Text>${p.name}</Text>`,
    '</ScrollView>',
  ].map(i => `      ${i}`)
}

import type { FunctionTypeArray } from '../types'

export const generateContainerView: (p: Parameters<FunctionTypeArray>['0']) => {
  start: string
  end: string
} = p => {
  if (!p.useBase) {
    return {
      start: '<View style={styles.container}>',
      end: '</View>',
    }
  }
  return {
    start: '<Box flex={1} color="#ffffff">',
    end: '</Box>',
  }
}

export const generateContentViewComponent: FunctionTypeArray = p => {
  const text = `  <Text>${p.name}</Text>`
  if (p.useBase) {
    return ['<Box flex={1} center middle>', text, '</Box>'].map(i => `      ${i}`)
  }

  return ['<View style={styles.content}>', text, '</View>'].map(i => `      ${i}`)
}

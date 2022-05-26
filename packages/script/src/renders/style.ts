import type { FunctionTypeArray } from '../types'

export const generateContainerStyle: FunctionTypeArray = () => {
  return ['  container: {', '    flex: 1,', "    backgroundColor: '#ffffff',", '  },']
}

export const generateFullStyle: FunctionTypeArray = () => {
  return ['  full: {', '    flex: 1,', '  },']
}

export const generateContentStyle: FunctionTypeArray = () => {
  return [
    '  content: {',
    '    flex: 1,',
    "    alignItems: 'center',",
    "    justifyContent: 'center',",
    '  },',
  ]
}

export const generateStyle: FunctionTypeArray = p => {
  const props: string[] = ['const styles = StyleSheet.create({']

  if (!p.useBase) {
    props.push(...generateContainerStyle(p))
    props.push(...generateContentStyle(p))
  }

  props.push(...generateFullStyle(p))

  props.push('})')

  return props
}

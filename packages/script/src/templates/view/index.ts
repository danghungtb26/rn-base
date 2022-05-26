import { generateFunction } from '../../functions'
import { generateRender, generateStyle } from '../../renders'
import { generateState } from '../../states'
import { generatePageType } from '../../states/base'
import { CONTENT_VIEW, FunctionType, FunctionTypeArray } from '../../types'

// const importBase = ''
// const importReactNative = "import { View } from 'react-native'"

export const generateImport: FunctionTypeArray = ({
  useBase,
  isScroll,
  useState,
  content,
  useTypescript,
}) => {
  const importReacts = ['import React']
  if (useState) {
    importReacts.push(', { useState, useCallback, useEffect }')
  }
  importReacts.push(" from 'React'")

  const imports = [importReacts.join(''), "import { Text } from '@components'"]

  const importRN = ['import { StyleSheet']

  if (!useBase) {
    importRN.push(', View')
  }

  if (isScroll && useState) {
    importRN.push(', RefreshControl')
  }

  if (content === CONTENT_VIEW.FLAT_LIST) {
    importRN.push(', FlatList')
    if (useTypescript) {
      importRN.push(', FlatListProps')
    }
  }
  if (content === CONTENT_VIEW.SCROLL_VIEW) {
    importRN.push(', ScrollView')
  }

  importRN.push(" } from 'react-native'")

  imports.push(importRN.join(''))

  if (useBase) {
    imports.push("import { Box } from '@rn-base/element'")
  }

  if (content === CONTENT_VIEW.FLAT_LIST) {
    imports.push("import Item from './Item'")
  }

  return imports
}

export const generatePropsType: FunctionTypeArray = p => {
  if (!p.useTypescript) return []

  if (!p.props || p.props.length === 0) return ['', `type ${p.name}Props = {}`]

  const types = [`type ${p.name}Props = {`]
  p.props.forEach(i => {
    types.push(`  ${i.name}: ${i.type}`)
  })

  types.push('}')
  return types
}

export const generateName: FunctionTypeArray = p => {
  return [
    `const ${p.name}${p.useTypescript ? `: React.FC<${p.name}Props>` : ''} = (${
      p.props && p.props.length > 0 ? 'props' : ''
    }) => {`,
  ]
}

export const generateProps: FunctionTypeArray = p => {
  if (!p.props || p.props.length === 0) return []

  return [`const { ${p.props.join(', ')} } = props`]
}

export const generateExport: FunctionTypeArray = p => {
  return [`export default ${p.name}`]
}

const generateView: FunctionType = p => {
  return [
    ...generateImport(p),
    ...generatePageType(p),
    ...generatePropsType(p),
    '',
    ...generateName(p),
    ...generateState(p),
    ...generateFunction(p),
    ...generateRender(p),
    '}',
    '',
    ...generateExport(p),
    '',
    ...generateStyle(p),
    '',
  ].join('\n')
}

export default generateView

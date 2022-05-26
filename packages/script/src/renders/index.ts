import type { FunctionTypeArray } from '../types'
import {
  generateFlatListComponent,
  generateMorePage,
  generateRenderEmpty,
  generateRenderItem,
} from './flatlist'
import { generateScrollViewComponent } from './scrollview'
import { generateContainerView, generateContentViewComponent } from './view'

export const generateContentRender: FunctionTypeArray = p => {
  if (p.isList) return generateFlatListComponent(p)

  if (p.isScroll) return generateScrollViewComponent(p)

  return generateContentViewComponent(p)
}

export const generateContentRenderState: FunctionTypeArray = p => {
  if (!p.useState) return []

  return [
    `    if (loading${p.isList ? ' && data.length === 0' : ''}) {`,
    '      return <Loading />',
    '    }',
    '',
    `    if (error${p.isList ? ' && data.length === 0' : ''}) {`,
    '      return <Error />',
    '    }',
    '',
  ]
}

export const generateRender: FunctionTypeArray = p => {
  const container = generateContainerView(p)
  return [
    ...generateRenderItem(p),
    ...generateMorePage(p),
    ...generateRenderEmpty(p),
    '',
    '  const renderContent = () => {',
    ...generateContentRenderState(p),
    '    return (',
    ...generateContentRender(p),
    '    )',
    '  }',
    '',
    '  return (',
    `    ${container.start}`,
    '      {renderContent()}',
    `    ${container.end}`,
    '  )',
  ]
}

export * from './style'

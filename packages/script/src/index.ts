#!/usr/bin/env node
/* eslint-disable no-console */
import { program } from 'commander'
import prompts from 'prompts'
// @ts-ignore
import currentDir from 'current-dir'
import fs from 'fs'
import { generateView } from './templates'
import { BASE_COMPONENT, CONTENT_VIEW } from './types'

import 'colors'

const options: prompts.PromptObject<string>[] = [
  {
    message: 'name: ',
    type: 'text',
    name: 'name',
    validate: value => value.length > 0,
  },
  {
    message: 'file name: ',
    type: 'text',
    name: 'fileName',
    initial: v => v,
    validate: value => value.length > 0,
  },
  {
    message: 'directory',
    type: 'text',
    hint: 'src/features',
    name: 'directory',
    initial: 'src/features',
  },
  {
    message: 'use typescript',
    type: 'confirm',
    name: 'typescript',
    initial: true,
  },
  {
    message: 'use state',
    type: 'confirm',
    name: 'useState',
    initial: true,
  },
  {
    message: 'data model',
    type: 'text',
    name: 'model',
    initial: 'any',
  },
  {
    message: 'add header',
    type: 'confirm',
    name: 'header',
    initial: true,
  },
  {
    message: 'select base',
    type: 'select',
    name: 'base',
    choices: [
      { title: 'RN base', value: BASE_COMPONENT.RN_BASE },
      { title: 'React native', value: BASE_COMPONENT.REACT_NATIVE },
    ],
  },
  {
    message: 'select content base',
    type: 'select',
    name: 'content',
    choices: [
      { title: 'Static', value: CONTENT_VIEW.STATIC },
      { title: 'ScrollView', value: CONTENT_VIEW.SCROLL_VIEW },
      { title: 'FlatList', value: CONTENT_VIEW.FLAT_LIST },
    ],
    initial: CONTENT_VIEW.FLAT_LIST,
  },
  {
    message: 'add item',
    type: 'confirm',
    name: 'item',
    initial: true,
  },
  {
    type: 'confirm',
    name: 'confirm',
    message: 'Can you confirm?',
    initial: true,
  },
]

const questions = async () => {
  const q = await prompts(options)

  if (!q.confirm) return
  const create = () => {
    const file = `${viewDir}/${q.name}.${q.typescript ? 'tsx' : 'js'}`
    const content = generateView({
      name: 'Home',
      useBase: q.base === BASE_COMPONENT.RN_BASE,
      useTypescript: q.typescript,
      isList: q.content === CONTENT_VIEW.FLAT_LIST,
      isScroll: q.content === CONTENT_VIEW.SCROLL_VIEW || q.content === CONTENT_VIEW.FLAT_LIST,
      useState: q.useState,
      header: q.header,
      base: q.base,
      content: q.content,
      model: q.model,
    })
    fs.writeFile(file, content, _ => {
      console.log(`Generate ${q.name}.${q.typescript ? 'tsx' : 'js'} successfully!`.green)
    })
    if (q.content === CONTENT_VIEW.FLAT_LIST && q.item) {
      const contentItem = generateView({
        name: 'Item',
        useBase: q.base === BASE_COMPONENT.RN_BASE,
        useTypescript: q.typescript,
        isList: false,
        isScroll: false,
        useState: false,
        header: false,
        base: q.base,
        content: CONTENT_VIEW.STATIC,
        model: q.model,
        props: [{ name: 'data', type: 'any' }],
      })
      const itemFile = `${viewDir}/Item.${q.typescript ? 'tsx' : 'js'}`
      fs.writeFile(itemFile, contentItem, _ => {
        console.log(`Generate Item.${q.typescript ? 'tsx' : 'js'} successfully!`.green)
      })
    }
  }

  const dir = currentDir()
  const viewDir = `${dir}/${q.directory}`.trim()

  if (fs.existsSync(viewDir)) {
    create()
    return
  }

  console.log(`Directory ${q.directory} not exists`.bgRed)
  const q2 = await prompts({
    type: 'confirm',
    message: `Are you want to create directory ${q.directory}`,
    name: 'confirm',
    initial: false,
  })

  if (!q2) {
    console.log('Bye bye!'.green)
    return
  }
  const directories = q.directory.split('/')

  let a = dir
  directories.forEach((element: string) => {
    a = `${a}/${element}`
    if (!fs.existsSync(a)) {
      fs.mkdirSync(a)
    }
  })

  create()
}

const generate = () => {
  program
    .command('generate')
    .alias('g')
    .option('-v', '--view')

    .action(() => {
      questions()
    })

  program.parse()
}

generate()

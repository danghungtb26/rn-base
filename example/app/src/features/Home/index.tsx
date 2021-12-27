import { Box, Text, TouchSingle, useColors } from '@rn-base/element'
import { widthLize } from '@rn-base/native'
import React from 'react'
import { FlatList, StyleSheet } from 'react-native'

import { HomeScreenNavigationProps, routes } from '../../navigator/routes'

interface IProps extends HomeScreenNavigationProps {}

const features_example = [
  {
    key: 1,
    title: 'Alert example',
    route: routes.Alert,
  },
  {
    key: 2,
    title: 'Text screen',
    route: routes.Text,
  },
  {
    key: 3,
    title: 'Button screen',
    route: routes.Button,
  },
  {
    key: 4,
    title: 'Input screen',
    route: routes.Input,
  },
  {
    key: 5,
    title: 'Native screen',
    route: routes.NativeScreen,
  },
]

const HomeScreen: React.FC<IProps> = ({ navigation }) => {
  const colors = useColors<{ primary: string }>()
  return (
    <Box flex={1} color={colors.primary}>
      <FlatList
        data={features_example}
        keyExtractor={item => `${item.key}`}
        renderItem={({ item }) => (
          <TouchSingle onPress={() => navigation.push(item.route)}>
            <Text size={widthLize(12) as number} padding={12}>
              {item.title}
            </Text>
          </TouchSingle>
        )}
        ItemSeparatorComponent={() => (
          <Box width="100%" color="#424242" height={StyleSheet.hairlineWidth} />
        )}
      />
    </Box>
  )
}

export default HomeScreen

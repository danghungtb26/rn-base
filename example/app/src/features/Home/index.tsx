import { Box, Text } from '@dvh-module/app-component'
import React from 'react'
import { FlatList, StyleSheet } from 'react-native'

import { HomeScreenNavigationProps, routes } from '../../navigator/routes'
import { TouchableOpacity } from 'react-native-gesture-handler'

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
]

const HomeScreen: React.FC<IProps> = ({ navigation }) => {
  return (
    <Box flex={1}>
      <FlatList
        data={features_example}
        keyExtractor={item => `${item.key}`}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.push(item.route)}>
            <Text size={14} padding={12}>
              {item.title}
            </Text>
          </TouchableOpacity>
        )}
        ItemSeparatorComponent={() => (
          <Box width="100%" color="#424242" height={StyleSheet.hairlineWidth} />
        )}
      />
    </Box>
  )
}

export default HomeScreen

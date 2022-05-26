import React from 'react'
import { View, Alert } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { AlertProvider, Box, PopupProvider, Text, TouchSingle } from '@rn-base/element'
import type { AlertScreenNavigationProps } from '../../navigator/routes'

interface IProps extends AlertScreenNavigationProps {}

const AlertScreen: React.FC<IProps> = () => {
  const onPress = () =>
    AlertProvider.show({
      title: 'Xin chao',
      content: 'chao cai gif as chao cai gif as chao cai gif as chao cai gif as chao cai gif as',
      actions: [{ text: 'xin chao 1asds', onPress: () => {} }, { text: 'xin chao 2' }],
      cancelable: false,
    })
  return (
    // <AlertProvider ref={AlertProviderRef}>
    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
      <TouchableOpacity onPress={onPress}>
        <Text size={20}>AlertScreenss</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() =>
          Alert.alert(
            'Xin choa',
            'chao cai gif as chao cai gif as chao cai gif as chao cai gif as chao cai gif as',
            [{ text: 'xin chao 1asds' }, { text: 'xin chao 2' }]
          )
        }
      >
        <Text size={20}>AlertScreenss</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() =>
          PopupProvider.show({
            children: ({ onClose }) => (
              <Box center middle flex={1}>
                <Box paddingVertical={50} color="white" radius={10} width="100%">
                  <TouchSingle onPress={() => onClose(true)}>
                    <Text size={20}>This is popup</Text>
                  </TouchSingle>
                </Box>
              </Box>
            ),
          })
        }
      >
        <Text size={20} padding={20}>
          Show Popup
        </Text>
      </TouchableOpacity>
    </View>
    // </AlertProvider>
  )
}

export default AlertScreen

import React from 'react'
import { Text, View, Alert } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { AlertProvider } from '@rn-base/element'
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
        <Text>AlertScreenss</Text>
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
        <Text>AlertScreenss</Text>
      </TouchableOpacity>
    </View>
    // </AlertProvider>
  )
}

export default AlertScreen

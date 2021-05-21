import React, { useState } from 'react'
import { Box, Text } from '@rn-base/element'
import InputFilter, { InputFilterConstants } from '@rn-base/input-filter'

// interface InputFilterProps {}

const InputFilters: React.FC<{}> = () => {
  const [text, setText] = useState('')

  return (
    <Box flex={1} center middle>
      <InputFilter
        filters={[
          { text: 'abcbcc', type: InputFilterConstants.character },
          {
            text: '[^0-9]',
            type: InputFilterConstants.regex,
          },
        ]}
        style={{ width: 100, backgroundColor: 'red' }}
        onChangeText={value => setText(value)}
        maxLength={10}
      />

      <Text size={20}>{text}</Text>
    </Box>
  )
}

export default InputFilters

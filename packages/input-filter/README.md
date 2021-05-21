# @rn-base/input-filter

react-native filter input

## Installation

```sh
npm install @rn-base/input-filter
```

## Usage

```js
import { Box, Text } from '@rn-base/element';
import InputFilter, { InputFilterConstants } from '@rn-base/input-filter';

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
  />

  <Text size={20}>{text}</Text>
</Box>;
```

## Props

- filters: Array
  - text: regex or Array<string>
  - type: view InputFilterConstants
  - inverted (suport IOS and InputFilterConstants.character)

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

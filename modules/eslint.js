module.exports = {
  parser: '@typescript-eslint/parser',
  extends: ['./index.js', 'airbnb', 'prettier'],
  plugins: ['react', 'import', 'prettier', '@typescript-eslint'],
  rules: {
    'react/static-property-placement': [
      'error',
      'property assignment',
      {
        contextTypes: 'static public field',
        childContextTypes: 'static public field',
      },
    ],
    'react/prop-types': 0,
    'no-param-reassign': [
      'error',
      { props: true, ignorePropertyModificationsForRegex: ['^state'] },
    ],
    camelcase: 0,
    'react/jsx-filename-extension': [
      1,
      {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    ],
    'linebreak-style': 0,
    'react/prefer-stateless-function': [
      2,
      {
        ignorePureComponents: true,
      },
    ],
    'react/forbid-prop-types': [
      0,
      {
        forbid: [],
      },
    ],
    'import/extensions': [
      1,
      'never',
      {
        svg: 'always',
      },
    ],
    'import/no-extraneous-dependencies': ['error', { packageDir: '.' }],
    'prettier/prettier': [
      'error',
      {
        trailingComma: 'es5',
        singleQuote: true,
        printWidth: 100,
        semi: false,
      },
    ],
    semi: ['error', 'never'],
    'no-use-before-define': [
      'error',
      {
        variables: false,
      },
    ],
    'react/require-default-props': [0, { forbidDefaultForRequired: false }],
    'global-require': 0,
    'react/jsx-props-no-spreading': 0,
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        vars: 'all',
        args: 'after-used',
        ignoreRestSiblings: true,
      },
    ],
    'import/no-unresolved': 'error',
  },
  env: {
    jest: true,
  },
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
  },
  globals: {
    window: true,
    document: true,
    localStorage: true,
    FormData: true,
    FileReader: true,
    Blob: true,
    navigator: true,
    Headers: true,
    Request: true,
    fetch: true,
    alert: true,
  },
}

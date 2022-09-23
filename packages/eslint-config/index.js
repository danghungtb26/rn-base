module.exports = {
  parser: '@typescript-eslint/parser',
  extends: ['plugin:prettier/recommended', 'prettier', 'plugin:react-hooks/recommended', 'airbnb'],
  plugins: [
    'jsx-a11y',
    'import',
    'prettier',
    '@typescript-eslint',
    'eslint-comments',
    'react-hooks',
  ],
  rules: {
    'react/jsx-filename-extension': [
      1,
      {
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.jpg', '.jpeg', '.json'],
      },
    ],
    'react/react-in-jsx-scope': 0,
    'react/function-component-definition': 0,
    'react/jsx-props-no-spreading': 0,
    semi: ['error', 'never'],
    'react/jsx-closing-bracket-location': 0,
    'import/extensions': [
      1,
      'never',
      {
        svg: 'always',
      },
    ],
    'import/no-unresolved': 0,
    'react/jsx-wrap-multilines': 0,
    'object-curly-newline': 0,
    'no-shadow': 0,
    'arrow-parens': 0,
    'no-unused-vars': 0,
    'implicit-arrow-linebreak': 0,
    'jsx-a11y/anchor-is-valid': 0,
    'no-confusing-arrow': 0,
    'react/jsx-curly-newline': 0,
    'no-use-before-define': 0,
    'comma-dangle': 0,
    'arrow-body-style': 0,
    camelcase: 0,
    'operator-linebreak': 0,
    'react/require-default-props': 0,
    'no-param-reassign': 0,
    'class-methods-use-this': 0,
    'import/prefer-default-export': 0,
    'react/jsx-one-expression-per-line': 0,
    'react/prop-types': 0,
    indent: 0,
    'react/no-unstable-nested-components': ['error', { allowAsProps: true }],
    'prefer-destructuring': 0,
    'function-paren-newline': 'off',
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

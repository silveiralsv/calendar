module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['plugin:react/recommended', 'airbnb', 'plugin:prettier/recommended', 'next/core-web-vitals'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  ignorePatterns: ['node_modules/*'],
  plugins: ['react', '@typescript-eslint', 'eslint-plugin-prettier'],
  rules: {
    'eol-last': ['error', 'always'],
    'react/function-component-definition': 'off',
    'react/jsx-filename-extension': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/jsx-props-no-spreading': 'off',
    'no-plusplus': 'off',
    'prettier/prettier': 'error',
    'import/prefer-default-export': 'off',
    'import/extensions': 'off',
    'react/jsx-no-constructed-context-values': 'off',
    'react/require-default-props': 'off',
  },
};

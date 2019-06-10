module.exports = {
  parser: 'babel-eslint',
  extends: [
    'plugin:promise/recommended',
    'airbnb-base',
    'standard'
  ],
  plugins: [],
  env: {
    es6: true,
    browser: true,
    greasemonkey: true
  },
  globals: {
    fetch: true
  },
  rules: {
    'standard/array-bracket-even-spacing': 'off',
    'standard/computed-property-even-spacing': 'off',
    'standard/object-curly-even-spacing': 'off',
    'no-console': 'off',
    'import/prefer-default-export': 'off',
    'import/namespace': 'error',
    'sort-imports': [
      'warn',
      {
        ignoreDeclarationSort: true
      }
    ],
    'space-before-function-paren': [
      'error',
      'never'
    ]
  }
}
 

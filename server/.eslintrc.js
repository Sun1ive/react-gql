module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint',
    ecmaVersion: 2017,
    sourceType: 'module',
  },
  env: {
    node: true,
  },
  extends: ['airbnb-base'],
  plugins: ['node'],
  rules: {
    'prefer-promise-reject-errors': 0,
  },
};

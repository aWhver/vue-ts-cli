module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  extends: ['eslint:recommended'],
  parserOptions: {
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
    ecmaFeatures: {
      // 不设置为true, jsx语法校验不通过
      jsx: true,
    },
  },
  env: {
    node: true,
    browser: true,
    amd: true,
    commonjs: true,
    es6: true,
    mocha: true,
  },
};

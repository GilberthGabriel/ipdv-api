module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  extends: 'airbnb-base',
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'import/prefer-default-export': 'off',
    'import/no-import-module-exports': 'off',
    'no-throw-literal': 'off',
    'consistent-return': 'off',
    'no-param-reassign': 'off',
  },
};

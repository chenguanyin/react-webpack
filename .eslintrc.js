module.exports = {
  extends: [
    "eslint-config-alloy/react",
    "eslint-config-alloy/typescript",
    "prettier/@typescript-eslint",
    "prettier/react"
  ],
  plugins: ["prettier"],
  globals: {
    React: false,
    ReactDom: false
  },
  env: {
    browser: true,
    node: true
  },
  rules: {
    "prettier/prettier": "error",
    "@typescript-eslint/no-var-requires": "off",
    indent: ["error", 2, { SwitchCase: 1, flatTernaryExpressions: true }], // 一个缩进必须用两个空格替代
    "@typescript-eslint/indent": ["error", 2, { SwitchCase: 1, flatTernaryExpressions: true }],
    quotes: 'off'
  }
};

module.exports = {
  extends: [
    "eslint-config-alloy/react",
    "eslint-config-alloy/typescript",
    "prettier/@typescript-eslint",
    "prettier/react"
  ],
  plugins: ["prettier", "react-hooks"],
  globals: {
    React: false,
    ReactDom: false
  },
  env: {
    browser: true,
    node: true
  },
  rules: {
    "prettier/prettier": "off",
    indent: ["error", 2, { SwitchCase: 1, flatTernaryExpressions: true }], // 一个缩进必须用两个空格替代
    "implicit-arrow-linebreak": "off",
    "@typescript-eslint/indent": ["error", 2, { SwitchCase: 1, flatTernaryExpressions: true }],
    quotes: "off", // 引号，关闭报错
    "react-hooks/rules-of-hooks": "error", // 检查 Hook 的规则
    "react-hooks/exhaustive-deps": "off", // 检查 effect 的依赖
    "@typescript-eslint/member-ordering": "off" // 关闭类成员的排序顺序
  },
  settings: {
    react: {
      version: "detect" // Tells eslint-plugin-react to automatically detect the version of React to use
    },
    "import/resolver": {
      alias: {
        map: [["src", "./src"]]
      },
      extensions: [".ts", ".js", ".jsx", ".json"]
    }
  }
};

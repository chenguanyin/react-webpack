const presets = [
  [
    "@babel/preset-env", // ES语法分析包
    {
      useBuiltIns: "usage",
      corejs: 2
    }
  ],
  "@babel/preset-react", // 支持jsx语法
  "@babel/preset-typescript" // 支持ts语法
];
const plugins = [
  "@babel/plugin-transform-runtime", // babel编译时转换语法
  ["import", { libraryName: "antd", style: "css" }], // antd按需加载
  ["@babel/plugin-proposal-decorators", { legacy: true }], // 用于修饰符
  "@babel/plugin-proposal-class-properties", // 用于解析类的属性,类里面的箭头函数
  "@babel/plugin-syntax-dynamic-import", // 支持动态导入，按需加载
  // "react-hot-loader/babel" // react热加载
];
module.exports = { presets, plugins };

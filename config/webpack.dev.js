/* eslint-disable @typescript-eslint/no-var-requires */
const webpack = require("webpack");
const merge = require("webpack-merge");
const FriendlyErrorWebpackPlugin = require("friendly-errors-webpack-plugin");
const paths = require("./paths");
const webpackBase = require("./webpack.base");
const packageJSON = require(paths.appPackage);
const { proxy, name } = packageJSON;
const host = "localhost";
const port = "3001";

module.exports = merge(webpackBase, {
  devtool: "cheap-module-eval-source-map",
  // entry: ["react-hot-loader/patch"],
  output: {
    path: paths.appDist,
    filename: "[name].js",
    publicPath: "/"
  },

  plugins: [
    new webpack.NamedModulesPlugin(), // 热加载是返回更新的文件名，而不是id
    new webpack.HotModuleReplacementPlugin(), // 启动热加载
    new FriendlyErrorWebpackPlugin({
      // 运行成功, 显示的信息
      compilationSuccessInfo: {
        messages: [`You can now view ${name} in the browser.`, `Local: http://${host}:${port}`],
        notes: ["successful compilation"]
      },
      // 运行错误
      onErrors: function(severity, errors) {
        // 您可以收听插件转换和优先级的错误
        // 严重性可以是'错误'或'警告'
      },
      // 是否每次编译之间清除控制台
      // 默认为true
      clearConsole: true,
      // 添加格式化程序和变换器（见下文）
      additionalFormatters: [],
      additionalTransformers: []
    })
  ],
  devServer: {
    port,
    host,
    contentBase: paths.allBase,
    // host: "0.0.0.0",
    open: true,
    hot: true,
    clientLogLevel: "none",
    quiet: true, // 设置为true, webpack错误或警告控制台上都不可见
    overlay: {
      warnings: true,
      errors: true
    }, // 在页面上显示错误,交给插件
    proxy: typeof proxy === "object" ? proxy : {}
  }
});

/**
 * proxy 格式
  "proxy": [
    {
      "context": [],
      "target": "http://114.55.209.28:8104/",
      "changeOrigin": "true"
    }
  ]
 */

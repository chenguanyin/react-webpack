const paths = require("./paths");
const wwebpack = require("webpack");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  mode: "production",
  entry: {
    "reactlibrarys": ["react", "react-dom", "react-router-dom", "redux", "react-redux"]
  },
  output: {
    path: paths.appDll,
    filename: "[name].dll.js",
    library: "[name]"
  },
  plugins: [
    new CleanWebpackPlugin(),
    new wwebpack.DllPlugin({
      name: "[name]", // 暴露出的DLL函数名称，和output,library保持一致
      context: process.cwd(), //  文件中请求的上下文（默认值是webpack的上下文）,
      path: paths.getDllFilePath("[name]-manifset.json") // manifest.json文件的输出位置
    })
  ]
};

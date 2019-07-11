const webpack = require("webpack");
const merge = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const webpackBase = require("./webpack.base");
const paths = require("./paths");

module.exports = merge(webpackBase, {
  mode: "development",
  devtool: "cheap-module-eval-source-map",
  entry: ["react-hot-loader/patch"],
  output: {
    path: paths.appDist,
    filename: "[name].js",
    publicPath: "/"
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: paths.appPublicHtml
    }),
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    hot: true,
    contentBase: paths.appDist,
    host: "0.0.0.0",
    port: "3001"
  }
});

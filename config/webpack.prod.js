const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const uglifyjsWebpackPlugin = require("uglifyjs-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const merge = require("webpack-merge");
const workboxPlugin = require("workbox-webpack-plugin");
const webpackBase = require("./webpack.base");
const paths = require("./paths");
const { generateDllAssets, generateDllReferences } = require("./utils");

module.exports = merge(webpackBase, {
  mode: "production",
  output: {
    path: paths.appDist,
    filename: "[name][hash:8].js",
    publicPath: "./"
  },
  devtool: "cheap-module-source-map",
  optimization: {
    usedExports: true,
    splitChunks: {
      chunks: "all", // 所有的 chunks 代码公共的部分分离出来成为一个单独的文件
      maxInitialRequests: 5,
      cacheGroups: {
        // 公共代码打包分组配置
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: 1,
          name: "vendors"
        }
      }
    }
  },
  plugins: [
    new CleanWebpackPlugin(), // 清除掉dist文件夹将下面的文件
    // new BundleAnalyzerPlugin(), // 打包分析
    new uglifyjsWebpackPlugin({ parallel: true }), // 开启多线程打包
    new HtmlWebpackPlugin({
      inject: true,
      template: paths.appPublicHtml, // 使用的模板
      filename: "index.html", //
      cache: true,
      minify: {
        removeComments: true, // 是否删除注释
        collapseWhitespace: true, // 是否删除空白符
        removeAttributeQuotes: true, // 是否删除属性的引号
        minifyJS: true,
        minifyCss: true
      }
    }),
    ...generateDllReferences(),
    ...generateDllAssets(),
    new workboxPlugin.GenerateSW({
      // 开启PWA
      clientsClaim: true,
      skipWaiting: true,
      importWorkboxFrom: "local"
    })
  ]
});

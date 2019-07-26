const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const uglifyjsWebpackPlugin = require("uglifyjs-webpack-plugin");
const PurifyCSS = require("purifycss-webpack");
const merge = require("webpack-merge");
const workboxPlugin = require("workbox-webpack-plugin");
const glob = require("glob-all");
const webpackBase = require("./webpack.base");
const paths = require("./paths");
const { generateDllAssets, generateDllReferences } = require("./utils");

module.exports = merge(webpackBase, {
  output: {
    path: paths.appDist,
    filename: "[name][chunkhash:8].js",
    publicPath: "/"
  },
  devtool: "none" /* "cheap-module-source-map" */,
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
    },
    runtimeChunk: true // 提取chunk的映射关系
  },
  plugins: [
    new CleanWebpackPlugin(), // 清除掉dist文件夹将下面的文件
    // new BundleAnalyzerPlugin(), // 打包分析
    new PurifyCSS({
      // 消除无用的css
      paths: glob.sync([
        paths.resolve(paths.appSrc, "**/*.html"),
        paths.resolve(paths.appSrc, "**/*.js"),
        paths.resolve(paths.appSrc, "**/*.ts"),
        paths.resolve(paths.appSrc, "**/*.jsx"),
        paths.resolve(paths.appSrc, "**/*.tsx")
      ])
    }),
    new uglifyjsWebpackPlugin({ parallel: true }), // 开启多线程打包
    ...generateDllReferences(), // 替换manifests文件
    ...generateDllAssets(), // 加载dll资源g
    // 开启PWA
    new workboxPlugin.GenerateSW({
      cacheId: "webpack-pwa", // 设置前缀
      clientsClaim: true, // 强制等待中的 Service Worker 被激活
      skipWaiting: true, // Service Worker 被激活后使其立即获得页面控制权
      importWorkboxFrom: "local", // 使用本地的文件
      runtimeCaching: [
        // 配置路由请求缓存
        {
          urlPattern: /.*\.js/, // 匹配文件
          handler: "networkFirst" // 网络优先
        }
      ]
    })
  ]
});

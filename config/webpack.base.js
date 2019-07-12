const paths = require("./paths");
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HappyPack = require("happypack");
const os = require("os");
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });

const devMode = process.env.NODE_ENV === "development";
const cssFileName = "static/css/[name][contenthash:8].css";
console.log(devMode);
module.exports = {
  mode: devMode ? "development" : "production",
  entry: [paths.appIndex],
  module: {
    // strictExportPresence: true,
    rules: [
      {
        test: /\.(js|jsx)/, // test 可以提供一个正则表达式或者一个正则表达式的数组
        loader: require.resolve("source-map-loader"), // require.resolve返回解析路径的文件名，不加载该模块
        enforce: "pre",
        include: paths.appSrc
      },
      {
        oneOf: [
          {
            test: /\.(js|jsx)/,
            loader: "happypack/loader?id=js",
            include: paths.appSrc
          },
          {
            test: /\.(ts|tsx)/,
            loader: "happypack/loader?id=ts",
            include: paths.appSrc
          },
          {
            test: /\.(sa|sc|c)ss/,
            loader: [
              "css-hot-loader", // css热更新
              devMode
                ? require.resolve("style-loader")
                : MiniCssExtractPlugin.loader, // 在该版本，MiniCssExtractPlugin暂时不能和happypack thread-loader共同使用
              "happypack/loader?id=css"
            ]
          },
          {
            test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
            loader: require.resolve("url-loader"),
            options: {
              limit: 10000,
              name: "static/media/[name].[hash:8].[ext]"
            }
          },
          {
            test: /\.(eot|woff2|ttf|svg)/,
            loader: require.resolve("url-loader"),
            options: {
              limit: 5000,
              name: "static/font/[name][hash:2].[ext]"
            }
          },
          {
            loader: require.resolve("file-loader"),
            exclude: [/\.(js|jsx)$/, /\.html$/, /\.json$/],
            options: {
              name: "static/media/[name].[hash:8].[ext]"
            }
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
    alias: {
      src: paths.appSrc
    }
  },
  plugins: [
    // happypack多进程打包
    new HappyPack({
      //用id来标识 happypack处理那里类文件
      id: "js",
      //如何处理  用法和loader 的配置一样
      loaders: [{ loader: "babel-loader?cacheDirectory=true" }],
      //共享进程池threadPool: HappyThreadPool 代表共享进程池，即多个 HappyPack 实例都使用同一个共享进程池中的子进程去处理任务，以防止资源占用过多。
      threadPool: happyThreadPool,
      //允许 HappyPack 输出日志
      verbose: true
    }),
    new HappyPack({
      id: "ts",
      loaders: [{ loader: "ts-loader" }],
      threadPool: happyThreadPool,
      verbose: true
    }),
    new HappyPack({
      id: "css",
      threadPool: happyThreadPool,
      verbose: true,
      loaders: [
        // "css-hot-loader", // css热更新
        // devMode ? require.resolve("style-loader") : MiniCssExtractPlugin.loader,
        {
          loader: require.resolve("css-loader"),
          options: {
            importLoaders: 2,
            sourceMap: devMode ? true : false
          }
        },
        "postcss-loader",
        "sass-loader"
      ]
    }),
    new webpack.DefinePlugin({
      // 编译时配置的全局常量
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV)
    }),
    new MiniCssExtractPlugin({
      filename: devMode ? "[name].css" : cssFileName,
      chunkFilename: "[name].css"
    })
  ]
};

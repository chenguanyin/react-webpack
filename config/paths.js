const path = require("path");
const fs = require("fs");
const appDirectory = fs.realpathSync(process.cwd()); // realpathSync,返回已解析的路径名； process.cwd()，返回node当前的工作目录

const resolveApp = relativePath => path.resolve(appDirectory, relativePath);
const getDllFilePath = name => path.resolve(resolveApp("dll"), name);
module.exports = {
  getDllFilePath,
  resolve: path.resolve,
  appSrc: resolveApp("src"),
  appIndex: resolveApp("src/index.js"),
  appDist: resolveApp("dist"),
  appDll: resolveApp("dll"),
  appDistHtml: resolveApp("dist/index.html"),
  appPublicHtml: resolveApp("public/index.html")
};

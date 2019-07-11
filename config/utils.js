const webpack = require("webpack");
const glob = require("glob");
const AddAssetHtmlWebpackPlugin = require("add-asset-html-webpack-plugin");
const paths = require("./paths");
const generateDllReferences = () => {
  const manifests = glob.sync(paths.getDllFilePath("*.json"));
  console.log(manifests);
  return manifests.map(
    file => new webpack.DllReferencePlugin({ manifest: file })
  );
};
const generateDllAssets = () => {
  const files = glob.sync(paths.getDllFilePath("*.js"));
  console.log(files);
  return files.map(
    file =>
      new AddAssetHtmlWebpackPlugin({
        filepath: file,
        outputPath: "/dll",
        publicPath: "/dll"
      })
  );
};
module.exports = {
  generateDllReferences,
  generateDllAssets
};

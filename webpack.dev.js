const { merge } = require("webpack-merge");
const CommonWebpackConfiguration = require("./webpack.config");

const path = require("path");

module.exports = merge(CommonWebpackConfiguration, {
  mode: "development",
  output: {
    path: path.resolve(__dirname, "build"),
    publicPath: "/",
    filename: "js/[name].[contenthash].bundle.js",
  },
  devServer: {
    historyApiFallback: true,
    static: {
      directory: path.resolve(__dirname, "build"),
    },
    client: {
      overlay: false,
    },
    open: false,
    compress: true,
    hot: true,
    port: 3000,
    devMiddleware: {
      writeToDisk: true,
    },
  },
});

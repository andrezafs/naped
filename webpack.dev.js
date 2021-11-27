const { merge } = require("webpack-merge");
const CommonWebpackConfiguration = require("./webpack.config");

const path = require("path");

module.exports = merge(CommonWebpackConfiguration, {
  mode: "development",
  target: "web",
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "js/[name].[contenthash].bundle.js",
  },
  devServer: {
    historyApiFallback: true,
    static: {
      directory: path.resolve(__dirname, "build"),
      publicPath: "/",
      watch: true,
    },
    client: {
      overlay: false,
    },
    open: true,
    compress: true,
    hot: false,
    port: 3000,
  },
});

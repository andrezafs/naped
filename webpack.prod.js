const { merge } = require("webpack-merge");
const CommonWebpackConfiguration = require("./webpack.config");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

const path = require("path");

module.exports = merge(CommonWebpackConfiguration, {
  mode: "production",
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "js/[name].[contenthash].bundle.js",
  },
  optimization: {
    minimize: true,
    minimizer: [new CssMinimizerPlugin()],
    runtimeChunk: {
      name: "runtime",
    },
  },
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
});

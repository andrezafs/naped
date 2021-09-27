const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const path = require("path");
const fs = require("fs");

const templatesPath = path.resolve(__dirname, "src", "pages");

const templatesFiles = fs.readdirSync(templatesPath);

const htmlPluginEntries = templatesFiles.map(
  (template) =>
    new HtmlWebpackPlugin({
      inject: true,
      hash: false,
      filename: template,
      template: path.resolve(templatesPath, template),
    })
);

module.exports = {
  entry: path.resolve(__dirname, "src", "pages", "index.html"),
  devtool: "inline-source-map",
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "[name].[contenthash].bundle.js",
    publicPath: "/",
  },
  module: {
    rules: [
      { test: /\.(html)$/, use: ["html-loader"] },
      { test: /\.(js)$/, exclude: /node_modules/, use: ["babel-loader"] },
      {
        test: /\.(scss)$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              sourceMap: true,
              importLoaders: 3,
              url: false,
              modules: {
                localIdentName: "[name][local]_[contenthash:base64:5]",
                auto: true,
              },
            },
          },
          { loader: "postcss-loader", options: { sourceMap: true } },
          {
            loader: "resolve-url-loader",
            options: { sourceMap: true, removeCR: true },
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: true,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "src", "assets", "images"),
          to: path.resolve(__dirname, "build", "images"),
        },
        {
          from: path.resolve(__dirname, "src", "assets", "fonts"),
          to: path.resolve(__dirname, "build", "fonts"),
        },
      ],
    }),
    new NodePolyfillPlugin(),
    new MiniCssExtractPlugin({
      filename: "styles/[name].[contenthash].css",
      chunkFilename: "styles/[id].[contenthash].css",
    }),
  ].concat(htmlPluginEntries),
};

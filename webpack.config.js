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
  entry: {
    app: path.resolve(__dirname, "src", "js", "app.js"),
  },
  devtool: "inline-source-map",
  module: {
    rules: [
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
      {
        test: /\.(jpg|jpeg|png|ico|svg)$/,
        loader: "file-loader",
        options: {
          outputPath: "images",
        },
      }
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "src", "images"),
          to: path.resolve(__dirname, "build", "images"),
          globOptions: { ignore: ["*.DS_Store", "*.gitkeep"] },
        },
        {
          from: path.resolve(__dirname, "src", "fonts"),
          to: path.resolve(__dirname, "build", "fonts"),
          globOptions: { ignore: ["*.DS_Store", "*.gitkeep"] },
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

module.exports = {
  plugins: [
    require("postcss-unprefixed"),
    require("postcss-preset-env")({ browsers: "last 2 versions" }),
    require("autoprefixer")({
      remove: false,
    }),
  ],
};

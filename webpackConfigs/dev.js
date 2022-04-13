const path = require("path");
module.exports = {
  mode: "development",
  devtool: "cheap-module-eval-source-map",
  devServer: {
    contentBase: path.resolve(__dirname, "../example/"),
    open: true,
    overlay: true,
  },
  entry: {
    bundle: path.resolve(__dirname, "../example/index.js"),
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "../example/"),
  },
};

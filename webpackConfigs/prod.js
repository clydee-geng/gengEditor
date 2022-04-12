const TerserPlugin = require("terser-webpack-plugin");
const path = require("path");

module.exports = {
  mode: "none",
  entry: {
    gengEditor: "./src/index.tsx",
    "gengEditor.min": "./src/index.tsx",
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "../build"),
    library: "gengEditor",
    libraryExport: "default",
    libraryTarget: "umd",
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        test: /\.min.js$/,
      }),
    ],
  },
};

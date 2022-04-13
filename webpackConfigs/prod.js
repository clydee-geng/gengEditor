const TerserPlugin = require("terser-webpack-plugin");
const path = require("path");

module.exports = {
  mode: "none",
  entry: {
    gengEditor: "./src/index.ts",
    "gengEditor.min": "./src/index.ts",
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "../dist"),
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
  // 这些模块通过注册在运行环境中的全局变量访问，不用被重复打包进输出的代码里
  externals: {
    react: "react",
    "react-dom": "react-dom",
    "draft-js": "draft-js",
    "draft-convert": "draft-convert",
    "@simonwep/pickr": "@simonwep/pickr",
    "antd": "antd",
    "classnames":"classnames",
  },
};

const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
  entry: "./src/index.tsx",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "../build"),
  },
  module: {
    rules: [
      {
        oneOf: [
          {
            test: /\.(js|mjs|jsx|ts|tsx)$/,
            exclude: /node_modules/,
            use: [
              {
                loader: "babel-loader",
                options: {
                  presets: [
                    [
                      "@babel/preset-env",
                      {
                        useBuiltIns: "usage",
                        corejs: 2,
                        targets: {
                          chrome: "67",
                        },
                      },
                    ],
                    "@babel/preset-react",
                  ],
                  plugins: [
                    // 引入样式为 css
                    // style为true 则默认引入less
                    ["import", { libraryName: "antd", style: "css" }],
                  ],
                },
              },
              "ts-loader",
            ],
          },
          {
            test: /\.css$/,
            use: [
              "style-loader",
              "css-loader",
              {
                loader: "postcss-loader",
                options: {
                  postcssOptions: {
                    plugins: [require("autoprefixer")],
                  },
                },
              },
            ],
          },
          {
            test: /\.less$/,
            use: [
              "style-loader",
              {
                loader: "css-loader",
                options: {
                  modules: {
                    localIdentName: "geng-editor-[hash]-[local]",
                  },
                },
              },
              {
                loader: "postcss-loader",
                options: {
                  postcssOptions: {
                    plugins: [require("autoprefixer")],
                  },
                },
              },
              {
                loader: "less-loader",
              },
            ],
          },
          {
            test: /\.svg/,
            use: ["url-loader"],
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
  ],
  resolve: {
    extensions: [".js", ".jsx", ".d.ts", ".ts", ".tsx"],
    mainFiles: ["index"],
    alias: {
      "@alias": path.resolve(__dirname, "../src/alias"),
    },
  },
};

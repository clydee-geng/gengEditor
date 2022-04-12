const { merge } = require("webpack-merge");
const common = require("./webpackConfigs/common.js");
const dev = require("./webpackConfigs/dev.js");
const prod = require("./webpackConfigs/prod.js");

module.exports = (env) => {
  if (env && env.prod) {
    return merge(common, prod);
  } else {
    return merge(common, dev);
  }
};

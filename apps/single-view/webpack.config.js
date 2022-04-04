const {
  ImportMapWebpackPlugin,
} = require("@hackney/webpack-import-map-plugin");
const webpack = require("webpack");
const singleSpaDefaults = require("webpack-config-single-spa-react-ts");
const { merge } = require("webpack-merge");
const dotenv = require('dotenv');

module.exports = (webpackConfigEnv, argv) => {
  const defaultConfig = singleSpaDefaults({
    orgName: "mfe",
    projectName: "single-view",
    webpackConfigEnv,
    argv,
  });

    const env = dotenv.config().parsed;
  
  // reduce it to a nice object, the same as before
  const envKeys = Object.keys(env).reduce((prev, next) => {
    prev[`process.env.${next}`] = JSON.stringify(env[next]);
    return prev;
  }, {});

  return merge(defaultConfig, {
    entry: {
      "single-view": defaultConfig.entry,
    },
    output: {
      filename: "[name].[contenthash].js",
    },
    externals: ["react-router-dom", "formik", "yup"],
    plugins: [
      new webpack.EnvironmentPlugin({
        APP_ENV: process.env.APP_ENV || "development",
      }),
      new webpack.DefinePlugin(envKeys),
      new ImportMapWebpackPlugin({
        namespace: "@mfe",
        basePath: process.env.APP_CDN || "http://localhost:8005",
      }),
    ],
  });
};

const {
  ImportMapWebpackPlugin,
} = require("@hackney/webpack-import-map-plugin");
const webpack = require("webpack");
const singleSpaDefaults = require("webpack-config-single-spa-react-ts");
const { merge } = require("webpack-merge");

module.exports = (webpackConfigEnv, argv) => {
  const defaultConfig = singleSpaDefaults({
    orgName: "mtfh",
    projectName: "app",
    webpackConfigEnv,
    argv,
  });

  return merge(defaultConfig, {
    entry: {
      app: defaultConfig.entry,
    },
    output: {
      filename: "[name].[contenthash].js",
    },
    externals: ["react-router-dom", "formik", "yup"],
    plugins: [
      new webpack.EnvironmentPlugin({
        APP_ENV: process.env.APP_ENV || "development",
      }),
      new ImportMapWebpackPlugin({
        namespace: "@mtfh",
        basePath: process.env.APP_CDN || "http://localhost:8005",
      }),
    ],
  });
};

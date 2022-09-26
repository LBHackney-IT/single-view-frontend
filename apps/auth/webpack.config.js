const { ImportMapWebpackPlugin } = require("@hackney/webpack-import-map-plugin");
const singleSpaDefaults = require("webpack-config-single-spa-react-ts");
const { merge } = require("webpack-merge");
const webpack = require("webpack");
const dotenv = require("dotenv").config();

module.exports = (webpackConfigEnv, argv) => {
  const defaultConfig = singleSpaDefaults({
    orgName: "mfe",
    projectName: "auth",
    webpackConfigEnv,
    argv,
  });
  return merge(defaultConfig, {
    entry: {
      auth: defaultConfig.entry,
    },
    output: {
      filename: "[name].[contenthash].js",
    },
    module: {
      rules: [
        {
          test: /\.svg$/,
          use: "file-loader",
        },
        {
          test: /\.scss$/i,
          use: ["style-loader", "css-loader", "sass-loader"],
        },
      ],
    },
    externals: ["react-router-dom"],
    plugins: [
        new webpack.EnvironmentPlugin({
            AUTH_DOMAIN: process.env.AUTH_DOMAIN || dotenv.AUTH_DOMAIN,
        }),
      new ImportMapWebpackPlugin({
        namespace: "@mfe",
        basePath: process.env.APP_CDN || "http://localhost:8080",
      }),
    ],
  });
};

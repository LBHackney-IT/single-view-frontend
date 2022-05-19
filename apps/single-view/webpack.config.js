const {
  ImportMapWebpackPlugin,
} = require("@hackney/webpack-import-map-plugin");
const webpack = require("webpack");
const singleSpaDefaults = require("webpack-config-single-spa-react-ts");
const { merge } = require("webpack-merge");
const dotenv = require("dotenv").config();

module.exports = (webpackConfigEnv, argv) => {
  const defaultConfig = singleSpaDefaults({
    orgName: "mfe",
    projectName: "single-view",
    webpackConfigEnv,
    argv,
  });

  return merge(defaultConfig, {
    entry: {
      "single-view": defaultConfig.entry,
    },
    output: {
      filename: "[name].[contenthash].js",
    },
    module: {
      rules: [
        {
          test: /\.scss$/i,
          use: ["style-loader", "css-loader", "sass-loader"],
        },
      ],
    },
    externals: ["react-router-dom", "formik", "yup"],
    plugins: [
      new webpack.EnvironmentPlugin({
        APP_ENV: process.env.APP_ENV || "development",
        PERSON_API_V1: process.env.PERSON_API_V1 || dotenv.PERSON_API_V1,
        SV_API_V1: process.env.SV_API_V1 || dotenv.SV_API_V1,
        AES_KEY: process.env.AES_KEY || dotenv.AES_KEY,
        AES_IV: process.env.AES_IV || dotenv.AES_IV,
      }),
      new ImportMapWebpackPlugin({
        namespace: "@mfe",
        basePath: process.env.APP_CDN || "http://localhost:8005",
      }),
      new webpack.ProvidePlugin({
        Buffer: ["buffer", "Buffer"],
      }),
    ],
    resolve: {
      fallback: {
        crypto: require.resolve("crypto-browserify"),
        stream: require.resolve("stream-browserify"),
      },
    },
  });
};

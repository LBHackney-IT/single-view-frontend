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
        SV_API_V1: process.env.SV_API_V1 || dotenv.SV_API_V1,
        MMH_URL: process.env.MMH_URL || dotenv.MMH_URL,
        MA_URL: process.env.MA_URL || dotenv.MA_URL,
        JIGSAW_URL: process.env.JIGSAW_URL || dotenv.JIGSAW_URL,
        RSA_PUBLIC_KEY: process.env.RSA_PUBLIC_KEY || dotenv.RSA_PUBLIC_KEY,
        SHARED_PLAN_URL: process.env.SHARED_PLAN_URL || dotenv.SHARED_PLAN_URL,
        DISPLAY_SHARED_PLAN: process.env.DISPLAY_SHARED_PLAN || dotenv.DISPLAY_SHARED_PLAN
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
        stream: require.resolve("stream-browserify"),
      },
    },
  });
};

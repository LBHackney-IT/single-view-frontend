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
        'process.env': {
          APP_ENV: process.env.APP_ENV || "development",
          HOUSING_SEARCH_API_V1: process.env.HOUSING_SEARCH_API_V1 || dotenv.HOUSING_SEARCH_API_V1,
          PERSON_API_V1: process.env.PERSON_API_V1 || dotenv.PERSON_API_V1,
          NOTES_API_V1: process.env.NOTES_API_V1 || dotenv.NOTES_API_V1
        }
      }),     
      new ImportMapWebpackPlugin({
        namespace: "@mfe",
        basePath: process.env.APP_CDN || "http://localhost:8005",
      }),
    ],
  });
};

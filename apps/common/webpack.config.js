const path = require("path");
const { merge } = require("webpack-merge");
const singleSpaDefaults = require("webpack-config-single-spa-react-ts");
const webpack = require("webpack");
const dotenv = require("dotenv").config();
const { ImportMapWebpackPlugin } = require("@hackney/webpack-import-map-plugin");

module.exports = (webpackConfigEnv, argv) => {
  const defaultConfig = singleSpaDefaults({
    orgName: "mtfh",
    projectName: "common",
    webpackConfigEnv,
    argv,
  });

  const apiPath = path.join(__dirname, "lib", "api");

  return merge(defaultConfig, {
    entry: {
      common: path.join(__dirname, "lib", "mtfh-common.tsx"),
      "common/lib/auth": path.join(__dirname, "lib", "auth"),
      "common/lib/http": path.join(__dirname, "lib", "http"),
      "common/lib/config": path.join(__dirname, "lib", "config"),
      "common/lib/configuration": path.join(__dirname, "lib", "configuration"),
      "common/lib/components": path.join(__dirname, "lib", "components"),
      "common/lib/hooks": path.join(__dirname, "lib", "hooks"),
      "common/lib/utils": path.join(__dirname, "lib", "utils"),
      "common/lib/context": path.join(__dirname, "lib", "context"),
      "common/lib/api/person/v1": path.join(apiPath, "person", "v1"),
      "common/lib/api/person/v2": path.join(apiPath, "person", "v2"),
      "common/lib/api/contact-details/v1": path.join(apiPath, "contact-details", "v1"),
      "common/lib/api/contact-details/v2": path.join(apiPath, "contact-details", "v2"),
      "common/lib/api/tenure/v1": path.join(apiPath, "tenure", "v1"),
      "common/lib/api/comments/v1": path.join(apiPath, "comments", "v1"),
      "common/lib/api/comments/v2": path.join(apiPath, "comments", "v2"),
      "common/lib/api/asset/v1": path.join(apiPath, "asset", "v1"),
      "common/lib/api/reference-data/v1": path.join(apiPath, "reference-data", "v1"),
      "common/lib/api/address/v1": path.join(apiPath, "address", "v1"),
      "common/lib/api/process/v1": path.join(apiPath, "process", "v1"),
      "common/lib/api/equality-information/v1": path.join(
        apiPath,
        "equality-information",
        "v1",
      ),
    },
    output: {
      filename: "[name].[contenthash].js",
    },
    resolve: {
      alias: {
        "@mtfh/common/lib": path.join(__dirname, "lib"),
      },
    },
    module: {
      rules: [
        {
          test: /\.scss$/i,
          use: ["style-loader", "css-loader", "sass-loader"],
        },
      ],
    },
    externals: ["react", "react-dom", "react-router-dom", "formik", "date-fns"],
    plugins: [
      new webpack.EnvironmentPlugin({
        APP_ENV: process.env.APP_ENV || "test",
        AUTH_ALLOWED_GROUPS: dotenv.AUTH_ALLOWED_GROUPS || "",
        AUTH_DOMAIN: dotenv.AUTHDOMAIN || "",
        COOKIE_DOMAIN: dotenv.COOKIE_DOMAIN || "",
        AUTH_TOKEN_NAME: dotenv.AUTH_TOKEN_NAME || "",
        CONFIGURATION_API_URL_V1: dotenv.CONFIGURATION_API_URL_V1 || "",
        CONTACT_DETAILS_API_URL_V1: dotenv.CONTACT_DETAILS_API_URL_V1 || "",
        CONTACT_DETAILS_API_URL_V2: dotenv.CONTACT_DETAILS_API_URL_V2 || "",
        PERSON_API_URL_V1: dotenv.PERSON_API_URL_V1 || "",
        PERSON_API_URL_V2: dotenv.PERSON_API_URL_V2 || "",
        NOTES_API_URL_V1: dotenv.NOTES_API_URL_V1 || "",
        NOTES_API_URL_V2: dotenv.NOTES_API_URL_V2 || "",
        TENURE_API_URL_V1: dotenv.TENURE_API_URL_V1 || "",
        PROPERTY_API_URL_V1: dotenv.PROPERTY_API_URL_V1 || "",
        REFERENCE_DATA_API_URL_V1: dotenv.REFERENCE_DATA_API_URL_V1 || "",
        ADDRESS_API_URL_V1: dotenv.ADDRESS_API_URL_V1 || "",
        EQUALITY_INFORMATION_API_URL_V1: dotenv.EQUALITY_INFORMATION_API_URL_V1 || "",
        REPAIRS_HUB_APP_URL: dotenv.REPAIRS_HUB_APP_URL || "",
        REPAIRS_HUB_API_URL: dotenv.REPAIRS_HUB_API_URL || "",
        PROCESS_API_URL_V1: dotenv.PROCESS_API_URL_V1 || "",
      }),
      new ImportMapWebpackPlugin({
        namespace: "@mtfh",
        basePath: process.env.APP_CDN || "http://localhost:8040",
      }),
    ],
  });
};

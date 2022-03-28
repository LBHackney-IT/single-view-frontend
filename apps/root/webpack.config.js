const { merge } = require("webpack-merge");
const singleSpaDefaults = require("webpack-config-single-spa-ts");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = (webpackConfigEnv, argv) => {
  const orgName = "mfe";
  const defaultConfig = singleSpaDefaults({
    orgName,
    projectName: "root-config",
    webpackConfigEnv,
    argv,
    disableHtmlGeneration: true,
  });

  return merge(defaultConfig, {
    // modify the webpack config however you'd like to by adding to this object
    entry: {
      "root-config": defaultConfig.entry,
      formik: "formik/dist/formik.esm.js",
      "date-fns": "./src/modules/date-fns",
    },
    output: {
      filename: "[name].[contenthash].js",
    },
    externals: ["react", "react-dom"],
    plugins: [
      new MiniCssExtractPlugin({
        filename: "[name].[contenthash].css",
      }),
      new HtmlWebpackPlugin({
        inject: false,
        template: "src/index.ejs",
        templateParameters: {
          isLocal: webpackConfigEnv && webpackConfigEnv.isLocal,
          orgName,
          COMMON_APP_URL: process.env.COMMON_APP_URL || "//localhost:8040",
          HEADER_APP_URL: process.env.HEADER_APP_URL || "//localhost:8091",
          AUTH_APP_URL: process.env.AUTH_APP_URL || "//localhost:8080",
          SINGLE_VIEW_APP_URL: process.env.SINGLE_VIEW_APP_URL || "//localhost:8005",
        },
      }),
    ],
    module: {
      rules: [
        {
          test: /\.s[ac]ss$/i,
          use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
        },
      ],
    },
  });
};

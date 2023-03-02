const { defineConfig } = require("@vue/cli-service");
const appName = "dev/vue3";
const { getPublicPath, getPort } = require("../util");
const port = getPort(appName);
const publicPath = getPublicPath(appName);
module.exports = defineConfig({
  transpileDependencies: true,
  chainWebpack: (config) => {
    config.optimization.delete("splitChunks");
  },
  configureWebpack: () => {
    return {
      entry: "./src/main.ts",
      output: {
        filename: "[name].[hash].js",
        chunkFilename: "[name].[hash].js",
        libraryTarget: "umd",
        globalObject: "window",
      },
    };
  },
  module: {
    rules: [
      {
        test: /\.less$/i,
        use: [
          { loader: "style-loader" },
          { loader: "css-loader" },
          {
            loader: "sass-loader",
            options: {
              modifyVars: {
                "@ant-prefix": "child-cli", // 定制自己的前缀
              },
              javascriptEnabled: true,
            },
          },
        ],
      },
    ],
  },
  publicPath,
  devServer: {
    hot: true,
    host: "0.0.0.0",
    port,
    historyApiFallback: true,
    allowedHosts: ["all"],
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  },
});

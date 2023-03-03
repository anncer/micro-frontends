const path = require("path");
const { defineConfig } = require("@vue/cli-service");
const appName = "dev/vue3";
const { getPublicPath, getPort } = require("../util");
const port = getPort(appName);
const publicPath = getPublicPath(appName);

function resolve(dir) {
  return path.join(__dirname, dir);
}

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
      devtool: process.env.NODE_ENV === "development" ? "source-map" : "",
      resolve: {
        alias: {
          "@": resolve("src"),
        },
      },
    };
  },
  // plugin: [
  //   // 保证错误堆栈信息及 sourcemap 行列信息正确
  //   new webpack.BannerPlugin({
  //     banner: 'Micro front-end',
  //   }),
  // ],
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
    proxy: {
      "/api": {
        target: "http://11.11.141.59:30002/",
        changeOrigin: true,
      },
    },
  },
});
// resolve: {
//   extensions: ['.js', '.vue', '.json'],
//     alias: {
//     '@': resolve('src'),
//       'api': path.resolve(__dirname, '../src/api'),
//         'views': path.resolve(__dirname, '../src/views'),
//           'utils': path.resolve(__dirname, '../src/utils'),
//             'store': path.resolve(__dirname, '../src/store'),
//               'components': path.resolve(__dirname, '../src/components')
//   }
// },
// const path = require('path')
// function resolve(dir) {
//   return path.join(__dirname, '..', dir)
// }

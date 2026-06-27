const { merge } = require("webpack-merge");

const common = require("./webpack.common");
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); // Extract CSS into separate files. main.js to main.css
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin"); //Minify CSS. in one line
const TerserPlugin = require("terser-webpack-plugin"); //before: function calculateTotal() { return price * quantity;} | after:  function a(){return b*c}
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const path = require("path");

module.exports = merge(common, {
  mode: "production",
  output: {
    path: path.resolve(__dirname, "../dist"),
    filename: "js/[name].[contenthash].js",
    clean: true,
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: "css/[name].[contenthash].css",
    }),
    // new BundleAnalyzerPlugin(),
  ],

  optimization: {
    minimizer: [new TerserPlugin(), new CssMinimizerPlugin()],
    splitChunks: {
      chunks: "all", //Separate vendor libraries. [react, redux, react-router will go vendor.js file]
    },
    runtimeChunk: "single", //Separate webpack runtime code. Improves browser caching.
  },
});

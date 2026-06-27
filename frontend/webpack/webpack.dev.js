const { merge } = require('webpack-merge');

const common = require('./webpack.common');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'eval-source-map', //source map : easy to dubug file
  devServer: {
    port: 3000,
    open: true,
    hot: true, //hot reload: browser updates instantly when a file change: No refresh needed.
    historyApiFallback: true, //without this after refreshing 404 Not Found will get
  },
});
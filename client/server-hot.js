/* eslint no-var: 0, no-console: 0 */

const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');

const webpackConfig = require('./webpack.hot.config');

const hotPort = 3500;

const compiler = webpack(webpackConfig);

const devServer = new WebpackDevServer(compiler, {
  contentBase: 'http://lvh.me:' + hotPort,
  publicPath: webpackConfig.output.publicPath,
  hot: true,
  inline: true,
  historyApiFallback: true,
  quiet: false,
  noInfo: false,
  lazy: false,
  stats: {
    colors: true,
    hash: false,
    version: false,
    chunks: false,
    children: false,
  },
});

devServer.listen(hotPort, '127.0.0.1', err => {
  if (err) console.error(err);
  console.log(
    '=> 🔥  Webpack development server is running on port ' + hotPort
  );
});

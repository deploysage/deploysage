const path = require('path');
const webpack = require('webpack');

const config = require('./webpack.base.config');

const hotPort = 3500;

config.entry.app.push(
  'webpack-dev-server/client?http://127.0.0.1:' + hotPort,
  'webpack/hot/only-dev-server'
);

config.output = {
  filename: 'app-bundle.js',
  path: path.join(__dirname, 'public'),
  publicPath: `http://127.0.0.1:${hotPort}/`,
};

config.module.loaders.push(
  {
    test: /\.elm$/,
    exclude: [/elm-stuff/, /node_modules/],
    loader: 'elm-hot!elm-webpack?warn=true',
  }
);

config.plugins.push(
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoErrorsPlugin()
);

config.devtool = 'eval-source-map';

console.log('Webpack dev build for Rails'); // eslint-disable-line no-console

module.exports = config;

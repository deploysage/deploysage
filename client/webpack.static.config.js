const webpack = require('webpack');

const config = require('./webpack.base.config');

config.output = {
  filename: 'app-bundle.js',
  path: '../app/assets/webpack',
};

config.module.loaders.push(
  {
    test: /\.elm$/,
    exclude: [/elm-stuff/, /node_modules/],
    loader: 'elm-webpack?warn=true',
  }
);

config.plugins.push(
  new webpack.optimize.DedupePlugin()
);

console.log('Webpack production build for Rails'); // eslint-disable-line no-console

module.exports = config;

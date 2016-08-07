// Common client-side webpack configuration used by webpack.hot.config and webpack.rails.config.

const webpack = require('webpack');
const path = require('path');

module.exports = {

  // the project dir
  context: __dirname,
  entry: {

    // This will contain the app entry points defined by webpack.hot.config and webpack.rails.config
    app: [
      './app/index.js',
    ],
  },
  resolve: {
    extensions: ['', '.js'],
    root: [path.join(__dirname, 'app')],
    fallback: [path.join(__dirname, 'node_modules')],
  },

  // same issue, for loaders like babel
  resolveLoader: {
    fallback: [path.join(__dirname, 'node_modules')],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development'),
      },
    }),
  ],
  module: {
    loaders: [
    ],
  },
};

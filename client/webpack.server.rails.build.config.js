// Common webpack configuration for server bundle

const webpack = require('webpack');
const path = require('path');

const devBuild = process.env.NODE_ENV !== 'production';
const nodeEnv = devBuild ? 'development' : 'production';

module.exports = {

  // the project dir
  context: __dirname,
  entry: [
    'react',
    'react-dom/server',
    './app/bundles/DeploySage/startup/serverGlobals',
  ],
  output: {
    filename: 'server-bundle.js',
    path: '../app/assets/webpack',
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
    alias: {
      libs: path.join(process.cwd(), 'app', 'libs'),
    },
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(nodeEnv),
      },
    }),
  ],
  module: {
    loaders: [
      { test: /\.jsx?$/, loader: 'babel-loader', exclude: /node_modules/ },
      {
        test: /\.css$/,
        loaders: [
          'css/locals?modules&importLoaders=0&localIdentName=[name]__[local]__[hash:base64:5]',
        ],
      },
      {
        test: /\.scss$/,
        loaders: [
          'css/locals?modules&importLoaders=2&localIdentName=[name]__[local]__[hash:base64:5]',
          'sass',
          'sass-resources',
        ],
      },

      // React is necessary for the client rendering:
      { test: require.resolve('react'), loader: 'expose?React' },
      { test: require.resolve('react-dom/server'), loader: 'expose?ReactDOMServer' },
    ],
  },

  sassResources: ['./app/assets/styles/app-variables.scss'],

};

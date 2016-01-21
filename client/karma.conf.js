const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = function (config) {
  config.set({
    basePath: '.',
    browsers: [ 'Chrome' ], //run in Chrome
    singleRun: true, //just run once by default
    frameworks: [ 'mocha' ], //use the mocha test framework
    files: [
      'tests.webpack.js' //just load this file
      //'webpack.server.rails.build.config.js' //just load this file
      //'webpack.client.rails.build.config.js' //just load this file
    ],
    preprocessors: {
      'tests.webpack.js': [
      //'webpack.server.rails.build.config.js': [
      //'webpack.client.rails.build.config.js': [
        'webpack',
        'sourcemap'
      ] //preprocess with webpack and our sourcemap loader
    },
    reporters: [ 'dots' ], //report results in this format
    webpack: { //kind of a copy of your webpack config
      //entry: { vendor: ['bootstrap-loader']}},
      devtool: 'inline-source-map', //just do in line source maps instead of the default
      module: {
        loaders: [
          //{ test: /\.js$/, loader: 'babel-loader' }
          {
            test: /\.jsx?$/,
            loader: 'babel',
            exclude: /node_modules/,
            query: {
              plugins: [
                [
                  'react-transform',
                  {
                    transforms: [
                      {
                        transform: 'react-transform-hmr',
                        imports: ['react'],
                        locals: ['module'],
                      },
                    ],
                  },
                ],
              ],
            },
          },
          {
            test: /\.css$/,
            loaders: [
              'style',
              'css?modules&importLoaders=1&localIdentName=[name]__[local]__[hash:base64:5]',
              'postcss',
            ],
          },
          {
            test: /\.scss$/,
            loaders: [
              'style',
              'css?modules&importLoaders=3&localIdentName=[name]__[local]__[hash:base64:5]',
              'postcss',
              'sass',
              'sass-resources',
            ],
          }
        ]
      }
    },
    plugins: [
      'karma-chrome-launcher',
      'karma-mocha',
      'karma-webpack',
      'karma-sourcemap-loader',
      new ExtractTextPlugin('[name]-bundle.css', { allChunks: true }),
      new webpack.optimize.DedupePlugin()
    ],
    webpackServer: {
      noInfo: true //please don't spam the console when running in karma!
    }
  });
};

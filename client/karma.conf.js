const autoprefixer = require('autoprefixer');
const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = function (config) {
  config.set({
    basePath: '.',
    browsers: [ 'Chrome' ], //run in Chrome
    //browsers: [ 'PhantomJS' ],
    //browsers: ['jsdom'],
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
      entry: {
        vendor: [
          'bootstrap-loader',
          'babel-polyfill',
          'es5-shim/es5-shim',
          'es5-shim/es5-sham',
          'jquery',
          'react',
          'react-dom'
        ],
      },
      devtool: 'inline-source-map', //just do in line source maps instead of the default
      context: __dirname,
      module: {
        // From: https://github.com/webpack/webpack/issues/138#issuecomment-160638284
        noParse: /node_modules\/(json-schema\/lib\/validate\.js|any-other-module-to-noParse)/,
        loaders: [
          { test: /\.(woff2?|svg)$/, loader: 'url?limit=10000' },
          { test: /\.(ttf|eot)$/, loader: 'file' },
          { test: /\.(jpe?g|png|gif|svg|ico)$/, loader: 'url?limit=10000' },

          // React is necessary for the client rendering
          //{ test: require.resolve('react'), loader: 'expose?React' },
          { test: require.resolve('react'), loader: 'imports?shim=es5-shim/es5-shim&sham=es5-shim/es5-sham' },
          { test: require.resolve('react-dom'), loader: 'expose?ReactDOM' },

          { test: require.resolve('jquery'), loader: 'expose?jQuery' },
          { test: require.resolve('jquery'), loader: 'expose?$' },

          // serve jQuery for Bootstrap 3 scripts:
          { test: /bootstrap-sass\/assets\/javascripts\//, loader: 'imports?jQuery=jquery' },
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
          { test: /\.json$/, loader: "json-loader" },
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
          },
        ]
      },
      node: {
        child_process: "empty",
        fs: "empty",
        net: "empty",
        tls: "empty"
      },

      resolve: {
        extensions: ['', '.js', '.jsx'],
        alias: {
          libs: path.join(process.cwd(), 'app', 'libs'),

          // testing new npm react on rails...
          react: path.resolve('./node_modules/react'),
          'react-dom': path.resolve('./node_modules/react-dom'),
        },

        // testing new npm react on rails...
        root: [path.join(__dirname, 'app')],
        fallback: [path.join(__dirname, 'node_modules')],
      },

      // Place here all postCSS plugins here, so postcss-loader will apply them
      postcss: [autoprefixer],

      // Place here all SASS files with variables, mixins etc.
      // And sass-resources-loader will load them in every CSS Module (SASS file) for you
      // (so don't need to @import them explicitly)
      // https://github.com/shakacode/sass-resources-loader
      sassResources: ['./app/assets/styles/app-variables.scss'],
    },
    plugins: [
      //new webpack.IgnorePlugin(/jsdom$/),
      // From: https://github.com/webpack/webpack/issues/1887#issuecomment-172344694
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': '"development"',
        'global': {}, // bizarre lodash(?) webpack workaround
        'global.GENTLY': false // superagent client fix
      }),
      'karma-chrome-launcher',
      'karma-mocha',
      'karma-webpack',
      'karma-sourcemap-loader',
      'karma-phantomjs-launcher',
      'karma-jsdom-launcher',
      'karma-mocha-reporter',
      new ExtractTextPlugin('[name]-bundle.css', { allChunks: true }),
      new webpack.optimize.DedupePlugin(),
    ],
    webpackServer: {
      noInfo: true //please don't spam the console when running in karma!
    }
  });
};

// Common client-side webpack configuration used by webpack.hot.config and webpack.rails.config.

const webpack = require('webpack');
const path = require('path');
const autoprefixer = require('autoprefixer');

const devBuild = process.env.NODE_ENV !== 'production';
const nodeEnv = devBuild ? 'development' : 'production';

module.exports = {

  // the project dir
  context: __dirname,
  entry: {

    // See use of 'vendor' in the CommonsChunkPlugin inclusion below.
    vendor: [
      'babel-polyfill',
      'jquery',
      'react',
      'react-dom',
    ],

    // This will contain the app entry points defined by webpack.hot.config and webpack.rails.config
    app: [
      './app/bundles/DeploySage/startup/clientRegistration',
    ],
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

  // same issue, for loaders like babel
  resolveLoader: {
    fallback: [path.join(__dirname, 'node_modules')],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(nodeEnv),
      },
    }),

    // https://webpack.github.io/docs/list-of-plugins.html#2-explicit-vendor-chunk
    new webpack.optimize.CommonsChunkPlugin({

      // This name 'vendor' ties into the entry definition
      name: 'vendor',

      // We don't want the default vendor.js name
      filename: 'vendor-bundle.js',

      // Passing Infinity just creates the commons chunk, but moves no modules into it.
      // In other words, we only put what's in the vendor entry definition in vendor-bundle.js
      minChunks: Infinity,
    }),
  ],
  module: {
    loaders: [
      { test: /\.(woff2?|svg)$/, loader: 'url?limit=10000' },
      { test: /\.(ttf|eot)$/, loader: 'file' },
      { test: /\.(jpe?g|png|gif|svg|ico)$/, loader: 'url?limit=10000' },

      // React is necessary for the client rendering
      { test: require.resolve('react'), loader: 'expose?React' },
      { test: require.resolve('react-dom'), loader: 'expose?ReactDOM' },

      { test: require.resolve('jquery'), loader: 'expose?jQuery' },
      { test: require.resolve('jquery'), loader: 'expose?$' },

      // serve jQuery for Bootstrap 3 scripts:
      { test: /bootstrap-sass\/assets\/javascripts\//, loader: 'imports?jQuery=jquery' },
    ],
  },

  // Place here all postCSS plugins here, so postcss-loader will apply them
  postcss: [autoprefixer],

  // Place here all SASS files with variables, mixins etc.
  // And sass-resources-loader will load them in every CSS Module (SASS file) for you
  // (so don't need to @import them explicitly)
  // https://github.com/shakacode/sass-resources-loader
  sassResources: ['./app/assets/styles/app-variables.scss'],

};

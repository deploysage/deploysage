// Karma configuration
'use strict';
process.env.NODE_ENV = 'test';

var spawnSync     = require('child_process').spawnSync;
var fs            = require('graceful-fs');
var path          = require('path');
var tmp           = require('tmp');
var glob          = require('glob');
var _             = require('underscore');
var webpack       = require('webpack');

module.exports = function(config, options) {
  // Run tests in test environment
  // So that hot reloading doesnt blow up
  process.env['NODE_ENV'] = 'test';

  options = options || {};

  // base path that will be used to resolve all patterns (eg. files, exclude)
  options.basePath = '';

  // list of files / patterns to load in the browser
  options.files = [
    //{pattern: 'spec/javascripts/fixtures/**/*.json', served: true, included: false, watched: false},
    'node_modules/es5-shim/es5-shim.js',
    'SpecSuite.js',
    //writeSpecIndex(options.files),
  ];

  // list of files to exclude
  options.exclude = [];

  // frameworks to use
  // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
  options.frameworks = ['jasmine'];

  // preprocess matching files before serving them to the browser
  // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
  options.preprocessors = {
    'SpecSuite.js': ['sourcemap', 'webpack'],
  };

  options.webpack = {
    devtool: 'eval',
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
    module: {
      loaders: require('./webpack.client.rails.build.config.js').module.loaders,
    },
    node: {
      constants: "empty",
      child_process: "empty",
      fs: "empty",
      net: "empty",
      tls: "empty"
    },
  };

  options.webpackMiddleware = {
    noInfo: true
  };

  // you can define custom flags
  //options.customLaunchers = {
  //  'PhantomJS_custom': {
  //    base: 'PhantomJS',
  //    options: {
  //      settings: {},
  //    },
  //    flags: ['--load-images=false'],
  //    debug: false
  //  }
  //};

  //options.phantomjsLauncher = {
  //  // Have phantomjs exit if a ResourceError is encountered (useful if karma exits without killing phantom)
  //  exitOnResourceError: true
  //};

  // overridable config
  _.defaults(options, {
    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: [
      'jasmine-diff',
      'progress'
    ],

    // web server port
    port: 9876,

    colors: true,

    // level of logging
    // possible values: 'OFF' || 'ERROR' || 'WARN' || 'INFO' || 'DEBUG'
    //logLevel: 'INFO',
    logLevel: 'DEBUG',

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: [
      'PhantomJS',
      //'PhantomJS_custom',
      // 'Chrome',
    ],

    plugins: [
      require('karma-webpack'),
      require('karma-sourcemap-loader'),
      require('karma-jasmine'),
      require('karma-phantomjs-launcher'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-diff-reporter')
    ],

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    browserNoActivityTimeout: 60000,

    autoWatchBatchDelay: 500,
  });

  config.set(options);
};


function writeSpecIndex(files) {
  var contents;

  if (files && files.length) {
    // require each specified file individually
    contents = files.map((file) => `require('${path.resolve(__dirname, file)}');`).join('\n');
  } else {
    // OR dynamically require all modules ending in "_spec/Spec"
    contents = `
      require('./app/vendor/polyfills/es5');
      var specs;

      specs = require.context("${path.resolve(__dirname, 'app/')}", true, /(_s|S)pec.jsx$/);
      specs.keys().forEach(specs);
    `;
  }

  var tmpFile = tmp.tmpNameSync({
    template: path.resolve(__dirname, 'tmp/karma_index_XXXXXXXX_spec.jsx')
  });

  fs.writeFileSync(tmpFile, contents);
  return tmpFile;
}

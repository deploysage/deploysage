// Karma configuration
'use strict';
process.env.NODE_ENV = 'test';

var spawnSync     = require('child_process').spawnSync;
var fs            = require('fs');
var path          = require('path');
var tmp           = require('tmp');
var glob          = require('glob');
var _             = require('underscore');
var webpack       = require('webpack');
var webpackConfig = require('./webpack.client.rails.build.config.js');

module.exports = function(config, options) {
  options = options || {};

  // base path that will be used to resolve all patterns (eg. files, exclude)
  options.basePath = '';

  // list of files / patterns to load in the browser
  options.files = [
    {pattern: 'spec/javascripts/fixtures/**/*.json', served: true, included: false, watched: false},
    writeSpecIndex(options.files),
  ];

  // list of files to exclude
  options.exclude = [];

  // frameworks to use
  // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
  options.frameworks = ['jasmine'];

  // preprocess matching files before serving them to the browser
  // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
  options.preprocessors = {
    '/**/*Spec.js': ['webpack']
  };

  options.webpackMiddleware = {
    noInfo: true
  };

  options.webpack = webpackConfig,

  // you can define custom flags
  options.customLaunchers = {
    'PhantomJS_custom': {
      base: 'PhantomJS',
      options: {
        settings: {},
      },
      flags: ['--load-images=false'],
      debug: false
    }
  };

  options.phantomjsLauncher = {
    // Have phantomjs exit if a ResourceError is encountered (useful if karma exits without killing phantom)
    exitOnResourceError: true
  };

  // overridable config
  _.defaults(options, {
    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: [
      'progress'
    ],

    // web server port
    port: 9876,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // level of logging
    // possible values: 'OFF' || 'ERROR' || 'WARN' || 'INFO' || 'DEBUG'
    logLevel: 'INFO',

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: [
      'PhantomJS_custom'
      // 'Chrome',
    ],

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    browserNoActivityTimeout: 60000
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

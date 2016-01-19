var configModule = require('../../../karma.conf.js');

function ConfigData() {
  this.config = {};
};

// This mimics the api in karma/lib/config.js
ConfigData.prototype.set = function set(newConfig) {
  var config = this.config;
  Object.keys(newConfig).forEach(function(key) {
    config[key] = newConfig[key];
  });
};

var KarmaUtils = {
  config: function(options) {
    var configData = new ConfigData();
    configModule(configData, options)
    return configData.config;
  }
};

module.exports = KarmaUtils;

const camelizeFormatter = require('./camelizeFormatter');
const normalizeFormatter = require('./normalizeFormatter');

function formatJson(json) {
  const camelizedJson = camelizeFormatter.camelizeJson(json);
  return normalizeFormatter.normalizeJson(camelizedJson);
}

module.exports = {
  formatJson,
};

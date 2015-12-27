const humps = require('humps');

function formatJson(json) {
  const camelizedJson = humps.camelizeKeys(json);
  return camelizedJson;
}

module.exports = {
  formatJson,
};

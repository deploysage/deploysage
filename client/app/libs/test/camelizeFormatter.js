const humps = require('humps');

function camelizeJson(json) {
  const camelizedJson = humps.camelizeKeys(json);
  return camelizedJson;
}

module.exports = {
  camelizeJson,
};

const normalizr = require('normalizr');

const Schema = normalizr.Schema;
const normalize = normalizr.normalize;
const arrayOf = normalizr.arrayOf;

function normalizeJson(json) {
  const org = new Schema('orgs');
  const orgs = arrayOf(org);
  const repo = new Schema('repos');
  const repos = arrayOf(repo);
  const pageJson = {
    orgs,
    repos,
  };
  return normalize(json, pageJson);
}

module.exports = {
  normalizeJson,
};

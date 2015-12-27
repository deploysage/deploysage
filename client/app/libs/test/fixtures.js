const Immutable = require('immutable');
const humps = require('humps');
const YAML = require('yamljs');
const fs = require('fs');
const _ = require('lodash');

function readFixtureFile(fixtureType) {
  return fs.readFileSync(`../spec/fixtures/${fixtureType}.yml`, 'utf8');
}

function loadFixtures() {
  const fixtureObjects = YAML.parse(readFixtureFile('orgs'));
  const orgs = _.values(fixtureObjects);
  const fixtures = {};
  fixtures.orgs = orgs;
  return fixtures;
}

function fixtureInitialState() {
  const fixtures = loadFixtures();
  const orgsById = { [fixtures.orgs[0].id]: { name: fixtures.orgs[0].name } };

  // jscs:disable requireCamelCaseOrUpperCaseIdentifiers
  return {
    orgs_by_id: orgsById,
    orgs: [fixtures.orgs[0].id.toString()],
  };
}

function fixtureImmutableState() {
  const camelizedFixtureInitialState = humps.camelizeKeys(fixtureInitialState());
  return Immutable.fromJS(camelizedFixtureInitialState);
}

module.exports = {
  fixtureInitialState,
  fixtureImmutableState,
};

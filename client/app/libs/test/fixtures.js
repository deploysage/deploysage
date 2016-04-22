const Immutable = require('immutable');
const YAML = require('yamljs');
const fs = require('fs');
const _ = require('lodash');
const normalizeFormatter = require('./normalizeFormatter');
const camelizeFormatter = require('./camelizeFormatter');

function readFixtureFile(fixtureType) {
  return fs.readFileSync(`../spec/fixtures/${fixtureType}.yml`, 'utf8');
}

function loadFixturesForType(fixtureType) {
  const fixtureObjects = YAML.parse(readFixtureFile(fixtureType));

  const fixtureEntries = _.values(fixtureObjects);
  _.each(fixtureEntries, (fixtureEntry) => {
    _.each(fixtureEntry, (fixtureValue, key) => {
      if (key === 'id' || _.endsWith(key, '_id')) {
        fixtureEntry[key] = fixtureEntry[key].toString();
      }
    });
  });
  return fixtureEntries;
}

function loadFixtures() {
  const fixtures = {};
  fixtures.orgs = loadFixturesForType('orgs');
  fixtures.repos = loadFixturesForType('repos');
  return fixtures;
}

function fixtureInitialState() {
  const fixtures = loadFixtures();

  const initialState = camelizeFormatter.camelizeJson(
    normalizeFormatter.normalizeJson(fixtures)
  );

  // jscs:disable requireCamelCaseOrUpperCaseIdentifiers
  initialState.clientState = {
    origin: '127.0.0.1:3000',
    uiState: process.env.DS_UI_STATE || 'authenticated',
  };

  return initialState;
}

function fixtureImmutableState() {
  return Immutable.fromJS(fixtureInitialState());
}

module.exports = {
  fixtureInitialState,
  fixtureImmutableState,
};

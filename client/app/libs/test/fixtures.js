const Immutable = require('immutable');
const jsonFormatter = require('../formatters/jsonFormatter');
const YAML = require('yamljs');
const fs = require('fs');
const _ = require('lodash');

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

  // jscs:disable requireCamelCaseOrUpperCaseIdentifiers
  return {
    orgs: fixtures.orgs,
    repos: fixtures.repos,
  };
}

function fixtureImmutableState() {
  const formattedFixtureInitialState = jsonFormatter.formatJson(fixtureInitialState());
  return Immutable.fromJS(formattedFixtureInitialState);
}

module.exports = {
  fixtureInitialState,
  fixtureImmutableState,
};

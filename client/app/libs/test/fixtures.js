const Immutable = require('immutable');
const jsonFormatter = require('../formatters/jsonFormatter');
const YAML = require('yamljs');
const fs = require('fs');
const _ = require('lodash');

function readFixtureFile(fixtureType) {
  return fs.readFileSync(`../spec/fixtures/${fixtureType}.yml`, 'utf8');
}

function loadFixtures() {
  const fixtureObjects = YAML.parse(readFixtureFile('orgs'));
  const orgs = _.values(fixtureObjects);
  _.each(orgs, (org) => {
    org.id = org.id.toString();
  });
  const fixtures = {};
  fixtures.orgs = orgs;
  return fixtures;
}

function fixtureInitialState() {
  const fixtures = loadFixtures();

  // jscs:disable requireCamelCaseOrUpperCaseIdentifiers
  return {
    orgs: fixtures.orgs,
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

import { expect } from 'libs/test/testHelper';

import fixtures from './fixtures';

describe('fixtures', () => {
  it('.fixtureInitialState reads fixtures and stringifies IDs', () => {
    const state = fixtures.fixtureInitialState();
    const repo = state.entities.repos['1'];

    expect(repo.id).to.equal('1');

    // jscs:disable requireCamelCaseOrUpperCaseIdentifiers
    expect(repo.orgId).to.equal('1');
  });

  it('.fixtureImmutableState returns a camelized normalized Immutable', () => {
    const state = fixtures.fixtureImmutableState();
    expect(state.getIn(['entities', 'repos', '1', 'id'])).to.equal('1');
    expect(state.getIn(['entities', 'repos', '1', 'orgId'])).to.equal('1');
    expect(state.getIn(['entities', 'repos', '1', 'githubIdentifier'])).to.equal(47444606);
  });
});

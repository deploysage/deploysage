import { expect } from './testHelper';

import fixtures from './fixtures';

describe('fixtures', () => {
  it('.fixtureInitialState reads fixtures and stringifies IDs', () => {
    const state = fixtures.fixtureInitialState();
    const repo = state.repos[0];
    expect(repo.id).to.equal('1');

    // jscs:disable requireCamelCaseOrUpperCaseIdentifiers
    expect(repo.org_id).to.equal('1');
  });

  it('.fixtureImmutableState returns a camelized normalized Immutable', () => {
    const state = fixtures.fixtureImmutableState();
    expect(state.getIn(['entities', 'repos', '1', 'id'])).to.equal('1');
    expect(state.getIn(['entities', 'repos', '1', 'orgId'])).to.equal('1');
    expect(state.getIn(['entities', 'repos', '1', 'githubIdentifier'])).to.equal(47444606);
  });
});

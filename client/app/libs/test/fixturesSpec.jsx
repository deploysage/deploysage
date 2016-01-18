import { expect } from 'libs/test/testHelper';

import fixtures from './fixtures';

describe('fixtures', () => {
  it('.fixtureInitialState reads fixtures and stringifies IDs', () => {
    const state = fixtures.fixtureInitialState();
    const repo = state.repos[0];
    expect(repo.id).toEqual('1');

    // jscs:disable requireCamelCaseOrUpperCaseIdentifiers
    expect(repo.org_id).toEqual('1');
  });

  it('.fixtureImmutableState returns a camelized normalized Immutable', () => {
    const state = fixtures.fixtureImmutableState();
    expect(state.getIn(['entities', 'repos', '1', 'id'])).toEqual('1');
    expect(state.getIn(['entities', 'repos', '1', 'orgId'])).toEqual('1');
    expect(state.getIn(['entities', 'repos', '1', 'githubIdentifier'])).toEqual(47444606);
  });
});

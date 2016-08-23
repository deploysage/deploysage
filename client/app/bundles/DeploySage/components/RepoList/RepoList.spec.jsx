import { expect, wrapperFuncs } from 'libs/test/testHelper';
import { fixtureImmutableState } from 'libs/test/fixtures';

import RepoList from './RepoList';
import RepoListItem from './../RepoListItem/RepoListItem';

describe('RepoList', () => {
  const actions = { };
  const $$deploySageStore = fixtureImmutableState();
  const { shallowWrapper } = wrapperFuncs(RepoList, { actions, $$deploySageStore });

  it('renders a list of RepoListItems', () => {
    const list = shallowWrapper().find(RepoListItem);
    expect(list.length).to.equal(1);
  });
});

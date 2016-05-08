import { expect, wrapperFuncs } from 'libs/test/testHelper';
import { fixtureImmutableState } from 'libs/test/fixtures';

import RepoList from './RepoList';
import ColumnHeader from './../ColumnHeader/ColumnHeader';
import RepoListItem from './../RepoListItem/RepoListItem';

describe('RepoList', () => {
  const actions = { };
  const $$deploySageStore = fixtureImmutableState();
  const { shallowWrapper } = wrapperFuncs(RepoList, { actions, $$deploySageStore });

  it('renders a ColumnHeader', () => {
    const list = shallowWrapper().find(ColumnHeader);
    expect(list.length).to.equal(1);
  });

  it('renders a list of RepoListItems', () => {
    const list = shallowWrapper().find(RepoListItem);

    // TODO: change to assert against actual number of fixture objects
    expect(list.length).to.equal(1);
  });
});

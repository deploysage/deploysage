import { expect, wrapperFuncs } from 'libs/test/testHelper';
import { fixtureImmutableState } from 'libs/test/fixtures';

import MainPane from './MainPane';
import RepoForm from './../RepoForm/RepoForm';

describe('MainPane', () => {
  const actions = { };
  let $$deploySageStore;
  let shallowWrapper;

  describe('for RepoForm', () => {
    beforeEach(() => {
      $$deploySageStore = fixtureImmutableState().setIn(
        ['clientState', 'uiState'],
        'unauthenticated'
      );
      shallowWrapper = wrapperFuncs(MainPane, { actions, $$deploySageStore }).shallowWrapper;
    });

    it('renders a RepoForm', () => {
      const list = shallowWrapper().find(RepoForm).first();
      expect(list.length).to.equal(1);
      expect(list.first()).to.have.prop('$$deploySageStore', $$deploySageStore);
    });
  });
});

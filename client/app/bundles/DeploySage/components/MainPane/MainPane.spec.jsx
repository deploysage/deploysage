import { expect, wrapperFuncs } from 'libs/test/testHelper';
import { fixtureImmutableState } from 'libs/test/fixtures';

import MainPane from './MainPane';
import RepoWidget from './../RepoWidget/RepoWidget';

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

    it('renders a RepoWidget', () => {
      const list = shallowWrapper().find(RepoWidget).first();
      expect(list.length).to.equal(1);
      expect(list.first()).to.have.prop('$$deploySageStore', $$deploySageStore);
    });
  });
});

import { expect, wrapperFuncs } from 'libs/test/testHelper';
import { spy } from 'sinon';
import { fixtureImmutableState } from 'libs/test/fixtures';

import RepoWidget from './RepoWidget';

describe('RepoWidget', () => {
  const actions = {};
  const $$deploySageStore = fixtureImmutableState();
  const repoId = '1';
  const mockUpdate = spy();
  const cable = {
    channel: {
      update: mockUpdate,
    },
  };
  const { shallowWrapper } = wrapperFuncs(RepoWidget, { actions, $$deploySageStore, cable });

  it('renders url for specified repo', () => {
    const actual = (shallowWrapper().find('.spec-RepoWidget-url'));
    const expected = 'https://github.com/deploysage/fixture-repo-1.git';
    expect(actual).to.have.text(expected);
  });

  it('updates channel on Change', () => {
    shallowWrapper().find('#repo-url').simulate('change', { target: { value: 'new' } });
    expect(mockUpdate).to.have.been.calledWith('repo', repoId, { url: 'new' });
  });
});

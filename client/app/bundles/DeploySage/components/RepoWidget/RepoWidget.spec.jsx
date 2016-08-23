import { expect, wrapperFuncs } from 'libs/test/testHelper';
import { fixtureImmutableState } from 'libs/test/fixtures';

import RepoWidget from './RepoWidget';

describe('RepoWidget', () => {
  const actions = { };
  const $$deploySageStore = fixtureImmutableState();
  const repoId = '1';
  const { shallowWrapper } = wrapperFuncs(RepoWidget, { actions, $$deploySageStore, repoId });

  it('renders url for specified repo', () => {
    const actual = (shallowWrapper().find('.spec-RepoWidget-url'));
    const expected = 'https://github.com/deploysage/fixture-repo-1.git';
    expect(actual).to.have.text(expected);
  });
});

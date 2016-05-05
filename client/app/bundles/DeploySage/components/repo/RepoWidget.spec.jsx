import { React, expect, TestUtils } from 'libs/test/testHelper';
import { fixtureImmutableState } from 'libs/test/fixtures';

import RepoWidget from './RepoWidget';

const {
  renderIntoDocument,
  findRenderedDOMComponentWithClass,
  } = TestUtils;

const actions = {
};

describe('RepoWidget', () => {
  const $$deploySageStore = fixtureImmutableState();

  it('receives repo url from props', () => {
    const component = renderIntoDocument(
      <RepoWidget
        actions={actions}
        $$deploySageStore={$$deploySageStore}
      />
    );
    const repoName = findRenderedDOMComponentWithClass(component, 'js-repo-url');
    expect(repoName.textContent).to.equal('https://github.com/deploysage/fixture-repo-1.git');
  });
});

//import { React, expect } from '../../../../libs/test/testHelper';
import { React, expect, TestUtils } from '../../../../libs/test/testHelper';
import { fixtureImmutableState } from '../../../../libs/test/fixtures';

import RepoWidget from './RepoWidget.jsx';

const {
  renderIntoDocument,
  findRenderedDOMComponentWithClass,
  } = TestUtils;

const actions = {
  updateUrl: () => {
  },
};

describe('RepoWidget', () => {
  const $$deploySageStore = fixtureImmutableState();

  it('receives org name and repo url from props', () => {
    const component = renderIntoDocument(
      <RepoWidget
        actions={actions}
        $$deploySageStore={$$deploySageStore}
      />
    );
    const orgName = findRenderedDOMComponentWithClass(component, 'js-org-name');
    expect(orgName.textContent).to.equal('Organization: Fixture Organization 1');

    const repoName = findRenderedDOMComponentWithClass(component, 'js-repo-url');
    expect(repoName.textContent).to.equal('Repo URL: https://github.com/deploysage/fixture-repo-1.git');
  });
});

import { React, expect, TestUtils } from 'libs/test/testHelper';
import { fixtureImmutableState } from 'libs/test/fixtures';

import OrgWidget from './OrgWidget';

const {
  renderIntoDocument,
  findRenderedDOMComponentWithClass,
  } = TestUtils;

const actions = {
  updateName: () => {
  },
};

describe('OrgWidget', () => {
  const $$deploySageStore = fixtureImmutableState();

  it('receives name from props', () => {
    const component = renderIntoDocument(
      <OrgWidget
        actions={actions}
        $$deploySageStore={$$deploySageStore}
      />
    );
    const orgName = findRenderedDOMComponentWithClass(component, 'js-org-name');
    expect(orgName.textContent).to.equal('Organization is named Fixture Organization 1');
  });
});

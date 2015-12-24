import { React, expect, TestUtils } from 'libs/testHelper';
import { fixtureState } from 'libs/fixtures';

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
  const $$deploySageStore = fixtureState();

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

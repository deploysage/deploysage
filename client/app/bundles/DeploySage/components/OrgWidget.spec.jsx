import { React, expect, TestUtils } from 'libs/testHelper';
import Immutable from 'immutable';

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
  const $$deploySageStore = Immutable.fromJS({
    orgsById: { 1: { name: 'disorganization' } },
    orgs: ['1'],
  });

  it('receives name from props', () => {
    const component = renderIntoDocument(
      <OrgWidget
        actions={actions}
        $$deploySageStore={$$deploySageStore}
      />
    );
    const orgName = findRenderedDOMComponentWithClass(component, 'js-org-name');
    expect(orgName.textContent).to.equal('Organization is named disorganization');
  });
});

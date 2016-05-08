import { React, expect, TestUtils, wrapperFuncs } from 'libs/test/testHelper';
import { fixtureImmutableState } from 'libs/test/fixtures';

import Page from './Page';
import RepoWidget from './../RepoWidget/RepoWidget';

describe('Page', () => {
  const actions = { };
  const $$deploySageStore = fixtureImmutableState();
  const { shallowWrapper, staticWrapper } = wrapperFuncs(Page, { actions, $$deploySageStore });

  describe('with static render', () => {
    it('receives org name from props', () => {
      const actual = staticWrapper().find('span.org-name').first();
      const expected = 'Organization: Fixture Organization 1';
      expect(actual).to.have.text(expected);
    });
  });

  describe('with shallow render', () => {
    it('receives org name from props', () => {
      const actual = shallowWrapper().find('span.org-name');
      const expected = 'Organization: Fixture Organization 1';
      expect(actual).to.have.text(expected);
    });

    it('renders list of RepoWidgets', () => {
      const list = shallowWrapper().find(RepoWidget).first();
      expect(list.length).to.equal(1);
      expect(list.first()).to.have.prop('$$deploySageStore', $$deploySageStore);
    });
  });

  describe('with full render', () => {
    const {
      renderIntoDocument,
      findRenderedDOMComponentWithClass,
      scryRenderedComponentsWithType,
      } = TestUtils;
    const component = renderIntoDocument(
      <Page
        actions={actions}
        $$deploySageStore={$$deploySageStore}
      />
    );

    it('receives org name from props', () => {
      const orgName = findRenderedDOMComponentWithClass(component, 'org-name');
      expect(orgName.textContent).to.equal('Organization: Fixture Organization 1');
    });

    it('renders list of RepoWidgets', () => {
      const list = scryRenderedComponentsWithType(component, RepoWidget);
      expect(list.length).to.equal(1);

      expect(list[0].props.actions).to.equal(actions);
      expect(list[0].props.$$deploySageStore).to.equal($$deploySageStore);
    });
  });
});

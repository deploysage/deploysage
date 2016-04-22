import { React, expect, TestUtils } from 'libs/test/testHelper';
import { fixtureImmutableState } from 'libs/test/fixtures';
import Page from '../../components/page/Page';
import UnauthenticatedPage from '../../components/unauthenticatedPage/UnauthenticatedPage';

import UiStateMachine from './UiStateMachine';

const {
  renderIntoDocument,
  scryRenderedComponentsWithType,
  findRenderedDOMComponentWithClass,
  } = TestUtils;

const actions = {};

describe('UiStateMachine', () => {
  let $$deploySageStore;

  describe('with unauthenticated clientState', () => {
    beforeEach(() => {
      $$deploySageStore = fixtureImmutableState().setIn(
        ['clientState', 'uiState'],
        'unauthenticated'
      );
    });

    it('is not tested (need to mock sessionStorage) TODO: write tests for this', () => {
      // const component = renderIntoDocument(
      //   <UiStateMachine $$deploySageStore={$$deploySageStore} actions={actions}/>
      // );
      //
      // const list = scryRenderedComponentsWithType(component, UnauthenticatedPage);
      // expect(list.length).to.equal(1);
      //
      // expect(list[0].props.$$deploySageStore).to.equal($$deploySageStore);
    });
  });

  describe('with authenticated clientState', () => {
    beforeEach(() => {
      $$deploySageStore = fixtureImmutableState().setIn(
        ['clientState', 'uiState'],
        'authenticated'
      );
    });

    it('renders', () => {
      const component = renderIntoDocument(
        <UiStateMachine $$deploySageStore={$$deploySageStore} actions={actions}/>
      );

      const list = scryRenderedComponentsWithType(component, Page);
      expect(list.length).to.equal(1);

      expect(list[0].props.$$deploySageStore).to.equal($$deploySageStore);
    });
  });

  describe('with invalid clientState', () => {
    beforeEach(() => {
      $$deploySageStore = fixtureImmutableState().setIn(
        ['clientState', 'uiState'],
        'invalid'
      );
    });

    it('renders', () => {
      const component = renderIntoDocument(
        <UiStateMachine $$deploySageStore={$$deploySageStore} actions={actions}/>
      );

      expect(scryRenderedComponentsWithType(component, Page).length).to.equal(0);
      expect(scryRenderedComponentsWithType(component, UnauthenticatedPage).length).to.equal(0);
      const error = findRenderedDOMComponentWithClass(component, 'error');
      expect(error.textContent).to.equal("Invalid uiState: 'invalid'");
    });
  });
});

const React = require('react');
const { findRenderedComponentWithType } = require('react-addons-test-utils');
const { renderForTest } = require('../../../../libs/spec/spec_helpers');
const { fixtureImmutableState } = require('../../../../libs/test/fixtures');

describe('Page', function() {
  let $$deploySageStore, actions;

  beforeEach(function() {
    $$deploySageStore = fixtureImmutableState();
    actions = {};
  });

  function render() {
    let defaults = {$$deploySageStore, actions};

    return renderForTest(<Page {...defaults} />);
  }

  describe('dummy', function() {
    it('jasmine works', function() {
      expect(true).toBeTruthy();
    });

    it('renders', () => {
      let subject = render();

      expect(list.length).to.equal(1);

      expect(list[0].props.actions).to.equal(actions);
      expect(list[0].props.$$deploySageStore).to.equal($$deploySageStore);
    });
  });
});

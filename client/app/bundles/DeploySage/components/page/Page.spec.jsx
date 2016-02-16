import { React, expect, TestUtils } from 'libs/test/testHelper';
import { fixtureImmutableState } from 'libs/test/fixtures';

import Page from './Page';
import RepoWidget from './../repo/RepoWidget';

const {
  renderIntoDocument,
  scryRenderedComponentsWithType,
  } = TestUtils;

const actions = {};

describe('Page', () => {
  const $$deploySageStore = fixtureImmutableState();
  const renderer = TestUtils.createRenderer();

  it('renders', () => {
    const component = renderIntoDocument(
      <Page
        actions={actions}
        $$deploySageStore={$$deploySageStore}
      />
    );

    const list = scryRenderedComponentsWithType(component, RepoWidget);
    expect(list.length).to.equal(1);

    expect(list[0].props.actions).to.equal(actions);
    expect(list[0].props.$$deploySageStore).to.equal($$deploySageStore);
  });

  it('renders with shallow rendering', () => {
    renderer.render(
      <Page
        actions={actions}
        $$deploySageStore={$$deploySageStore}
      />
    );

    const result = renderer.getRenderOutput();

    expect(result.type).to.equal('div');

    // TODO: doesn't work!
    //expect(result.className).to.equal('page');

    // TODO: can't assert on actual children as shown in shallow render examples
    //expect(result.props.children).to.equal([]);
  });
});

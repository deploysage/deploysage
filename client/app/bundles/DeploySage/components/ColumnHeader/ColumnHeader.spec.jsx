import { expect, wrapperFuncs } from 'libs/test/testHelper';
import { fixtureImmutableState } from 'libs/test/fixtures';

import ColumnHeader from './ColumnHeader';

describe('ColumnHeader', () => {
  const actions = { };
  const $$deploySageStore = fixtureImmutableState();
  const headerText = 'header text';
  const { shallowWrapper } = wrapperFuncs(ColumnHeader, { actions, $$deploySageStore, headerText });

  it('renders header text`', () => {
    const actual = shallowWrapper().find('.spec-ColumnHeader-headerText');
    expect(actual).to.have.text(headerText);
  });
});

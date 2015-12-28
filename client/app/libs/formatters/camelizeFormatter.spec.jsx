import { expect } from 'libs/test/testHelper';

import camelizeFormatter from './camelizeFormatter';

describe('camelizeFormatter', () => {
  it('camelizes', () => {
    // jscs:disable requireCamelCaseOrUpperCaseIdentifiers
    expect(camelizeFormatter.camelizeJson({ foo_bar: 1 })).to.deep.equal({ fooBar: 1 });
  });
});

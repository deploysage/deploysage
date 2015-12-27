import { expect } from 'libs/test/testHelper';

import jsonFormatter from './jsonFormatter';

describe('jsonFormatter', () => {
  it('normalizes and camelizes orgs', () => {
    // jscs:disable requireCamelCaseOrUpperCaseIdentifiers
    const unformatted = {
      orgs: [
        {
          id: '1',
          name: 'foo',
          foo_bar: 'foo bar',
          number: 42,
        },
      ],
    };
    const expected = {
      result: {
        orgs: ['1'],
      },
      entities: {
        orgs: {
          1: { id: '1', name: 'foo', fooBar: 'foo bar', number: 42 },
        },
      },
    };
    const actual = jsonFormatter.formatJson(unformatted);
    expect(actual).to.deep.equal(expected);
  });
});

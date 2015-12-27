import { expect } from 'libs/test/testHelper';

import normalizeFormatter from './normalizeFormatter';

describe('normalizeFormatter', () => {
  it('normalizes orgs', () => {
    const unformatted = {
      orgs: [
        {
          id: '1',
          name: 'foo',
        },
      ],
    };
    const expected = {
      result: {
        orgs: ['1'],
      },
      entities: {
        orgs: {
          1: { id: '1', name: 'foo' },
        },
      },
    };
    const actual = normalizeFormatter.normalizeJson(unformatted);
    expect(actual).to.deep.equal(expected);
  });
});

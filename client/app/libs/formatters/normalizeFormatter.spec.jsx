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
      repos: [
        {
          id: '2',
          githubIdentifier: '314159',
          url: 'https://github.com/u/r.git',
        },
      ],
    };
    const expected = {
      result: {
        orgs: ['1'],
        repos: ['2'],
      },
      entities: {
        orgs: {
          1: { id: '1', name: 'foo' },
        },
        repos: {
          2: { id: '2', githubIdentifier: '314159', url: 'https://github.com/u/r.git' },
        },
      },
    };
    const actual = normalizeFormatter.normalizeJson(unformatted);
    expect(actual).to.deep.equal(expected);
  });
});

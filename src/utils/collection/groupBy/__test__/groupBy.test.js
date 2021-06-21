import groupBy from '../groupBy';

describe('groupBy', () => {
  test('should transform keys by iteratee', () => {
    expect(groupBy([6.1, 4.2, 6.3], Math.floor)).toEqual({
      '4': [4.2],
      '6': [6.1, 6.3],
    });
  });
});

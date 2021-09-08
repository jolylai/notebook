import stringToPath from '../stringToPath';

describe('stringToPath', () => {
  test('should ', () => {
    expect(stringToPath('a[0].b.c')).toEqual(['a', '0', 'b', 'c']);
  });
});

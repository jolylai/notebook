import ListCache from '../demos/ListCache';

describe('ListCache', () => {
  const cache = new ListCache([
    ['a', 1],
    ['b', 2],
  ]);

  test('should get value by key', () => {
    expect(cache.get('a')).toBe(1);
    expect(cache.get('b')).toBe(2);
  });

  test('should set value', () => {
    cache.set('c', 3);

    expect(cache.get('c')).toBe(3);
  });

  test('should set value chained', () => {
    cache.set('d', 4).set('e', 5);

    expect(cache.get('d')).toBe(4);
    expect(cache.get('e')).toBe(5);
  });
});

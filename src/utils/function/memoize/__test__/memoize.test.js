import memoize from '../memoize';

describe('memoize', () => {
  test('should memoize results based on the first argument given', () => {
    const memoized = memoize((a, b) => a + b);

    expect(memoized(1, 2)).toBe(3);
  });

  test('should support resolver', () => {
    const func = (a, b) => a + b;
    const memoized = memoize(func, func);

    expect(memoized(1, 2)).toBe(3);
  });

  test('should use this binding of function for resolver', () => {
    const func = function(a, b, c) {
      return a + this.b + this.c;
    };

    const memoized = memoize(func, func);
    const object = { memoized, b: 2, c: 3 };

    expect(object.memoized(1)).toBe(6);
  });

  test('should consume cache', () => {
    const func = (a, b) => a + b;

    const memoized = memoize(func);

    memoized(1, 2);

    expect(memoized.cache.get(1)).toEqual(3);
  });
});

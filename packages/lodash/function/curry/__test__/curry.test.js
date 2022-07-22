import curry from '../curry';

describe('curry', () => {
  test('should curry a function', () => {
    const add = (a, b, c) => {
      return a + b + c;
    };

    const curried = curry(add);

    expect(curried(1)(2)(3)).toBe(6);
  });
});

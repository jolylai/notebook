import forEach from '../forEach';

describe('forEach', () => {
  test('should forEach be defined', () => {
    expect(forEach).toBeDefined();
  });

  test('should iterate Object', () => {
    const keys = [];
    const values = [];

    const obj = { one: 1, two: 2, three: 3 };

    const fn = jest.fn((value, key) => {
      keys.push(key);
      values.push(value);
    });

    forEach(obj, fn);

    expect(fn).toBeCalledTimes(3);

    expect(fn).toBeCalledWith(1, 'one', { one: 1, two: 2, three: 3 });
    expect(fn).toBeCalledWith(1, 'one', { one: 1, two: 2, three: 3 });
    // expect(fn).toBeCalledWith([
    //   [1, 'one', { one: 1, two: 2, three: 3 }],
    //   [2, 'two', { one: 1, two: 2, three: 3 }],
    //   [3, 'three', { one: 1, two: 2, three: 3 }],
    // ]);

    expect(keys).toEqual(['one', 'two', 'three']);
    expect(values).toEqual([1, 2, 3]);
  });
});

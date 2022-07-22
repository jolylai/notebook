import sample from '../sample';

describe('sample', () => {
  test('should return a random element', () => {
    const array = [1, 2, 3];

    expect(array.includes(sample(array))).toBe(true);
  });
});

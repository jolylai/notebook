import get from '../get';

describe('get', () => {
  test('should get object value by string', () => {
    const object = { a: [{ b: { c: 3 } }] };

    expect(get(object, 'a[0].b.c')).toBe(3);
  });
});

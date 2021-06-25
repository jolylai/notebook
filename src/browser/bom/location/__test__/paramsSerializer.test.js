import paramsSerializer from '../demo/paramsSerializer';

describe('paramsSerializer', () => {
  test('should support params', () => {
    expect(paramsSerializer({ a: 'foo' })).toBe('a=foo');
  });

  test('should serialize object params', function() {
    expect(
      paramsSerializer({
        foo: {
          bar: 'baz',
        },
      }),
    ).toEqual(
      `${encodeURIComponent('foo')}=${encodeURIComponent(
        JSON.stringify({
          bar: 'baz',
        }),
      )}`,
    );
  });
});

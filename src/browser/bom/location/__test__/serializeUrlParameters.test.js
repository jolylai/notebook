import serializeUrlParameters from '../demo/serializeUrlParameters';

describe('serializeUrlParameters', () => {
  test('should support params', () => {
    expect(serializeUrlParameters({ a: 'foo' })).toBe('a=foo');
  });

  test('should serialize object params', function() {
    expect(
      serializeUrlParameters({
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

import serialize from '../demos/serialize';

describe('serialize', () => {
  test('should support params', () => {
    expect(serialize({ a: 'foo' })).toBe('a=foo');
  });

  test('should support object params', function() {
    expect(
      serialize({
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

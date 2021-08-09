import merge from '../index';

describe('merge', () => {
  test('should merge source into object', () => {
    var names = {
      characters: [{ name: 'barney' }, { name: 'fred' }],
    };

    var ages = {
      characters: [{ age: 36 }, { age: 40 }],
    };

    var heights = {
      characters: [{ height: '5\'4"' }, { height: '5\'5"' }],
    };

    var expected = {
      characters: [
        { name: 'barney', age: 36, height: '5\'4"' },
        { name: 'fred', age: 40, height: '5\'5"' },
      ],
    };

    expect(merge(names, ages, heights)).toEqual(expected);
  });
});

describe('array', () => {
  // test('should convert Arrray like to Array', () => {
  //   const arrayLike = { 0: 'apple', 1: 'orange', length: 2 };
  //   expect([...arrayLike]).toEqual(['apple', 'orange']);
  // });
});

describe('Array.from', () => {
  test('should convert Arrray like to Array', () => {
    const arrayLike = { 0: 'apple', 1: 'orange', length: 2 };

    expect(Array.from(arrayLike)).toEqual(['apple', 'orange']);
  });

  test('should receive iteratee', () => {
    expect(Array.from([1, 2, 3], x => x * x)).toEqual([1, 4, 9]);
  });
});

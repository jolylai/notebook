import debounce from '../debounce';

describe('debounce', () => {
  test('should debounce a function', () => {
    const fn = jest.fn();

    const debounced = debounce(fn);
  });
});

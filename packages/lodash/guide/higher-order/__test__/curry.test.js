import curry from '../demo/curry';

describe('curry', () => {
  test('should curried received all arguments', () => {
    const fn = jest.fn(function buildUrl(scheme, domain, path) {
      return scheme + domain + path;
    });

    const curried = curry(fn);

    expect(curried('https://', 'github.com', '/curry')).toBe(
      'https://github.com/curry',
    );

    expect(fn).toBeCalledTimes(1);
  });

  test('should curried step by step', () => {
    const fn = jest.fn(function buildUrl(scheme, domain, path) {
      return scheme + domain + path;
    });

    const curried = curry(fn);

    const githubOrigin = curried('https://', 'github.com');
    expect(fn).toBeCalledTimes(0);

    expect(githubOrigin('/curry')).toBe('https://github.com/curry');
    expect(fn).toBeCalledTimes(1);
  });
});

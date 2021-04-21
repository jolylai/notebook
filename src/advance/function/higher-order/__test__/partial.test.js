import partial from '../demo/partial';

describe('partial', () => {
  test('should partial work', () => {
    function buildUrl(scheme, domain, path) {
      return scheme + domain + path;
    }

    const fn = jest.fn(buildUrl);

    const githubOrigin = partial(fn, 'https://', 'github.com');

    expect(fn).toBeCalledTimes(0);
    expect(githubOrigin('/profile')).toBe('https://github.com/profile');
    expect(fn).toBeCalledTimes(1);
  });
});

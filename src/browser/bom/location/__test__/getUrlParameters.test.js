import getUrlParameters from '../demo/getUrlParameters';

describe('getUrlParameters', () => {
  test('should get empty object width no parameters', () => {
    expect(getUrlParameters('http://www.url.com')).toEqual({});
  });

  test('should get parameters', () => {
    expect(getUrlParameters('http://www.url.com?name=jack&age=8')).toEqual({
      name: 'jack',
      age: '8',
    });
  });
});

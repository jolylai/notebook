import getURLParams from './index';

test('should getURLParams', () => {
  expect(getURLParams('google.com')).toEqual({});
  expect(getURLParams('http://url.com/page?name=Adam&surname=Smith')).toEqual({
    name: 'Adam',
    surname: 'Smith',
  });
});

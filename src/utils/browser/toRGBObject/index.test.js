import toRGBObject from './index';

test('test toRGBObject', () => {
  expect(toRGBObject('rgb(255, 12, 0)')).toEqual({
    red: 255,
    green: 12,
    blue: 0,
  });
});

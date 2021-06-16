import addDaysToDate from './index';

describe('addDaysToData', () => {
  test('should be defined', () => {
    expect(addDaysToDate).toBeDefined();
  });

  test('2020-10-15 ten days later should 2020-10-25', () => {
    expect(addDaysToDate('2020-10-15', 10)).toBe('2020-10-25');
  });

  test('2021-04-01 tow days before should be 2020-10-25', () => {
    expect(addDaysToDate('2021-04-01', -3)).toBe('2021-03-29');
  });
});

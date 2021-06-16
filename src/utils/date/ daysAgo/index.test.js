import daysAgo from './index';

describe('daysAgo', () => {
  test('should daysAge defined', () => {
    expect(daysAgo).toBeDefined();
  });

  test('should yesterday be 2021-03-31', () => {
    expect(daysAgo(1)).toBe('2021-03-31');
  });
});

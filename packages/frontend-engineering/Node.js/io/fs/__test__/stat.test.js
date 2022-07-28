const { resolve } = require('path');

const stat = require('../demo/stat');

describe('stat', () => {
  // test('should stat to be defind', () => {
  //   expect(stat).toBeDefinded();
  // });

  test('should __test__ is Directory', async () => {
    const path = resolve(__dirname, '../__test__');
    const stats = await stat(path);
    expect(stats.isDirectory()).toBe(true);
  });
});

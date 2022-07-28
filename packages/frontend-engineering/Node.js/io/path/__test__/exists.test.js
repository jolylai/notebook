import path from 'path';
import exists from '../demo/exists';

describe('exists', () => {
  test('should  exists file exists', async () => {
    const filePath = path.resolve(__dirname, '../demo/exists.js');
    expect(await exists(filePath)).toBe(true);
  });

  test('should  exists1 file not exists', async () => {
    const filePath = path.resolve(__dirname, '../demo/exists1.js');
    expect(await exists(filePath)).toBe(false);
  });

  test('should  __test__ folder exists', async () => {
    const folderPath = path.resolve(__dirname, '../__test__');
    expect(await exists(folderPath)).toBe(true);
  });

  test('should  test folder not exists', async () => {
    const folderPath = path.resolve(__dirname, '../test');
    expect(await exists(folderPath)).toBe(false);
  });
});

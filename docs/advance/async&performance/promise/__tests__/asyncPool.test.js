import { asyncPool } from '../demo/asyncPool';

jest.useFakeTimers();

describe('asyncPool', () => {
  test('should asyncPool defined', async () => {
    const fn = jest.fn();

    const timeout = i =>
      new Promise(resolve =>
        setTimeout(() => {
          console.log('i: ', i);
          return resolve(i);
        }, i),
      );

    asyncPool(2, [1000, 5000, 3000, 2000], timeout);

    // jest.advanceTimersByTime(2000);
    // expect(fn).toHaveBeenCalledTimes(1);
  });
});

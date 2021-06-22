import after from '../after';

describe('after', () => {
  test('should create a function that invokes func after n calls', () => {
    const fn = jest.fn();
    const afterFunc = after(2, fn);

    afterFunc();
    expect(fn).toBeCalledTimes(0);

    afterFunc();
    expect(fn).toBeCalledTimes(1);
  });

  test('should coerce n value of NaN to 0', () => {
    const fn = jest.fn();
    const afterFunc = after(NaN, fn);
    afterFunc();

    expect(fn).toBeCalledTimes(1);
  });

  test('should use this binding of function', () => {
    const afterFunc = after(0, function() {
      return this.count;
    });

    const object = { after: afterFunc, count: 0 };

    expect(object.after()).toBe(0);
  });
});

---
title: Mock
---

## 捕获

捕获函数的调用和返回结果以及 this 和调用顺序

```js
test('function arguments', async () => {
  const fn = jest.fn();

  fn(1);

  // 第一次被调用的参数
  expect(fn.mock.calls[0]).toBe(1);

  // 每次被调用的参数
  expect(fn).toBeCalledWidth(1);
});
```

```js
test('function arguments', async () => {
  const fn = jest.fn();

  fn(1);

  expect(fn.mock.calls[0]).toBe(1);
});
```

调用次数

```js
test('function called times', () => {
  const fn = jest.fn();

  fn();

  expect(fn).toBeCallTimes(1);
});
```

```js
const fn = jest.fn();

console.log(fn.mock);
// {
//       calls: [ [ 'https://', 'github.com', '/curry' ] ,
//       instances: [ undefined ],
//       invocationCallOrder: [ 2 ],
//       results: [ { type: 'return', value: 'https://github.com/curry' } ]
//     }
```

## 自由设置返回结果

```js
test('mockReturnValue', async () => {
  const fn = jest.fn();
  fn.mockReturnValue('hello');
  fn.mockReturnValueOnce('hello');

  expect(fn()).toBe('hello');
});
```

#### mockImplementation

```js
test('mockImplementation', async () => {
  const fn = jest.fn(() => {
    return 'hello';
  });

  // 等同
  fn.mockImplementation(() => {
    return 'hello';
  });

  fn.mockImplementationOnce(() => {
    return 'hello';
  });

  expect(fn()).toBe('hello');
});
```

```js
test('get', async () => {
  const fn = jest.fn();

  fn.mockImplementation(() => {
    return this;
  });

  // 等同
  fn.mockReturnThis()

  expect(fn()).toBeUndefined(');
});
```

## 改变函数内部的实现

```js
import axios from 'axios';
import { queryUser } from './api/user';

test('get', async () => {
  axios.get.mockResolvedValue({ data: 'hello' });
  const response = await queryUser();
  expect(response).toBe('hello');
});
```

返回不同的结果

```js
import axios from 'axios';
import { queryUser } from './api/user';

test('get', async () => {
  axios.get.mockResolvedValueOnce({ data: 'hello' });
  axios.get.mockResolvedValueOnce({ data: 'world' });
  const response = await queryUser();
  expect(response).toBe('hello');

  const response = await queryUser();
  expect(response).toBe('world');
});
```

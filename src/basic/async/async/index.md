---
title: async/await
---

## 循环

如果你想连续执行 await 调用，请使用 for 循环(或任何没有回调的循环)。

```js
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const fruitBasket = {
  apple: 27,
  grape: 0,
  pear: 14,
};

function getFruitNumber(fruit) {
  return sleep(1000).then(() => fruitBasket[fruit]);
}

const fruitsToGet = ['apple', 'grape', 'pear'];

const forLoop = async () => {
  for (let i = 0; i < fruitsToGet.length; i++) {
    const fruitNumber = await getFruitNumber(fruitsToGet[i]);
    console.log('fruitNumber: ', fruitNumber);
  }
};

forLoop();
```

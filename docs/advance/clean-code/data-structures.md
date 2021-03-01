---
title: 数据结构
---

[clean code](https://github.com/ryanmcdermott/clean-code-javascript)

## 使用 getters 和 setters

```js
function makeBankAccount() {
  // ...

  return {
    balance: 0,
    // ...
  };
}

const account = makeBankAccount();
account.balance = 100;
```

```js
function makeBankAccount() {
  let balance = 0;
  function getBanlance() {
    return balance;
  }
}
```

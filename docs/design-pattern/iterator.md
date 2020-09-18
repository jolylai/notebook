# 迭代器

有序访问数据集合

## ES6 Iterator

- Array Set Map 都有 `[Symbol.iterator]` 属性
- 属性值是函数，执行函数返回一个迭代器
- 这个迭代器有 `next` 方法可以顺序迭代子元素
- 可以用 `Array.prototype[Symbol.iterator]`  来测试
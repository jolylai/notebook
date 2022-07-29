---
title: 快速开始
group:
  title: 单元测试框架 Jest
---

## Babel

安装 babel 依赖包

```shell
yarn add --dev babel-jest @babel/core @babel/preset-env
```

可以在工程的根目录下创建一个 babel.config.js 文件用于配置与你当前 Node 版本兼容的 Babel：

```js
// babel.config.js
module.exports = {
  presets: [['@babel/preset-env', { targets: { node: 'current' } }]],
};
```

## TypeScript

Jest 可以通过 Babel 支持 TypeScript。 首先，在项目中正确的使用 Babel。 其次，使用 Yarn 或者 npm 安装 @babel/preset-typescript

```
yarn add --dev @babel/preset-typescript
```

你需要添加 @babel/preset-typescript 的预设到 babel.config.js.

```js
// babel.config.js
module.exports = {
  presets: [
    ['@babel/preset-env', { targets: { node: 'current' } }],
    '@babel/preset-typescript',
  ],
};
```

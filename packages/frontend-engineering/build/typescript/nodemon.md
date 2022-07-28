---
title: nodemon
---

## 配置

创建 `nodemon.json` 配置配置文件

```json
{
  "watch": ["src"],
  "ext": "ts,json",
  "ignore": ["src/**/*.spec.ts"],
  "exec": "ts-node ./src/dev.ts"
}
```

## TypeScript

```shell
yarn add nodemon ts-node -D
```

## ESM

使用 babel

```shell
yarn add @babel/core @babel/cli @babel/preset-env @babel/node nodemon -D
```

babel.config.js

```js
module.exports = {
  presets: [['@babel/preset-env']],
};
```

package.json

```json
{
  "scripts": {
    "start": "nodemon --exec babel-node app.js"
  }
}
```

esm

```shell
yarn add esm -D
```

```shell
nodemon -r esm app.js
```

## env

```shell
yarn add dotenv -D
```

创建 `.env` 文件

```shell
 nodemon -r dotenv/config ./index.ts"
```

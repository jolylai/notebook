## 开发环境 

```shell
yarn add nodemon ts-node -D
```

创建 `nodemon.json` 配置 `nodemon`

```json
{
  "watch": ["src"],
  "ext": "ts,json",
  "ignore": ["src/**/*.spec.ts"],
  "exec": "ts-node ./src/dev.ts"
}
```

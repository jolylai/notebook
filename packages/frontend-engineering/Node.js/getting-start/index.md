---
title: 环境变量
---

## 环境变量

Node.js 的 process 核心模块提供了 env 属性，该属性承载了在启动进程时设置的所有环境变量。

这是访问 NODE_ENV 环境变量的示例，该环境变量默认情况下被设置为 development。

```js
process.env.NODE_ENV; // "development"
```

在脚本运行之前将其设置为 "production"，则可告诉 Node.js 这是生产环境。

可以用相同的方式访问设置的任何自定义的环境变量。

## dotenv

在根目录创建 `.env` 文件

```
DB_HOST=localhost
DB_USER=root
DB_PASS=s1mpl3
```

这样就能

https://github.com/motdotla/dotenv

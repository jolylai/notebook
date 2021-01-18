---
title: 提交效验
group:
  title: 自动化
  order: 2
---

安装 `husky` （哈士奇）

```shell
yarn add -D husky chalk
```

在 `package.json` 加上下面的代码

```json
"husky": {
  "hooks": {
    "pre-commit": "npm run lint",
    "commit-msg": "node script/verify-commit.js",
    "pre-push": "npm test"
  }
}
```

现在来解释下各个钩子的含义：

1. `"pre-commit": "npm run lint"`，在 git commit 前执行 npm run lint 检查代码格式。
2. `"commit-msg": "node script/verify-commit.js"`，在 git commit 时执行脚本 verify-commit.js 验证 commit 消息。如果不符合脚本中定义的格式，将会报错。
3. `"pre-push": "npm test"`，在你执行 git push 将代码推送到远程仓库前，执行 npm test 进行测试。如果测试失败，将不会执行这次推送。

然后在你项目根目录下新建一个文件夹 `script`，并在下面新建一个文件 `verify-commit.js`，输入以下代码：

```js
const msgPath = process.env.HUSKY_GIT_PARAMS;
const msg = require('fs')
  .readFileSync(msgPath, 'utf-8')
  .trim();
const commitRE = /^(feat|fix|docs|style|refactor|perf|test|workflow|build|ci|chore|release|workflow)(\(.+\))?: .{1,50}/;
if (!commitRE.test(msg)) {
  console.log();
  console.error(`
        不合法的 commit 消息格式。
        请查看 git commit 提交规范：https://github.com/woai3c/Front-end-articles/blob/master/git%20commit%20style.md
    `);
  process.exit(1);
}
```

`/scripts/verifyCommit.js`

```js
// Invoked on the commit-msg git hook by yorkie.
const chalk = require('chalk');
const msgPath = process.env.GIT_PARAMS;
const msg = require('fs')
  .readFileSync(msgPath, 'utf-8')
  .trim();
const commitRE = /^(revert: )?(feat|fix|docs|dx|style|refactor|perf|test|workflow|build|ci|chore|types|wip|release)(\(.+\))?(.{1,10})?: .{1,50}/;
const mergeRe = /^(Merge pull request|Merge branch)/;
if (!commitRE.test(msg)) {
  if (!mergeRe.test(msg)) {
    console.log(msg);
    console.error(
      `  ${chalk.bgRed.white(' ERROR ')} ${chalk.red(
        `invalid commit message format.`,
      )}\n\n` +
        chalk.red(
          `  Proper commit message format is required for automated changelog generation. Examples:\n\n`,
        ) +
        `    ${chalk.green(`feat(compiler): add 'comments' option`)}\n` +
        `    ${chalk.green(
          `fix(v-model): handle events on blur (close #28)`,
        )}\n\n` +
        chalk.red(
          `  See https://github.com/vuejs/vue-next/blob/master/.github/commit-convention.md for more details.\n`,
        ),
    );
    process.exit(1);
  }
}
```

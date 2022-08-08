---
title: 代码规范检查
---

## 前言

将代码提交到远程仓库前对提交的代码进行检查，如果符合规范，则可进行提交，如果不符合规范则不允许提交到远程仓库，
这样才能确保远程仓库的代码都是风格一致的代码

## 代码规格式化

在提交 `git` 之前，我们需要校验我们的代码是否符合规范，如果不符合，则不允许提交代码。

首先，安装依赖：

```shell
yarn add yorkie lint-staged -D
```

- [yorkie](https://github.com/yyx990803/yorkie)

配置 `package.json`

```json
{
  "gitHooks": {
    "pre-commit": "lint-staged",
    "commit-msg": "node scripts/verify-commit.js",
    "pre-push": "npm test"
  },
  "lint-staged": {
    "*.{js,vue}": ["eslint", "prettier --write"],
    "*.ts?(x)": ["eslint", "prettier --parser=typescript --write"]
  }
}
```

在 `git commit` 之前会进入工作区文件的扫描，执行 `prettier` 脚本，修改 `eslint` 问题，然后重要提交到工作区。

常用的 `git` 钩子的含义：

1. `"pre-commit": "lint-staged"`，在 `git commit` 前执行检查代码格式。
2. `"commit-msg": "node script/verify-commit.js"`，在 `git commit` 时执行脚本 `verify-commit.js` 验证 `commit` 消息。如果不符合脚本中定义的格式，将会报错。
3. `"pre-push": "npm test"`，在你执行 `git push` 将代码推送到远程仓库前，执行 `npm test` 进行测试。如果测试失败，将不会执行这次推送。

创建 `.prettierrc`

```
semi: false
singleQuote: true
printWidth: 80
```

## 提交信息检查

### 自定义效验检查提

创建 `/scripts/verifyCommit.js` 交信息规范

```js
// Invoked on the commit-msg git hook by yorkie.

const chalk = require('chalk');
const msgPath = process.env.GIT_PARAMS;
const msg = require('fs')
  .readFileSync(msgPath, 'utf-8')
  .trim();

const commitRE = /^(revert: )?(feat|fix|docs|dx|style|refactor|perf|test|workflow|build|ci|chore|types|wip|release)(\(.+\))?: .{1,50}/;

if (!commitRE.test(msg)) {
  console.log();
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
      chalk.red(`  See .github/commit-convention.md for more details.\n`),
  );
  process.exit(1);
}
```

配置 `package.json`

```json
{
  "gitHooks": {
    "commit-msg": "node scripts/verifyCommit.js"
  }
}
```

### Commitizen 校验

检验提交的说明是否符合规范，不符合则不可以提交

```shell
yarn add -D @commitlint/cli

// 安装符合Angular风格的校验规则
yarn add -D @commitlint/config-conventional
```

在根目录下创建 `commitlint.config.js` 并配置检验：

```js
module.exports = {
  extends: ['@commitlint/config-conventional'],
};
```

然后在 `package.json` 中配置 `gitHooks`

```json
{
  "gitHooks": {
    "commit-msg": "commitlint -E GIT_PARAMS"
  }
}
```

## Prettier

[`Prettier`](https://prettier.io/) 是一个代码格式化的工具。

安装使用

```shell
yarn add prettier -D
```

创建 `.prettierrc` 文件，配置 `Prettier` 如何格式化代码 ，以下是常用配置，更多配置可以[查看](https://prettier.io/docs/en/options.html)

```json
{
  "printWidth": 80, //一行的字符数，如果超过会进行换行，默认为80
  "tabWidth": 2, //一个tab代表几个空格数，默认为80
  "useTabs": false, //是否使用tab进行缩进，默认为false，表示用空格进行缩减
  "singleQuote": false, //字符串是否使用单引号，默认为false，使用双引号
  "semi": true, //行位是否使用分号，默认为true
  "trailingComma": "none", //是否使用尾逗号，有三个可选值"
  "bracketSpacing": true, // 对象，数组加空格
  "jsxBracketSameLine": false, // jsx > 是否另起一行
  "arrowParens": "avoid", // (x) => {} 是否要有小括号
  "requirePragma": false, // 是否要注释来决定是否格式化代码
  "proseWrap": "preserve" // 是否要换行
}
```

创建 `.prettierignore` 文件，告诉 `Prettier` 哪些文件不需要格式化

```
# Ignore artifacts:
build
coverage

# Ignore all HTML files:
*.html

**/*.svg
**/*.ejs
package.json
.umi
.umi-production
.umi-test
```

命令行

```shell
# 格式化所有文件
yarn prettier --write .

# 格式化某些文件夹下的文件
yarn prettier --write app/

# 格式化具体文件
yarn prettier --write app/components/Button.js

# 格式化所有匹配到的文件
yarn prettier --write "app/**/*.test.js"

prettier --write \"**/*.{js,jsx,tsx,ts,less,md,json}\"
```

## ESLint

安装 `eslint`

```shell
yarn add eslint -D
yarn run eslint --init
```

创建 `.eslintrc`, 配置 `eslint` 如何效验代码

- `env`: 环境提供了预定义的全局变量。
- `globals`: 脚本在执行过程中访问的其他全局变量。
- `rules`:启用了哪些规则，在什么错误级别上。
- `plugins`: 第三方插件定义额外的规则、环境、配置等，供 ESLint 使用。

```json
{
  "env": {
    "browser": true,
    "node": true
  },
  "globals": {
    "ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION": true,
    "page": true,
    "REACT_APP_ENV": true
  }
}
```

**配置优先级**

规则是使用离要检测的文件最近的 .eslintrc 文件作为最高优先级。

1.  行内配置
2.  命令行选项
3.  项目级配置
4.  IDE
5.  环境配置

使用命令行检查文件代码

```shell
yarn eslint .
```

## EditorConfig

EditorConfig 有助于维护跨多个编辑器和 IDE 从事同一项目的多个开发人员的一致编码风格，团队必备神器。

`.editorconfig` 文件

```
# EditorConfig is awesome: https://EditorConfig.org

# top-most EditorConfig file 表示是最顶层的配置文件，发现设为true时，才会停止查找.editorconfig文件
root = true

# UNIX-style newlines with a newline ending every file 对于所有的文件  始终在文件末尾插入一个新行
[*]
end_of_line = lf
insert_final_newline = true

# Matches multiple files with brace expansion notation
# Set default charset  对于所有的js,py文件，设置文件字符集为utf-8
[*.{js,py}]
charset = utf-8

# 4 space indentation 控制py文件类型的缩进大小
[*.py]
indent_style = space
indent_size = 4

# Tab indentation (no size specified) 设置某中文件的缩进风格为tab Makefile未指明
[Makefile]
indent_style = tab

# Indentation override for all JS under lib directory  设置在lib目录下所有JS的缩进为
[lib/**.js]
indent_style = space
indent_size = 2

# Matches the exact files either package.json or .travis.yml 设置确切文件 package.json/.travis/.yml的缩进类型
[{package.json,.travis.yml}]
indent_style = space
indent_size = 2
```

通配符

```
*                匹配除/之外的任意字符串
**               匹配任意字符串
?                匹配任意单个字符
[name]           匹配name中的任意一个单一字符
[!name]          匹配不存在name中的任意一个单一字符
{s1,s2,s3}       匹配给定的字符串中的任意一个(用逗号分隔)
{num1..num2}    匹配num1到num2之间的任意一个整数, 这里的num1和num2可以为正整数也可以为负整数
```

属性

```
indent_style    设置缩进风格(tab是硬缩进，space为软缩进)
indent_size     用一个整数定义的列数来设置缩进的宽度，如果indent_style为tab，则此属性默认为tab_width
tab_width       用一个整数来设置tab缩进的列数。默认是indent_size
end_of_line     设置换行符，值为lf、cr和crlf
charset         设置编码，值为latin1、utf-8、utf-8-bom、utf-16be和utf-16le，不建议使用utf-8-bom
trim_trailing_whitespace  设为true表示会去除换行行首的任意空白字符。
insert_final_newline      设为true表示使文件以一个空白行结尾
root           表示是最顶层的配置文件，发现设为true时，才会停止查找.editorconfig文件
```

#### Reference

- [一套标准的前端代码工作流](https://mp.weixin.qq.com/s/YI5_E4JJAb6Xu0kZgkjabQ)

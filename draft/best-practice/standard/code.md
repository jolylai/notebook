---
title: 代码规范
group:
  title: 开发规范
  order: 1
nav:
  title: 最佳实践
---

## 项目目录结构

## 代码规范

安装依赖

```shell
yarn add eslint -D
yarn add eslint-formatter-pretty -D
yarn add eslint-plugin-json -D
yarn add eslint-plugin-prettier -D
yarn add eslint-plugin-vue -D
yarn add @vue/eslint-config-prettier -D
yarn add babel-eslint -D
yarn add prettier -D
```

创建 `.eslintrc.js` 定义代码效验规则

```js
module.exports = {
  root: true,
  env: {
    browser: true,
    es2020: true,
    node: true,
    jest: true,
  },
  globals: {
    ga: true,
    chrome: true,
    __DEV__: true,
  },
  extends: [
    'plugin:json/recommended',
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/prettier',
  ],
  parserOptions: {
    parser: 'babel-eslint',
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'prettier/prettier': 'error',
  },
};
```

创建 `.eslintignore` 排除不需要进行代码效验的文件和文件夹

```
src/utils/popper.js
src/utils/date.js
examples/play
*.sh
node_modules
lib
coverage
*.md
*.scss
*.woff
*.ttf
src/index.js
dist
```

package.json

```json
{
  "scripts": {
    "lint": "eslint --no-error-on-unmatched-pattern --ext .vue --ext .js --ext .jsx packages/**/ src/**/ --fix"
  }
}
```

## git 版本规范

#### Commit 规范

内容规范

```
<type>(<scope>): <subject>
<BLANK LINE>
<body>
<BLANK LINE>
<footer>
```

大致分为三个部分(使用空行分割):

1. 标题行: 必填, 描述主要修改类型和内容
2. 主题内容: 描述为什么修改, 做了什么样的修改, 以及开发的思路等等
3. 页脚注释: 可以写注释，BUG 号链接

   - `feat`: 新功能、新特性
   - `fix`: 修改 bug
   - `perf`: 更改代码，以提高性能
   - `refactor`: 代码重构（重构，在不影响代码内部行为、功能下的代码修改）
   - `docs`: 文档修改
   - `style`: 代码格式修改, 注意不是 css 修改（例如分号修改）
   - `test`: 测试用例新增、修改
   - `build`: 影响项目构建或依赖项修改
   - `revert`: 恢复上一次提交
   - `ci`: 持续集成相关文件修改
   - `chore`: 其他修改（不在上述类型中的修改）
   - `release`: 发布新版本
   - `workflow`: 工作流相关文件修改

4. scope: commit 影响的范围, 比如: route, component, utils, build...
5. subject: commit 的概述
6. body: commit 具体修改内容, 可以分为多行.
7. footer: 一些备注, 通常是 BREAKING CHANGE 或修复的 bug 的链接.

[查看 Vue 仓库代码提交规范](https://github.com/vuejs/vue/pulls)

**fix（修复 BUG）**

如果修复的这个 BUG 只影响当前修改的文件，可不加范围。如果影响的范围比较大，要加上范围描述。

例如这次 BUG 修复影响到全局，可以加个 `global`。如果影响的是某个目录或某个功能，可以加上该目录的路径，或者对应的功能名称。

```
// 示例1
fix(global):修复checkbox不能复选的问题

// 示例2 下面圆括号里的 common 为通用管理的名称
fix(common): 修复字体过小的BUG，将通用管理下所有页面的默认字体大小修改为 14px

// 示例3
fix: value.length -> values.length
```

**feat（添加新功能或新页面）**

```
feat: 添加网站主页静态页面
这是一个示例，假设对点检任务静态页面进行了一些描述。

这里是备注，可以是放BUG链接或者一些重要性的东西。
```

**chore（其他修改）**

chore 的中文翻译为日常事务、例行工作，顾名思义，即不在其他 commit 类型中的修改，都可以用 chore 表示。

```
chore: 将表格中的查看详情改为详情
```

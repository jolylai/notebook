---
title: 模块机制
group:
  order: 2
  title: Node.js 基础
---

## 前言

在 Node 中，模块分为两类

1.  **核心模块**: Node 提供的模块
2.  **文件模块**: 用户编写的模块

### 核心模块

**核心模块**部分在 Node 源代码的编译过程中，编译进了二进制执行文件。在 Node 进程启动时，部分核心模块就被直接加载进内存中，所以这部分核心模块引入时，文件定位和编 译执行这两个步骤可以省略掉，并且在路径分析中优先判断，所以它的加载速度是最快的。

```js
const fs = require('fs)
```

### 文件模块

**文件模块**则是在运行时动态加载，需要完整的路径分析、文件定位、编译执行过程，速度比核心模块慢。

在 Node 中引入模块，需要经历如下 3 个步骤。

1. 路径分析
2. 文件定位
3. 编译执行

## 路径分析

**模块标识符**其实就是传递给 `require()` 方法的参数，它必须是符合小驼峰命名的字符串，或者 以`.`、`..`开头的相对路径，或者绝对路径。它可以没有文件名后缀`.js`。
模块标识符在 Node 中主要分为以下几类。

- 核心模块，如 `http`、`fs`、`path` 等。
- `.`或`..`开始的相对路径文件模块。
- 以`/`开始的绝对路径文件模块。
- 非路径形式的文件模块，如自定义的 connect 模块。

### 核心模块

```js
const fs = require('fs)
```

核心模块的优先级仅次于缓存加载，它在 Node 的源代码编译过程中已经编译为二进制代码， 其加载过程最快。

如果试图加载一个与核心模块标识符相同的自定义模块，那是不会成功的。如果自己编写了 一个 http 用户模块，想要加载成功，必须选择一个不同的标识符或者换用路径的方式。

### 文件模块

```js
const { add } = require('./math');
```

以`.`、`..` 和 `/` 开始的标识符，这里都被当做文件模块来处理。

在分析路径模块时，`require()`方法会将路径转为真实路径，并以真实路径作为索引，将编译执行后的结果存放到缓存中，以使二次加载时更快。

### 第三方模块

```js
const _ = require('lodash');
```

模块路径是 Node 在定位文件模块的具体文件时制定的查找策略，具体表现为一个路径组成的数组。

```js
// paths.js

console.log(module.paths);
```

在 Linux 下，你可能得到的是这样一个数组输出:

```
[
  '/home/jackson/research/node_modules',
  '/home/jackson/node_modules',
  '/home/node_modules',
  '/node_modules'
]
```

在加载的过程中，Node 会逐个尝试模块路径中的路径，直到找到目标文件为止。

## 文件定位

### 文件扩展名分析

CommonJS 模块规范也允许在标识符中不包含文件扩展名，这种情况下，Node 会按`.js`、`.json`、`.node` 的次序补足扩展名，依次尝试。

### 目录分析和包

在分析标识符的过程中，`require()`通过分析文件扩展名之后，可能没有查找到对应文件，但却得到一个目录，这在引入自定义模块和逐个模块路径进行查找时经常会出现，此时 Node 会将目录当做一个包来处理。

1. 在当前目录下查找`package.json`
2. 通过`JSON.parse()`解析出包描述对象
3. 从中取出 `main` 属性指定的文件名进行定位
4. 如果文件名缺少扩展名，将会进入扩展名分析的步骤

如果 `main` 属性指定的文件名错误，或者压根没有 `package.json` 文件，Node 会将 `index` 当做默认文件名，然后依次查找 `index.js`、`index.json`、`index.node`。

如果在目录分析的过程中没有定位成功任何文件，则自定义模块进入下一个模块路径进行查找。如果模块路径数组都被遍历完毕，依然没有查找到目标文件，则会抛出查找失败的异常。

## 包与 npm

## 包结构

完全符合 CommonJS 规范的包目录应该包含如下这些文件。

- `package.json`:包描述文件。
- `bin`:用于存放可执行二进制文件的目录。
- `lib`:用于存放 JavaScript 代码的目录。
- `doc`:用于存放文档的目录。
- `test`:用于存放单元测试用例的代码。

### 包描述文件

CommonJS 为 package.json 文件定义了如下一些必需的字段。

- `name`: 包名。由小写的字母和数字组成，可以包含`.`、`_`和`-`，但不允许出现空格。包名必须是唯一的，以免对外公布时产生重名冲突的误解。除此之外，NPM 还
  建议不要在包名中附带上 node 或 js 来重复标识它是 JavaScript 或 Node 模块。
- `description`: 包简介。
- `version`: 版本号。一个语义化的版本号，这在 [semver](http://semver.org/) 上有详细定义，通常为
  `major.minor.revision` 格式。该版本号十分重要，常常用于一些版本控制的场合。
- `keywords`: 关键词数组，NPM 中主要用来做分类搜索。一个好的关键词数组有利于用户快速找到你编写的包。
- `maintainers`: 包维护者列表。每个维护者由 `name`、`email` 和 `web` 这 3 个属性组成。示例如下:
  "maintainers": [{ "name": "Jackson Tian", "email": "shyvo1987@gmail.com", "web": "http://html5ify.com" }]NPM 通过该属性进行权限认证。
- `contributors`: 贡献者列表。在开源社区中，为开源项目提供代码是经常出现的事情，如
  果名字能出现在知名项目的 contributors 列表中，是一件比较有荣誉感的事。列表中的第
  一个贡献应当是包的作者本人。它的格式与维护者列表相同。
- `bugs`: 一个可以反馈 bug 的网页地址或邮件地址。
- `licenses`: 当前包所使用的许可证列表，表示这个包可以在哪些许可证下使用。
- `repositories`:托管源代码的位置列表，表明可以通过哪些方式和地址访问包的源代码。
- `dependencies`:使用当前包所需要依赖的包列表。这个属性十分重要，NPM 会通过这个属性帮助自动加载依赖的包。
- `scripts`: 脚本说明对象。它主要被包管理器用来安装、编译、测试和卸载包。
- `homepage`:当前包的网站地址。
- `os`: 操作系统支持列表。这些操作系统的取值包括 aix、freebsd、linux、macos、solaris、
  vxworks、windows。如果设置了列表为空，则不对操作系统做任何假设。
- `cpu`:CPU 架构的支持列表，有效的架构名称有 arm、mips、ppc、sparc、x86 和 x86_64。同
  os 一样，如果列表为空，则不对 CPU 架构做任何假设。
- `engine`: 支持的 JavaScript 引擎列表，有效的引擎取值包括 ejs、flusspferd、gpsee、jsc、
- `author`: 包作者。
- `bin`: 一些包作者希望包可以作为命令行工具使用。配置好 bin 字段后，通过 `npm install package_name -g` 命令可以将脚本添加到执行路径中，之后可以在命令行中直接执行。
- `main`:模块引入方法`require()`在引入包时，会优先检查这个字段，并将其作为包中其余
  模块的入口。如果不存在这个字段，`require()`方法会查找包目录下的`index.js`、`index.node`、`index.json`文件作为默认入口。
- `devDependencies`: 一些模块只在开发时需要依赖。配置这个属性，可以提示包的后续开发者安装依赖包

## 发布 npm 包

```shell
yarn publish --new-version 1.0.0  --registry https://registry.npmjs.org --access public
```

## 创建项目

```shell
yarn create react-app my-app
```

For example, yarn create react-app my-app is equivalent to:

1. Install `create-<starter-kit-package>` globally, or update the package to the latest version if it already exists
2. Run the executable located in the bin field of the starter kit’s package.json, forwarding any `<args>`to it

```shell
$ yarn global add create-react-app
$ create-react-app my-app
```

## 全局包管理

```shell
# 查看已安装的包
yarn global list --depth=0

# 安装全局包
yarn global add <package-name>

# 删除全局包
yarn global remove <package-name>
```

#### Reference

[How the module system, CommonJS & require works](https://blog.risingstack.com/node-js-at-scale-module-system-commonjs-require/)

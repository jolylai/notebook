---
title: 包与 npm
---

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

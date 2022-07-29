---
title: 命令行工具
order: 10
---

## commander

- [commander](https://github.com/tj/commander.js)
- [vue-cli](https://github.com/vuejs/vue-cli/blob/dev/packages/%40vue/cli/bin/vue.js)

```js
const program = require('commander');

program
  .command('build')
  .description('alias of "npm run serve" in the current project')
  .option('--mode <mode>')
  .action(options => {
    console.log('options: ', options);
    // require('../src/dev.mjs')
  });

program.parse(process.argv);
```

## 模板生成器

使用模板生成项目

## 初始化

初始化 Yeoman 的工作环境

```js
import YeomanGenerator from 'yeoman-generator';
import Yeoman from 'yeoman-environment';

const CWD = process.cwd();

export class Generator extends YeomanGenerator {
  constructor(name) {
    super([], {
      env: Yeoman.createEnv([], {
        cwd: CWD,
      }),
      resolved: CWD,
    });
  }

  write() {
    // The destination-root to write the files to.
    // constructor 中  env 配置的 cwd
    console.log('destinationRoot', this.destinationRoot());

    //  The path to the generator.
    console.log('resolved', this.resolved);
  }
}
```

## 命令行用户界面

Yeoman 集成了 [inquirer](https://github.com/SBoudrias/Inquirer.js) 用户交互界面

```js
import YeomanGenerator from 'yeoman-generator';

const PROMPTS = [
  {
    name: 'preprocessor',
    message: 'Select css preprocessor',
    type: 'list',
    choices: ['Less', 'Sass'],
  },
];

export class Generator extends YeomanGenerator {
  userAnswers = {};

  async prompting() {
    this.userAnswers = await this.prompt(PROMPTS);
  }
}
```

## 写入文件

#### 单文件写入

```js
import path, { join } from 'path';
import glob from 'fast-glob';
import YeomanGenerator from 'yeoman-generator';

export class Generator extends YeomanGenerator {
  writing() {
    const templatePath = this.resolved;
    const outputPath = this.destinationRoot();

    // userAnswers 模板数据
    this.fs.copyTpl(templatePath, outputPath, this.userAnswers);
  }
}
```

#### 多文件写入

通过[fast-glob](https://github.com/mrmlnc/fast-glob) 获取需要写入的文件

```js
import path from 'path';
import glob from 'fast-glob';
import YeomanGenerator from 'yeoman-generator';

export class Generator extends YeomanGenerator {
  writing() {
    const templatePath = path.join(this.resolved).replace(/\\/, '/');

    // 模板文件夹下的所有文件
    const templateFiles = glob.sync(path.join(templatePath, '**', '*'), {
      dot: true,
    });

    const destinationRoot = this.destinationRoot();

    // 写入所有的文件
    templateFiles.forEach(filePath => {
      const outputPath = filePath
        .replace('.tpl', '')
        .replace(templatePath, destinationRoot);
      this.fs.copyTpl(filePath, outputPath, this.inputs);
    });
  }
}
```

## 安装依赖

```js
import YeomanGenerator from 'yeoman-generator';

export class Generator extends YeomanGenerator {
  install() {
    this.installDependencies({
      npm: false,
      bower: false,
      yarn: true,
      skipMessage: true,
    });
  }
}
```

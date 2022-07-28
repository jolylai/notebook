---
title: 命令行接口
order: 10
group:
  title: 命令行工具
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

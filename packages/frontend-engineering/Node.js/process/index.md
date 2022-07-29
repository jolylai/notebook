---
title: 进程管理
---

```js
import { exec, execSync } from 'child_process';

export function $(pieces) {
  let cmd = $.prefix + pieces[0];

  return new Promise((resolve, reject) => {
    let child = exec(cmd, {
      windowsHide: true,
      // Shell to execute the command with
      shell: $.shell,
      // Current working directory of the child process.
      cwd: undefined,
    });

    let stdout = '';
    child.stdout.on('data', data => {
      process.stdout.write(data);
      stdout += data;
    });

    let stderr = '';
    child.stderr.on('data', data => {
      process.stderr.write(data);
      stderr += data;
    });

    child.on('exit', code => {
      (code === 0 ? resolve : reject)({
        stdout,
        stderr,
      });
    });
  });
}

// Try `command`, should cover all Bourne-like shells.
// Try `which`, should cover most other cases.
// Try `type` command, if the rest fails.
$.shell = `${execSync('command -v bash || which bash || type -p bash')}`.trim();
$.prefix = 'set -euo pipefail;';

// 切换工作路径
export function cd(path) {
  if ($.verbose) console.log('$', colorize(`cd ${path}`));
  if (!existsSync(path)) {
    let __from = new Error().stack.split('at ')[2].trim();
    console.error(`cd: ${path}: No such directory`);
    console.error(`  at ${__from}`);
    process.exit(1);
  }
  $.cwd = path;
}
```

执行 `shell` 命令

```js
$`cat package.json | grep name`;
```

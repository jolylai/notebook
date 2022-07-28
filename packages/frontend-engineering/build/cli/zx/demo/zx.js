const { existsSync } = require('fs');
const { exec, execSync } = require('child_process');
const chalk = require('chalk');

function colorize(cmd) {
  return cmd.replace(/^\w+\s/, substr => {
    return chalk.greenBright(substr);
  });
}

function $(pieces, ...args) {
  let cmd = pieces[0];
  let i = 0;
  while (i < args.length) cmd += args[i] + pieces[++i];

  if ($.verbose) console.log('$', colorize(cmd));

  return new Promise((resolve, reject) => {
    let child = exec($.prefix + cmd, {
      windowsHide: true,
      // Shell to execute the command with
      shell: $.shell,
      // Current working directory of the child process.
      cwd: $.cwd,
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
$.verbose = true;

function cd(path) {
  if (!existsSync(path)) {
    let __from = new Error().stack.split('at ')[2].trim();
    console.error(`cd: ${path}: No such directory`);
    console.error(`  at ${__from}`);
    process.exit(1);
  }
  $.cwd = path;
}

module.exports = {
  $,
  cd,
  chalk,
};

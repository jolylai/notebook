---
title: 发布脚本
---

## 前言

执行以下命令就能自动打包并发布指定的版本

```shell
yarn release -v 1.0.0
```

通常情况线下，我们发布版本时会在 master 分支进行如下的版本发布操作

1. git pull origin master
2. 根据 package.json 中的 version 更新版本号，更新 changelog
3. git add -A, 然后 git commit
4. git tag 打版本操作
5. push 版本 tag 和 master 分支到仓库

发布脚本会自动执行以下功能

1. 版本控制
2. 执行测试用例
3. 打包
4. 提交代码到本地仓库
5. 发布 npm 包
6. 打标签

安装依赖

```shell
yarn add semver enquirer minimist execa chalk conventional-changelog-cli -D
```

## 版本控制

```js
const semver = require('semver');
const args = require('minimist')(process.argv.slice(2));
const { prompt } = require('enquirer');

const currentVersion = require('../package.json').version;

const preId =
  args.preid ||
  (semver.prerelease(currentVersion) && semver.prerelease(currentVersion)[0]);

const inc = i => semver.inc(currentVersion, i, preId);
const versionIncrements = ['patch', 'minor', 'major'];

(async function main() {
  const { release } = await prompt({
    type: 'select',
    name: 'release',
    message: 'Select release type',
    choices: versionIncrements.map(i => `${i} (${inc(i)})`).concat(['custom']),
  });

  if (release === 'custom') {
    targetVersion = (
      await prompt({
        type: 'input',
        name: 'version',
        message: 'Input custom version',
        initial: currentVersion,
      })
    ).version;
  } else {
    targetVersion = release.match(/\((.*)\)/)[1];
  }

  if (!semver.valid(targetVersion)) {
    throw new Error(`invalid target version: ${targetVersion}`);
  }

  const { yes } = await prompt({
    type: 'confirm',
    name: 'yes',
    message: `Releasing v${targetVersion}. Confirm?`,
  });

  if (!yes) {
    return;
  }

  // ...
})();
```

安装依赖

```shell
yarn add enquirer minimist semver -D
```

- [minimist](https://github.com/substack/minimist): 获取命令行传入的参数 (This module is the guts of optimist's argument parser without all the fanciful decoration.)
- [enquirer](https://github.com/enquirer/enquirer):Stylish CLI prompts that are user-friendly, intuitive and easy to create.
- [semver](https://github.com/npm/node-semver#readme):The semantic versioner for npm

## 执行测试用例并打包

```js
const { prompt } = require('enquirer');
const args = require('minimist')(process.argv.slice(2));
const execa = require('execa');
const chalk = require('chalk');
const targetVersion = args.v;

const step = msg => console.log(chalk.cyan(msg));

const run = (bin, args, opts = {}) =>
  execa(bin, args, { stdio: 'inherit', ...opts });

(async function main() {
  step('\nRunning tests...');
  await run('yarn', ['test']);

  step('\nBuilding element3...');
  await run('yarn', ['build']);
})();
```

安装 [execa](https://github.com/sindresorhus/execa#readme)(Process execution for humans)

```shell
yarn add execa chalk -D
```

## CHANGELOG

安装 [conventional-changelog-cli](https://github.com/conventional-changelog/conventional-changelog)

```shell
yarn add conventional-changelog-cli -D
```

配置 `package.json`

```json
{
  "scripts": {
    "changelog": "conventional-changelog -p angular -i CHANGELOG.md -s"
  }
}
```

上面这条命令产生的 changelog 是基于上次 tag 版本之后的变更（Feature、Fix、Breaking Changes 等等）所产生的，所以如果你想生成之前所有 commit 信息产生的 changelog 则需要使用这条命令：

```shell
$ conventional-changelog -p angular -i CHANGELOG.md -s -r 0
```

其中 -r 表示生成 changelog 所需要使用的 release 版本数量，默认为 1，全部则是 0。

执行以下命名就会在根目录根据 git 提价信息自动生成 `CHANGELOG.md` 文件`

```shell
yarn run changelog
```

## 提交代码

如果还有变更还没提交是，先将变更提交到本地仓库

```js
const execa = require('execa');
const chalk = require('chalk');
const args = require('minimist')(process.argv.slice(2));
const targetVersion = args.v;

const step = msg => console.log(chalk.cyan(msg));

const run = (bin, args, opts = {}) =>
  execa(bin, args, { stdio: 'inherit', ...opts });

(async function main() {
  const { stdout } = await run('git', ['diff'], { stdio: 'pipe' });
  if (stdout) {
    step('\nCommitting changes...');

    await run('git', ['add', '-A']);
    await run('git', ['commit', '-m', `release: v${targetVersion}`]);
  } else {
    console.log('No changes to commit.');
  }
})();
```

### 代码格式化

### 提交信息效验

```shell
yarn add @commitlint/config-conventional @commitlint/cli -D
```

创建 `commitlint.config.js` 文件

```js
module.exports = {
  extends: ['@commitlint/config-conventional'],
};
```

配置`package.json`

```json
{
  "gitHooks": {
    "pre-commit": "lint-staged",
    "commit-msg": "node scripts/verifyCommit.js"
  },
  "lint-staged": {
    "*.js": ["prettier --write"],
    "*.ts?(x)": ["eslint", "prettier --parser=typescript --write"]
  }
}
```

## 发布 npm 包

```js
const path = require('path');
const chalk = require('chalk');
const execa = require('execa');
const args = require('minimist')(process.argv.slice(2));
const targetVersion = args.v;

const step = msg => console.log(chalk.cyan(msg));

const run = (bin, args, opts = {}) =>
  execa(bin, args, { stdio: 'inherit', ...opts });

(async function main() {
  step('\nPublishing package...');

  await run(
    'yarn',
    [
      'publish',
      '--new-version',
      targetVersion,
      '--registry',
      'https://registry.npmjs.org',
      '--access',
      'public',
    ],
    {
      cwd: path.resolve(__dirname),
      stdio: 'pipe',
    },
  );
})();
```

使用[yarn publish](https://classic.yarnpkg.com/en/docs/cli/publish/)发布包到 npm 仓库

```shell
yarn publish --new-version 1.0.0  --registry https://registry.npmjs.org --access public
```

## 打标签

```js
const chalk = require('chalk');
const execa = require('execa');
const args = require('minimist')(process.argv.slice(2));
const targetVersion = args.v;

const step = msg => console.log(chalk.cyan(msg));

const run = (bin, args, opts = {}) =>
  execa(bin, args, { stdio: 'inherit', ...opts });

(async function main() {
  step('\nPushing to GitHub...');

  await run('git', ['tag', `v${targetVersion}`]);
  await run('git', [
    'push',
    'origin',
    `refs/tags/v${targetVersion}`,
    '--no-verify',
  ]);
  await run('git', ['push', 'origin', 'master', '--no-verify']);
})();
```

```shell
git tag -a v-1.0.0 -m message
git push origin v-1.0.0
```

## 完整脚本

配置 `package.json`

```json
{
  "scripts": {
    "release": "node scripts/release.js",
    "changelog": "conventional-changelog -p angular -i CHANGELOG.md -s"
  }
}
```

完整脚本代码

```js
const semver = require('semver');
const { prompt } = require('enquirer');
const path = require('path');
const args = require('minimist')(process.argv.slice(2));
const execa = require('execa');
const chalk = require('chalk');
const isDryRun = args.dry;

const step = msg => console.log(chalk.cyan(msg));
const run = (bin, args, opts = {}) =>
  execa(bin, args, { stdio: 'inherit', ...opts });
const dryRun = (bin, args, opts = {}) =>
  console.log(chalk.blue(`[dryrun] ${bin} ${args.join(' ')}`), opts);
const runIfNotDry = isDryRun ? dryRun : run;

const currentVersion = require('../package.json').version;
const preId =
  args.preid ||
  (semver.prerelease(currentVersion) && semver.prerelease(currentVersion)[0]);

const inc = i => semver.inc(currentVersion, i, preId);

const versionIncrements = [
  'patch',
  'minor',
  'major',
  ...(preId ? ['prepatch', 'preminor', 'premajor', 'prerelease'] : []),
];

(async function main() {
  let targetVersion = args._[0];
  const { release } = await prompt({
    type: 'select',
    name: 'release',
    message: 'Select release type',
    choices: versionIncrements.map(i => `${i} (${inc(i)})`).concat(['custom']),
  });

  if (release === 'custom') {
    targetVersion = (
      await prompt({
        type: 'input',
        name: 'version',
        message: 'Input custom version',
        initial: currentVersion,
      })
    ).version;
  } else {
    targetVersion = release.match(/\((.*)\)/)[1];
  }

  if (!semver.valid(targetVersion)) {
    throw new Error(`invalid target version: ${targetVersion}`);
  }

  const { yes } = await prompt({
    type: 'confirm',
    name: 'yes',
    message: `Releasing v${targetVersion}. Confirm?`,
  });

  if (!yes) {
    return;
  }

  step('\nRunning tests...');
  await runIfNotDry('yarn', ['test']);

  step('\nBuilding usevhooks...');
  await runIfNotDry('yarn', ['build']);

  step('\nGenerate changelog...');
  await runIfNotDry(`yarn`, ['changelog']);

  const { stdout } = await run('git', ['diff'], { stdio: 'pipe' });
  if (stdout) {
    step('\nCommitting changes...');
    await runIfNotDry('git', ['add', '-A']);
    await runIfNotDry('git', ['commit', '-m', `release: v${targetVersion}`]);
  } else {
    console.log('No changes to commit.');
  }

  step('\nPublishing usevhooks package...');

  await runIfNotDry(
    'yarn',
    [
      'publish',
      '--new-version',
      targetVersion,
      '--registry',
      'https://registry.npmjs.org',
      '--access',
      'public',
    ],
    {
      cwd: path.resolve(__dirname, '..'),
      stdio: 'pipe',
    },
  );

  step('\nPushing to GitHub...');
  await runIfNotDry('git', ['tag', `v${targetVersion}`]);
  await runIfNotDry('git', [
    'push',
    'origin',
    `refs/tags/v${targetVersion}`,
    '--no-verify',
  ]);
  await runIfNotDry('git', ['push', 'origin', 'master', '--no-verify']);

  console.log();
  console.log(chalk.green(`Successfully published v${targetVersion}`));
})();
```

#### 版本号控制

```js
const fs = require('fs');
const path = require('path');
const { prompt } = require('enquirer');
const args = require('minimist')(process.argv.slice(2));
const execa = require('execa');
const chalk = require('chalk');
const semver = require('semver');

const isDryRun = args.dry;
let targetVersion = args.v;

const step = msg => console.log(chalk.cyan(msg));

const run = (bin, args, opts = {}) =>
  execa(bin, args, { stdio: 'inherit', ...opts });
const dryRun = (bin, args, opts = {}) =>
  console.log(chalk.blue(`[dryrun] ${bin} ${args.join(' ')}`), opts);

const runIfNotDry = isDryRun ? dryRun : run;

const currentVersion = require('../package.json').version;

const preId =
  args.preid ||
  (semver.prerelease(currentVersion) && semver.prerelease(currentVersion)[0]);

const inc = i => semver.inc(currentVersion, i, preId);
const versionIncrements = ['patch', 'minor', 'major'];

(async function main() {
  const { release } = await prompt({
    type: 'select',
    name: 'release',
    message: 'Select release type',
    choices: versionIncrements.map(i => `${i} (${inc(i)})`).concat(['custom']),
  });

  if (release === 'custom') {
    targetVersion = (
      await prompt({
        type: 'input',
        name: 'version',
        message: 'Input custom version',
        initial: currentVersion,
      })
    ).version;
  } else {
    targetVersion = release.match(/\((.*)\)/)[1];
  }

  if (!semver.valid(targetVersion)) {
    throw new Error(`invalid target version: ${targetVersion}`);
  }

  const { yes } = await prompt({
    type: 'confirm',
    name: 'yes',
    message: `Releasing v${targetVersion}. Confirm?`,
  });

  if (!yes) return;

  step('\nUpdate version...');
  updateVersion(targetVersion);

  const { stdout } = await run('git', ['diff'], { stdio: 'pipe' });
  if (stdout) {
    step('\nCommitting changes...');
    await runIfNotDry('git', ['add', '-A']);
    await runIfNotDry('git', ['commit', '-m', `v-${targetVersion}`]);
  } else {
    console.log('No changes to commit.');
  }

  step('\nPushing to GitLab...');
  await runIfNotDry('git', ['tag', `v-${targetVersion}`]);
  await runIfNotDry('git', [
    'push',
    'origin',
    `v-${targetVersion}`,
    '--no-verify',
  ]);
})();

function updateVersion(version) {
  const pkgPath = path.resolve(__dirname, '../package.json');
  const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'));

  pkg.version = version;
  fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n');
}
```

#### Reference

- [create-release](https://github.com/actions/create-release)
- [element3](https://github.com/hug-sun/element3/blob/master/scripts/release.js)
- [vue-next](https://github.com/vuejs/vue-next/blob/master/scripts/release.js)

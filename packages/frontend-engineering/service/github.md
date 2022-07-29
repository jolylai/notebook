---
title: GitHub
---

## GitHub Pages

GitHub 提供了免费的静态文件服务，我们只需将我们的最终生成的静态文件上传到`gh-pages`分支上就能拥有一个属于自己的静态网站

修改 `.umirc.js`，比如本项目的仓库名为 `notebook-devops`

```js
import { defineConfig } from 'dumi';

export default defineConfig({
  base: '/notebook-devops',
  publicPath: '/notebook-devops/',
  title: 'DevOps',
  favicon: 'https://cy-picgo.oss-cn-hangzhou.aliyuncs.com/pomelo.svg',
  logo: 'https://cy-picgo.oss-cn-hangzhou.aliyuncs.com/pomelo.svg',
  outputPath: 'docs-dist',
  mode: 'site',
  // more config: https://d.umijs.org/config
});
```

添加 `base: '/notebook-devops', publicPath: '/notebook-devops/',`这个两个配置， `notebook-devops` 修改为自己的仓库名

如将本项目部署到 `gh-pages`，执行以下命令打包我们的项目

```shell
$ yarn docs:build

File                   Size                      Gzipped

docs-dist/umi.js       914.6 KB                  268.5 KB
docs-dist/umi.css      84.8 KB                   20.5 KB
```

最终我们可以得到 `docs-dist` 文件夹，只需要把这个文件夹里的文件上传到`gh-pages`分支上就可以了

## 手动部署

将代码提交到远程仓库 gh-pages 分支

```bash
git subtree push --prefix dist origin gh-pages

# dist 为项目的文件路径
git subtree push --prefix docs-dist origin gh-pages
```

将项目推送到远程的 github 上的时候，自动打包项目，并将打包好的包自动部署到 github page 上。

```shell
yarn add gh-pages -D
```

修改 `package.json`, 添加`docs:deploy` 脚本

```json
{
  "scripts": {
    "docs:deploy": "gh-pages -d docs-dist"
  }
}
```

发布

```shell
yarn run docs:deploy
```

## GitHub Actions 自动部署

创建`.github/workflows/deploy.yml`

```yml
name: github pages

on:
  push:
    branches:
      - master

jobs:
  deploy:
    runs-on: ubuntu-18.04
    steps:
      - uses: actions/checkout@v2

      - name: Setup Node
        uses: actions/setup-node@v2.1.0
        with:
          node-version: '12.x'

      - name: Cache dependencies
        uses: c-hive/gha-yarn-cache@v1

      - run: |
          yarn config set registry https://registry.npm.taobao.org
          yarn
          yarn docs:build

      - name: Deploy gh-pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./docs-dist
```

代码提交到 GitHub 仓库时，使用 Travis 自动执行打包，并将`docs-dist`部署到 gh-pages 中

## Travis 自动部署

### 生成 github tocken

按照[创建 Token](https://help.github.com/en/articles/creating-a-personal-access-token-for-the-command-line)创建一个 Token ，并添加到 Travis 的环境变量中，部署中将使用到

### travis 配置

在项目的根路径中创建 `.travis.yml`

```yaml
language: node_js
node_js: stable
cache:
  directories: node_modules
branches:
  only:
    - master
install:
  - yarn install
script:
  - yarn run docs:build
deploy:
  provider: pages
  skip-cleanup: true
  github-token: $GITHUB_TOKEN
  keep-history: true
  local_dir: docs-dist
  on:
    branch: master
```

## GitHub Actions

GitHub 提供了免费的静态文件服务，我们只需将我们的最终生成的静态文件上传到`gh-pages`分支上就能拥有一个属于自己的静态网站

修改 `.umirc.js`，比如本项目的仓库名为 `notebook-devops`

```js
import { defineConfig } from 'dumi';

export default defineConfig({
  base: '/notebook-devops',
  publicPath: '/notebook-devops/',
  title: 'DevOps',
  favicon: 'https://cy-picgo.oss-cn-hangzhou.aliyuncs.com/pomelo.svg',
  logo: 'https://cy-picgo.oss-cn-hangzhou.aliyuncs.com/pomelo.svg',
  outputPath: 'docs-dist',
  mode: 'site',
  // more config: https://d.umijs.org/config
});
```

添加 `base: '/notebook-devops', publicPath: '/notebook-devops/',`这个两个配置， `notebook-devops` 修改为自己的仓库名

如将本项目部署到 `gh-pages`，执行以下命令打包我们的项目

```shell
$ yarn docs:build

File                   Size                      Gzipped

docs-dist/umi.js       914.6 KB                  268.5 KB
docs-dist/umi.css      84.8 KB                   20.5 KB
```

最终我们可以得到 `docs-dist` 文件夹，只需要把这个文件夹里的文件上传到`gh-pages`分支上就可以了

### 手动部署

将代码提交到远程仓库 gh-pages 分支

```bash
git subtree push --prefix dist origin gh-pages

# dist 为项目的文件路径
git subtree push --prefix docs-dist origin gh-pages
```

将项目推送到远程的 github 上的时候，自动打包项目，并将打包好的包自动部署到 github page 上。

```shell
yarn add gh-pages -D
```

修改 `package.json`, 添加`docs:deploy` 脚本

```json
{
  "scripts": {
    "docs:deploy": "gh-pages -d docs-dist"
  }
}
```

发布

```shell
yarn run docs:deploy
```

### 自动部署

创建`.github/workflows/deploy.yml`

```yml
name: github pages

on:
  push:
    branches:
      - master

jobs:
  deploy:
    runs-on: ubuntu-18.04
    steps:
      - uses: actions/checkout@v2

      - name: Setup Node
        uses: actions/setup-node@v2.1.0
        with:
          node-version: '12.x'

      - name: Cache dependencies
        uses: c-hive/gha-yarn-cache@v1

      - run: |
          yarn config set registry https://registry.npm.taobao.org
          yarn
          yarn docs:build

      - name: Deploy gh-pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./docs-dist
```

代码提交到 GitHub 仓库时，使用 Travis 自动执行打包，并将`docs-dist`部署到 gh-pages 中

## 钉钉通知

```yml
name: Release Notify

on:
  release:
    types: [published]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Notify for the DingTalk group
        uses: zcong1993/actions-ding@master
        with:
          dingToken: ${{ secrets.DINGTALK_GROUP_TOKEN }}
          secret: ${{ secrets.DINGTALK_GROUP_SIGN }}
          body: |
            {
              "msgtype": "markdown",
              "markdown": {
                  "title": "${{github.event.release.tag_name}} released",
                  "text": "# [${{github.event.release.tag_name}}](${{github.event.release.html_url}}) released:\n${{github.event.release.body}}"
              }
            }
```

## 发布版本

`.github/workflows/release-tag.yml`

```yml
on:
  push:
    tags:
      - 'v*' # Push events to matching v*, i.e. v1.0, v20.15.10

name: Create Release

jobs:
  build:
    name: Create Release
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@master
      - name: Create Release for Tag
        id: release_tag
        uses: yyx990803/release-tag@master
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        with:
          tag_name: ${{ github.ref }}
          body: |
            Please refer to [CHANGELOG.md](https://github.com/vuejs/vue-next/blob/master/CHANGELOG.md) for details.
```

## 文件大小检查

`.github/workflows/size-check.yml`

```yml
name: 'size'
on:
  push:
    branches:
      - master
  pull_request:
    branches:
      - master
jobs:
  size:
    runs-on: ubuntu-latest
    env:
      CI_JOB_NUMBER: 1
    steps:
      - uses: actions/checkout@v1
      - uses: bahmutov/npm-install@v1

      - uses: posva/size-check-action@v1.1.2
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          build_script: size
          files: packages/vue/dist/vue.global.prod.js packages/runtime-dom/dist/runtime-dom.global.prod.js packages/size-check/dist/size-check.global.prod.js
```

---
title: Github Pages
---

## Github Pages

Github 提供了免费的静态文件服务，我们只需将我们的最终生成的静态文件上传到`gh-pages`分支上就能拥有一个属于自己的静态网站

修改 `.umirc.js`，比如本项目的仓库名为 `notebook-devops`

```js
import { defineConfig } from 'dumi';

export default defineConfig({
  base: '/notebook-devops',
  publicPath: '/notebook-devops/',
  title: 'Devops',
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

## Github Actions 自动部署

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

代码提交到 Github 仓库时，使用 Travis 自动执行打包，并将`docs-dist`部署到 gh-pages 中

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

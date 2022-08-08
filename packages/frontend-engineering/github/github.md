---
title: GitHub
---

复制私钥

```shell
# Git Bash on Windows / Windows PowerShell
cat ~/.ssh/id_rsa | clip
# macOS
pbcopy < ~/.ssh/id_rsa
# Linux
xclip -sel clip < ~/.ssh/id_rsa
# Windows
type %userprofile%\.ssh\id_rsa | clip
```

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
name: Release

on:
  push:
    tags:
      - 'v**'

jobs:
  release:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Setup node
        uses: actions/setup-node@v2
        with:
          node-version: '16'
          registry-url: https://registry.npmjs.org/

      - name: Cache ~/.pnpm-store
        uses: actions/cache@v2
        env:
          cache-name: cache-pnpm-store
        with:
          path: ~/.pnpm-store
          key: ${{ runner.os }}-${{ matrix.node-version }}-test-${{ env.cache-name }}-${{ hashFiles('**/pnpm-lock.yaml') }}
          restore-keys: |
            ${{ runner.os }}-${{ matrix.node-version }}-test-${{ env.cache-name }}-
            ${{ runner.os }}-${{ matrix.node-version }}-test-
            ${{ runner.os }}-
      - name: Setup pnpm
        uses: pnpm/action-setup@v2
        with:
          version: latest

      - name: Install deps
        run: pnpm i --frozen-lockfile

      - name: Build
        run: pnpm run build

      - name: Publish
        run: pnpm publish -r --access public --no-git-checks
        env:
          NODE_AUTH_TOKEN: ${{secrets.NPM_PUBLISH_TOKEN}}

      - run: npx changelogithub
        env:
          GITHUB_TOKEN: ${{secrets.GITHUB_TOKEN}}
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

## 阿里云

创建 `.github/workflows/deploy.yml`

```yml
name: deploy

on:
  push:
    branches:
      - master

jobs:
  deploy:
    runs-on: ubuntu-18.04
    steps:
      - name: Checkout Code
        uses: actions/checkout@v2

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

      - name: Deploy to aliyun server
        uses: easingthemes/ssh-deploy@v2.0.7
        env:
          SSH_PRIVATE_KEY: ${{ secrets.ALIYUN_SERVER_ACCESS_TOKEN }}
          ARGS: '-avz --delete'
          SOURCE: 'docs-dist/'
          REMOTE_HOST: ${{ secrets.ALIYUN_SERVER_HOST }}
          REMOTE_USER: 'root'
          TARGET: '/usr/share/nginx/html/notebook-javascript/'
```

- [添加工作流程状态徽章](https://docs.github.com/cn/actions/managing-workflow-runs/adding-a-workflow-status-badge)

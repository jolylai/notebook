---
title: 阿里云
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

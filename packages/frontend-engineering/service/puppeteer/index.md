# 概要

## 安装

因为经常安装不上，这里使用 cnpm 安装，速度比较快

```bash
$ npm install -g cnpm --registry=https://registry.npm.taobao.org
$ cnpm i puppeteer
```

## API

[文档](https://github.com/GoogleChrome/puppeteer/blob/v2.0.0/docs/api.md#puppeteer-api-v200)

```js
const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://example.com');
  await page.screenshot({ path: 'example.png' });

  await browser.close();
})();
```

## 默认设置

Puppeteer 默认为 headless mode 模式，设置为加载完整版，这样更利于开发和调试

```js
const browser = await puppeteer.launch({ headless: false }); // default is true
```

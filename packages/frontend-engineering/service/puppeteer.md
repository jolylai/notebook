---
title: puppeteer
---

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

# 文件处理

## 屏幕截图

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

## pdf

```js
const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://news.ycombinator.com', {
    waitUntil: 'networkidle2',
  });
  await page.pdf({ path: 'hn.pdf', format: 'A4' });

  await browser.close();
})();
```

# 模拟用户行为

## innerText

使用 `page.evaluate`

```js
let productsList = await page.evaluate(element => {
  const productsInnerList = element.querySelectorAll('.title-heading');
  const productsList = [];
  for (const el of productsInnerList) {
    productsList.push(el.innerText.trim());
    console.log(
      'Pushed product ' + el.innerText.trim() + ' into the product list',
    );
  }
  return productsList;
}, productsBox[0]);
```

Using elementHandle.\\\\\\\\\\\\$\$

```js
const productList = [];
const productsInnerList = await productsBox[0].$$('.title-heading');
for (const element of productsInnerList) {
  const innerText = await (await element.getProperty('innerText')).jsonValue();
  productList.push(innerText);
}
```

## 列子

```js
const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto('https://baidu.com');
  await page.type('#kw', 'puppeteer', { delay: 100 });
  page.click('#su');
  await page.waitFor(1000);
  const targetLink = await page.evaluate(() => {
    return [...document.querySelectorAll('.result a')]
      .filter(item => {
        return (
          item.innerText && item.innerText.includes('Puppeteer的入门和实践')
        );
      })
      .toString();
  });
  await page.goto(targetLink);
  await page.waitFor(1000);
  browser.close();
})();
```

## 输入

> [page.type(selector, text[, options])](https://github.com/GoogleChrome/puppeteer/blob/v2.0.0/docs/api.md#pagetypeselector-text-options)

模拟用户输入

```js
await page.type('#kw', 'puppeteer', { delay: 100 });
```

## 点击

> [page.click(selector[, options])](https://github.com/GoogleChrome/puppeteer/blob/v2.0.0/docs/api.md#pageclickselector-options)

```js
page.click('#su');
```

## 延时操作

```js
await page.waitFor(1000);
```

## 页面跳转

> [page.goto(url[, options])](https://github.com/GoogleChrome/puppeteer/blob/v2.0.0/docs/api.md#pagegotourl-options)

```js
await page.goto(targetLink);
```

## 页面上下文

> [page.evaluate](https://github.com/GoogleChrome/puppeteer/blob/v2.0.0/docs/api.md#pageevaluatepagefunction-args)

注入到页面上下文执行，并返回结果

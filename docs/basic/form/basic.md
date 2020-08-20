---
title: 基础
nav:
  title: 基础
  order: 2
group:
  title: 表单
---

## 数据初始化

- 本地初始化
- 异步请求接口初始化

## 效验

- 常用类型效验
- 自定义效验

## 基础知识

### 属性和方法

`HTMLFormElement` 列独有的属性和方法。

- `acceptCharset`:服务器能够处理的字符集;等价于 HTML 中的 accept-charset 特性。
- `action`:接受请求的 URL;等价于 HTML 中的 action 特性。
- `elements`:表单中所有控件的集合(HTMLCollection)。
- `enctype`:请求的编码类型;等价于 HTML 中的 enctype 特性。
- `length`:表单中控件的数量。
- `method`:要发送的 HTTP 请求类型，通常是"get"或"post";等价于 HTML 的 method 特性。
- `name`:表单的名称;等价于 HTML 的 name 特性。
- `reset`():将所有表单域重置为默认值。
- `submit`():提交表单。
- `target`:用于发送请求和接收响应的窗口名称;等价于 HTML 的 target 特性。

### 获取表单

```html
<form id="form1"></form>
```

```js
// 推荐  根据 id 获取
document.getElementById('form1');

// 不推荐
document.forms[0];
document.forms['form1'];
```

`document.forms` 可以取得页面中所有的表单。在这个集合中，可以通过数值索引或`name` 值来取得特定的表单

### 提交表单

<code src="./Demo/Submit.jsx" />

```html
<!-- 通用提交按钮 -->
<input type="submit" value="Submit Form" />

<!-- 自定义提交按钮 -->
<button type="submit">Submit Form</button>

<!-- 图像按钮 -->
<input type="image" src="graphic.gif" />
```

只要表单中存在上面列出的任何一种按钮，那么在相应表单控件拥有焦点的情况下，按回车键就可 以提交该表单。(textarea 是一个例外，在文本区中回车会换行。)如果表单里没有提交按钮，按回车 键不会提交表单

```js
var form = document.getElementById('myForm');
//提交表单
form.submit();
```

在以调用 `submit()` 方法的形式提交表单时，不会触发 `submit` 事件，因此要记得在调用此方法之 前先验证表单数据。

防止表单重复提交

- 在第一次提交表单后就禁用提交按钮
- 利用 `onsubmit` 事件处理程序取消后续的表单提交操作

### 重置表单

在重置表单时，所有表单字段都会恢复到页面刚加载完毕时的初 始值。如果某个字段的初始值为空，就会恢复为空;而带有默认值的字段，也会恢复为默认值。

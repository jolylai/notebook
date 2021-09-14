---
title: 基础
group:
  title: 表单
---

<code src="./demos/Login.jsx" />

## 数据初始化

- 本地初始化
- 异步请求接口初始化

## 效验

- 常用类型效验
- 自定义效验

## 属性和方法

`HTMLFormElement` 列独有的属性和方法。

| 属性/方法       | 描述                                                                     |
| --------------- | ------------------------------------------------------------------------ |
| `acceptCharset` | 服务器能够处理的字符集;等价于 HTML 中的 accept-charset 特性。            |
| `action`        | 接受请求的 URL;等价于 HTML 中的 action 特性。                            |
| `elements`      | 表单中所有控件的集合(HTMLCollection)。                                   |
| `enctype`       | 请求的编码类型;等价于 HTML 中的 enctype 特性。                           |
| `length`        | 表单中控件的数量。                                                       |
| `method`        | 要发送的 HTTP 请求类型，通常是"get"或"post";等价于 HTML 的 method 特性。 |
| `name`          | 表单的名称;等价于 HTML 的 name 特性。                                    |
| `reset`()       | 将所有表单域重置为默认值。                                               |
| `submit`()      | 提交表单。                                                               |
| `target`        | 用于发送请求和接收响应的窗口名称;等价于 HTML 的 target 特性。            |

## 获取表单

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

## 提交表单

<code src="./demos/Submit.jsx" />

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

## 重置表单

在重置表单时，所有表单字段都会恢复到页面刚加载完毕时的初 始值。如果某个字段的初始值为空，就会恢复为空;而带有默认值的字段，也会恢复为默认值。

## 表单字段

```html
<form method="post" id="myForm">
  <ul>
    <li><input type="radio" name="color" value="red" />Red</li>
    <li><input type="radio" name="color" value="green" />Green</li>
    <li><input type="radio" name="color" value="blue" />Blue</li>
    <button>button</button>
  </ul>
</form>
```

获取表单中的所有字段

```js
var form = document.getElementById('form1');
var fields = form.elements;
```

获取表单中的某个字段

```js
var form = document.getElementById('form1');
//取得表单中的第一个字段
var field1 = form.elements[0];
//取得名为"textbox1"的字段
var field2 = form.elements['textbox1'];
```

### 共有属性

- `disabled`:布尔值，表示当前字段是否被禁用。
- `form`:指向当前字段所属表单的指针;
- `name`:当前字段的名称。
- `readOnly`:布尔值，表示当前字段是否只读。
- `tabIndex`:表示当前字段的切换(tab)序号。
- `type`:当前字段的类型，如"checkbox"、"radio"，等等。
- `value`:当前字段将被提交给服务器的值。对文件字段来说，这个属性是只读的，包含着文件在计算机中的路径。

除了 `form` 属性之外，可以通过 `JavaScript` 动态修改其他任何属性。

```js
var form = document.getElementById('myForm');
var field = form.elements[0];
//修改 value 属性
field.value = 'Another value';
//检查 form 属性的值
alert(field.form === form);
//把焦点设置到当前字段
field.focus();
//禁用当前字段
field.disabled = true;
//true
//修改 type 属性(不推荐，但对<input>来说是可行的)
field.type = 'checkbox';
```

### 共有方法

每个表单字段都有两个方法:`focus()`和 `blur()`。

`focus()`方法用于将浏览器的焦点设置 到表单字段，即激活表单字段，使其可以响应键盘事件。

HTML5 为表单字段新增了一个 `autofocus` 属性。在支持这个属性的浏览器中，只要设置这个属性,不用 JavaScript 就能自动把焦点移动到相应字段。

```html
<input type="text" autofocus />
```

不支持 `autofocus` 属性的浏览器中可以在页面 加载完毕后，将焦点转移到表单中的第一个字段。为此，可以侦听页面的 load 事件，并在该事件发生 时在表单的第一个字段上调用 `focus()` 方法

```js
window.onload = function() {
  var form1 = document.getElementById('myForm');
  var nameField = form1.elements['name'];
  if (nameField.autofocus !== true) {
    nameField.focus();
    console.log('JS focus');
  }
};
```

`blur()`它的作用是从元素中移走焦点。在调用 blur()方法时， 并不会把焦点转移到某个特定的元素上;仅仅是将焦点从调用这个方法的元素上面移走而已。

```js
document.forms[0].elements[0].blur();
```

### 共有事件

- `blur`:当前字段失去焦点时触发。
- `change`:对于`<input>`和`<textarea>`元素，**在它们失去焦点且 value 值改变时触发**;对于`<select>`元素，在其选项改变时触发。
- `focus`:当前字段获得焦点时触发。

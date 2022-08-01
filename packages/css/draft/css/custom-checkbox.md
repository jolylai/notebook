# 自定义复选框

```css
main {
  padding: 10px;
}

input[type='checkbox'] {
  position: absolute;
  clip: rect(0, 0, 0, 0);
}

input[type='checkbox'] + label::before {
  content: '\a0';
  display: inline-block;
  width: 0.8em;
  height: 0.8em;
  line-height: 0.65;
  margin-right: 0.2em;
  border-radius: 0.2em;
  text-indent: 0.15em;
  background: silver;
}

input[type='checkbox']:checked + label::before {
  content: '\2713';
  background: yellowgreen;
}

input[type='checkbox']:focus + label::before {
  box-shadow: 0 0 0.1em 0.1em #58a;
}

input[type='checkbox']:disabled + label::before {
  background: gray;
  box-shadow: none;
  color: #555;
}
```

  <DemoBlock  demo='css-experience-custom-checkbox' />

::: tip

- 当 `<label>` 元素与复选框关联之后，也可以起到触发开关的作用。
- 添加生成性内容（伪元素），并基于复选框的状态来为其设置样式。
- 把真正的复选框隐藏起来（但不能把它从 tab 键切换焦点的队列中完全删除），再把生成性内容美化一番，用来顶替原来的复选框！
  :::

## 开关式按钮

```html
<main>
  <input type="checkbox" id="toggle-botton" />
  <label for="toggle-botton">自定义复选框</label>
</main>
```

```css
main {
  padding: 10px;
}

input[type='checkbox'] {
  position: absolute;
  clip: rect(0, 0, 0, 0);
}

input[type='checkbox'] + label {
  display: inline-block;
  padding: 0.3em 0.5em;
  background: #ccc;
  background-image: linear-gradient(#ddd, #bbb);
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 0.3em;
  box-shadow: 0 1px white inset;
  text-align: center;
  text-shadow: 0 1px 1px white;
}

input[type='checkbox']:checked + label,
input[type='checkbox']:active + label {
  box-shadow: 0.05em 0.1em 0.2em rgba(0, 0, 0, 0.6) inset;
  border-color: rgba(0, 0, 0, 0.3);
  background: #bbb;
}
```

  <DemoBlock  demo='css-experience-toggle-button' />

# 表单校验

::: demo

```html
<template>
  <form class="qz-form-validate">
    <p>
      <label>姓名</label>
      <input
        required
        pattern="^[\u4e00-\u9fa5]{1,10}$"
        placeholder="请输入您的姓名"
      />
    </p>
    <p>
      <label>手机</label>
      <input
        required
        pattern="^1[3456789]\d{9}$"
        placeholder="请输入您的手机号"
      />
    </p>
    <p>
      <label>简介</label>
      <textarea required placeholder="请输入简介"></textarea>
    </p>
  </form>
</template>
<script>
  export default {};
</script>
<style>
  .qz-form-validate {
    width: 500px;
  }
  .qz-form-validate label,
  .qz-form-validate input {
    display: block;
  }
  .qz-form-validate textarea,
  .qz-form-validate input {
    caret-color: blue;
    width: 100%;
    padding: 10px 20px;
    outline: none;
  }
  .qz-form-validate input,
  .qz-form-validate textarea {
    border: 1px solid #ccc;
  }
  .qz-form-validate input:valid,
  .qz-form-validate textarea:valid {
    border-color: green;
    box-shadow: inset 5px 0 0 green;
  }
  .qz-form-validate input:invalid,
  .qz-form-validate textarea:invalid {
    border-color: red;
    box-shadow: inset 5px 0 0 red;
  }
</style>
```

:::

使用 `required` `pattern` 校验表单输入的内容

```html
<input required pattern="^1[3456789]\d{9}$" placeholder="请输入您的手机号" />
```

使用伪类`:valid`和`:invalid`进行样式调整

```css
input:valid {
  /* 输入内容符合要求时的样式 */
}

input:invalid {
  /* 输入内容不符合要求时的样式 */
}
```

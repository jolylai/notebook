# 紧贴底部的页脚

> [flex](http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html)

```html
<div>
  <header>Header</header>
  <main>Main</main>
  <footer>Footer</footer>
</div>
```

```css
div {
  display: flex;
  flex-flow: column;

  min-height: 200px;
  background: yellowgreen;
}
main {
  flex: 1;
}
```

<DemoBlock  demo='css-layout-sticky-footer' />

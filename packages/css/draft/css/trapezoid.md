# 梯形

```css
main {
  margin: 10px;
  position: relative;
  display: inline-block;
  padding: 0.5em 1em 0.35em;
  color: white;
}
main::before {
  content: ''; /* 用伪元素来生成一个矩形 */
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: -1;
  background: #58a;
  transform: scaleY(1.3) perspective(0.5em) rotateX(5deg);
  transform-origin: bottom;
}
```

<DemoBlock demo='css-shape-trapezoid' />

```css
div {
  margin: 10px 0;
}

nav {
  padding-left: 1em;
}
a {
  position: relative;
  display: inline-block;
  padding: 0.3em 1em 0;
  color: inherit;
  text-decoration: none;
  margin: 0 -0.3em;
}
a::before {
  content: '';
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: -1;
  background: yellowgreen;
  transform: scale(1.1, 1.3) perspective(0.5em) rotateX(5deg);
  transform-origin: bottom;

  border: 1px solid orange;
  border-bottom: none;
  border-radius: 6px 6px 0 0;
}

main {
  border: 1px solid orange;
  padding: 10px;
  background: yellowgreen;
  margin-bottom: 10px;
}

.selected {
  z-index: 2;
}
.selected::before {
  margin-bottom: -1px;
}

.left > a::before {
  transform: scale(1.2, 1.3) perspective(0.5em) rotateX(5deg);
  transform-origin: bottom left;
}
.right {
  padding-left: 2em;
}
.right > a::before {
  transform: scale(1.2, 1.3) perspective(0.5em) rotateX(5deg);
  transform-origin: bottom right;
}
```

<DemoBlock demo='css-shape-trapezoid-tabs' />

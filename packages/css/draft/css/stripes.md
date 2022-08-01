# 条纹背景

> CSS 线性渐变，background-size

## 水平条纹

```css
ul {
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  padding: 0;
}

li {
  width: 100px;
  height: 80px;
  margin: 2px;
}

li:nth-child(1) {
  background: linear-gradient(yellowgreen, orange);
}

li:nth-child(2) {
  background: linear-gradient(yellowgreen 20%, orange 80%);
}

li:nth-child(3) {
  background: linear-gradient(yellowgreen 50%, orange 50%);
}

li:nth-child(4) {
  background: linear-gradient(yellowgreen 50%, orange 50%) no-repeat;
  background-size: 100% 30px;
}

li:nth-child(5) {
  background: linear-gradient(yellowgreen 50%, orange 50%);
  background-size: 100% 30px;
}

li:nth-child(6) {
  background: linear-gradient(yellowgreen 30%, orange 0);
  background-size: 100% 30px;
}
```

  <DemoBlock  demo='css-background-horizontal-stripes' />

::: tip

- 如果某个色标的位置值比整个列表中在它之前的色标的位置值都要
  小，则该色标的位置值会被设置为它前面所有色标位置值的最大值。(eg: li:nth-child(6))
  :::

## 垂直条纹

```css
ul {
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  padding: 0;
}

li {
  width: 100px;
  height: 80px;
  margin: 2px;
  border: 1px solid #eee;
}

li:nth-child(1) {
  background: linear-gradient(to right, yellowgreen 50%, orange 0) no-repeat;
  background-size: 30px 100%;
}

li:nth-child(2) {
  background: linear-gradient(to right, yellowgreen 50%, orange 0);
  background-size: 30px 100%;
}
```

  <DemoBlock  demo='css-background-vertical-stripes' />

::: tip

- top to bottom (默认值)
- to top
- to right
- to left
- to bottom right
  :::

## 斜向条纹

```css
ul {
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  padding: 0;
}

li {
  width: 90px;
  height: 90px;
  margin: 4px;
  box-shadow: 0 2px 6px 0 hsla(0, 0%, 0%, 0.2);
}

li:nth-child(1) {
  background: linear-gradient(
    45deg,
    yellowgreen 25%,
    orange 0,
    orange 50%,
    yellowgreen 0,
    yellowgreen 75%,
    orange 0
  );
  background-size: 30px 30px;
}

li:nth-child(2) {
  background: repeating-linear-gradient(
    60deg,
    yellowgreen 0,
    yellowgreen 15px,
    orange 15px,
    orange 30px
  );
}
```

  <DemoBlock  demo='css-background-diagonal-stripes' />

::: tip

- 虽然两种方式都能实现斜向条纹，但第二种方式能方便的实行各种角度的条纹
  :::

## 灵活的同色系条纹

```css
ul {
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  padding: 0;
}

li {
  width: 90px;
  height: 90px;
  margin: 4px;
  box-shadow: 0 2px 6px 0 hsla(0, 0%, 0%, 0.2);
}

li:nth-child(1) {
  background: repeating-linear-gradient(
    30deg,
    #79b,
    #79b 15px,
    #58a 0,
    #58a 30px
  );
}

li:nth-child(2) {
  background: #58a;
  background-image: repeating-linear-gradient(
    30deg,
    hsla(0, 0%, 100%, 0.1),
    hsla(0, 0%, 100%, 0.1) 15px,
    transparent 0,
    transparent 30px
  );
}
```

  <DemoBlock  demo='css-background-subtle-stripes' />

## 连续的图像边框

```css
ul {
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  padding: 0;
}

li {
  width: 90px;
  height: 90px;
  margin: 4px;
  box-shadow: 0 2px 6px 0 hsla(0, 0%, 0%, 0.2);
}

li:nth-child(1) {
  box-sizing: border-box;
  border: 10px solid transparent;
  background: linear-gradient(white, white) padding-box, url('http://csssecrets.io/images/stone-art.jpg')
      border-box 0 / cover;
}

li:nth-child(2) {
  width: 180px;
  box-sizing: border-box;
  border: 10px solid transparent;
  background: linear-gradient(white, white) padding-box, repeating-linear-gradient(
        -45deg,
        red 0,
        red 12.5%,
        transparent 0,
        transparent 25%,
        #58a 0,
        #58a 37.5%,
        transparent 0,
        transparent 50%
      ) 0 / 5em 5em;
}

li:nth-child(3) {
  box-sizing: border-box;
  border: 1px solid transparent;
  background: linear-gradient(white, white) padding-box, repeating-linear-gradient(
        -45deg,
        black 0,
        black 25%,
        white 0,
        white 50%
      ) 0 / 0.6em 0.6em;
  animation: ants 12s linear infinite;
}

li:nth-child(4) {
  box-sizing: border-box;
  border-top: 0.2em solid transparent;
  border-image: 100% 0 0 linear-gradient(90deg, currentColor 4em, transparent 0);
}

@keyframes ants {
  to {
    background-position: 100%;
  }
}
```

  <DemoBlock  demo='css-background-continuous-borders' />

::: tip

- background 的简写

```
background:
  [background-color]
  [background-image]
  [background-repeat]
  [background-attachment]
  [background-position] / [background-size]
  [background-origin]
  [background-clip];
```

- 上面的例子
  ```css
  background: linear-gradient(white, white) padding-box, url('http://csssecrets.io/images/stone-art.jpg')
      border-box 0 / cover;
  ```

:::

# 菱形

## 基于变形

```html
<main><img src="http://csssecrets.io/images/adamcatlace.jpg" /></main>
```

```css
main {
  width: 400px;
  margin: 90px auto;
  transform: rotate(45deg);
  overflow: hidden;
}
img {
  /* 我们希望图片的尺寸属性保留 100% 这个值，这样当浏览器不支持变
  形样式时仍然可以得到一个合理的布局。 */
  max-width: 100%;
  transform: rotate(-45deg) scale(1.46);
}
```

  <DemoBlock  demo='css-shape-diamond-images' />

## 裁切路径

```css
img {
  clip-path: polygon(50% 0, 100% 50%, 50% 100%, 0 50%);
  transition: 1s clip-path;
}
img:hover {
  clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
}
```

  <DemoBlock  demo='css-shape-diamond-clip' />

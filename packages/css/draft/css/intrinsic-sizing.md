# 自适应内部元素

```html
<main>
  <p>
    Let’s assume we have some text here. Bacon ipsum dolor sit amet turkey
    veniam shankle, culpa short ribs kevin t-bone occaecat.
  </p>
  <figure>
    <img src="http://csssecrets.io/images/adamcatlace.jpg" />
    <figcaption>
      The great Sir Adam Catlace was named after Countess Ada Lovelace, the
      first programmer ever.
    </figcaption>
  </figure>
  <p>
    We also have some more text here. Et laborum venison nostrud, ut veniam sint
    kielbasa ullamco pancetta.
  </p>
</main>
```

```css
figure {
  max-width: 400px;
  max-width: min-content;
  margin: auto;
}

figure > img {
  max-width: inherit;
}
```

  <DemoBlock  demo='css-layout-intrinsic-sizing' />

::: tip
`min-content` 解析为这个容器内部最大的不可断行元素的宽度（即最宽的单词、图片或具有固定宽度的盒元素）
:::

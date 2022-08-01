# 通过阴影来弱化背景

```html
<main>
  <div class="lightbox">CSS NoteBook</div>
  <div class="mask" />
  <p>
    Bacon ipsum dolor amet consectetur short loin ut tri-tip alcatra ground
    round jowl beef meatloaf in pork. Elit chicken ea spare ribs. Shank
    andouille ex boudin picanha turkey esse. Do doner fugiat tongue.
  </p>
</main>
```

```css
main {
  height: 300px;
  position: relative;
  overflow: hidden;
}
.mask {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
}
.lightbox {
  color: #fff;
  background: yellowgreen;
  padding: 10px;
  border-radius: 2px;

  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
}
```

  <DemoBlock  demo='css-experience-shadow-weaken-background' />

::: tip

- 需要额外的元素，但交互性好，比如点击蒙层关闭
- 当使用一个独立的元素（或伪元素）来实现遮罩层时，这个遮罩
  层不仅可以从视觉上把用户的注意力引导到关键元素上，还可以防止用户的
  鼠标与页面的其他部分发生交互，因为遮罩层会捕获所有指针事件。
  :::

## box-shadow

```html
<main>
  <div>CSS NoteBook</div>
  <p>
    Bacon ipsum dolor amet consectetur short loin ut tri-tip alcatra ground
    round jowl beef meatloaf in pork. Elit chicken ea spare ribs. Shank
    andouille ex boudin picanha turkey esse. Do doner fugiat tongue.
  </p>
</main>
```

```css
main {
  height: 300px;
  position: relative;
  overflow: hidden;
}

div {
  color: #fff;
  background: yellowgreen;
  padding: 10px;
  border-radius: 2px;

  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 0 0 0 50vmax rgba(0, 0, 0, 0.6);
}
```

  <DemoBlock  demo='css-experience-shadow-weaken-background2' />

::: tip

- 1vmax 相当于 1vw 和 1vh 两者中的较大值
- 当我们
  滚动页面时，遮罩层的边缘就露出来了，除非给它加上 position: fixed;

- `box-shadow`只能在视觉上起到引导注意力的作用，却
  无法阻止鼠标交互。
  :::

## backdrop

```html
<main>
  <button onclick="document.querySelector('#modal').showModal()">
    Click me
  </button>
  <dialog id="modal">
    CSS NoteBook <button onclick="this.parentNode.close()">Close</button>
  </dialog>
</main>
```

```css
main {
  padding: 10px;
}

dialog::backdrop {
  background: rgba(0, 0, 0, 0.8);
}
```

  <DemoBlock  demo='css-experience-shadow-weaken-background3' />

::: tip

- 浏览器对它的支持还极为有限。
  :::

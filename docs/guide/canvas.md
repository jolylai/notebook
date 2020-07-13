---
title: Canvas
---

```js
const canvas = document.getElementById('certificatecanvas');
const img = document.createElement('img');
img.src = coverImage;
img.onload = () => {
  canvas.height = (img.height / img.width) * canvas.width;
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  ctx.fillStyle = fontColor;
  ctx.font = `${fontSize}px "${fontName}"`;
  ctx.textBaseline = 'top';
  ctx.fillText('Text', xaxis || 0, yaxis || 0);
};
img.onabort = () => {};
```

# 代理模式

## 代理

```js
const obj = { a: 1 };

const handlers = {
  get(target, key, context) {
    console.log("accessing:", key);
    return Reflect.get(target, key, context);
  }
};

pobj = new Proxy(obj, handlers);

obj.a; // 1

pobj.a;
// accessing: a
//  1
```

## 可取消代理

```js
const obj = { a: 1 };

const handlers = {
  get(target, key, context) {
    console.log("accessing:", key);
    return Reflect.get(target, key, context);
  }
};

const { proxy: pobj, revoke: prevoke } = Proxy.revocable(obj, handlers);

console.log(pobj.a);
// 1
prevoke();
console.log(pobj.a);
// Uncaught TypeError: Cannot perform 'get' on a proxy that has been revoked
```

```js
const myImage = (function() {
  const imgNode = document.createElement("img");
  document.body.appendChild(imgNode);
  return {
    setSrc: function(src) {
      imgNode.src = src;
    }
  };
})();

const pImg = (function() {
  const img = new Image();
  img.onload = function() {
    myImage.setSrc(this.src);
  };
  return {
    setSrc: function(src) {
      myImage.setSrc(path.join(__dirname, "loading.jpg"));
      img.src = src;
    }
  };
})();

pImg.setSrc("https://i.loli.net/2019/12/08/piVAzhkHn8g9yS6.jpg");
```

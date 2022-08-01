# 媒体

> dispaly: table-cell

::: demo

```html
<template>
  <div>
    <div class="bs-media">
      <div class="bs-media-left">
        <a href="#">
          <img
            class="media-object"
            data-src="holder.js/64x64"
            alt="64x64"
            src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9InllcyI/PjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgcHJlc2VydmVBc3BlY3RSYXRpbz0ibm9uZSI+PCEtLQpTb3VyY2UgVVJMOiBob2xkZXIuanMvNjR4NjQKQ3JlYXRlZCB3aXRoIEhvbGRlci5qcyAyLjYuMC4KTGVhcm4gbW9yZSBhdCBodHRwOi8vaG9sZGVyanMuY29tCihjKSAyMDEyLTIwMTUgSXZhbiBNYWxvcGluc2t5IC0gaHR0cDovL2ltc2t5LmNvCi0tPjxkZWZzPjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+PCFbQ0RBVEFbI2hvbGRlcl8xNmY4MDMwZWJlYiB0ZXh0IHsgZmlsbDojQUFBQUFBO2ZvbnQtd2VpZ2h0OmJvbGQ7Zm9udC1mYW1pbHk6QXJpYWwsIEhlbHZldGljYSwgT3BlbiBTYW5zLCBzYW5zLXNlcmlmLCBtb25vc3BhY2U7Zm9udC1zaXplOjEwcHQgfSBdXT48L3N0eWxlPjwvZGVmcz48ZyBpZD0iaG9sZGVyXzE2ZjgwMzBlYmViIj48cmVjdCB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIGZpbGw9IiNFRUVFRUUiLz48Zz48dGV4dCB4PSIxMy40NjA5Mzc1IiB5PSIzNi41Ij42NHg2NDwvdGV4dD48L2c+PC9nPjwvc3ZnPg=="
            data-holder-rendered="true"
            style="width: 64px; height: 64px;"
          />
        </a>
      </div>
      <div class="bs-media-body">
        <h4 class="bs-media-headering">Header</h4>
        Velit et in mollit fugiat consectetur quis officia do.
      </div>
    </div>
    <div class="bs-media">
      <div class="bs-media-body">
        <h4 class="bs-media-headering">Header</h4>
        Anim mollit tempor amet elit tempor do veniam dolor est consequat.
        Consectetur ullamco voluptate in velit velit duis. In officia
        adipisicing nostrud ipsum aliquip non ut. Id Lorem aliquip aliquip in
        duis excepteur aute in fugiat non adipisicing proident aute id. Eu id
        aliquip voluptate nisi sit in esse irure eu sit incididunt tempor.
      </div>
      <div class="bs-media-right">
        <a href="#">
          <img
            alt="64x64"
            src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9InllcyI/PjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgcHJlc2VydmVBc3BlY3RSYXRpbz0ibm9uZSI+PCEtLQpTb3VyY2UgVVJMOiBob2xkZXIuanMvNjR4NjQKQ3JlYXRlZCB3aXRoIEhvbGRlci5qcyAyLjYuMC4KTGVhcm4gbW9yZSBhdCBodHRwOi8vaG9sZGVyanMuY29tCihjKSAyMDEyLTIwMTUgSXZhbiBNYWxvcGluc2t5IC0gaHR0cDovL2ltc2t5LmNvCi0tPjxkZWZzPjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+PCFbQ0RBVEFbI2hvbGRlcl8xNmY4MDMxMGE4NSB0ZXh0IHsgZmlsbDojQUFBQUFBO2ZvbnQtd2VpZ2h0OmJvbGQ7Zm9udC1mYW1pbHk6QXJpYWwsIEhlbHZldGljYSwgT3BlbiBTYW5zLCBzYW5zLXNlcmlmLCBtb25vc3BhY2U7Zm9udC1zaXplOjEwcHQgfSBdXT48L3N0eWxlPjwvZGVmcz48ZyBpZD0iaG9sZGVyXzE2ZjgwMzEwYTg1Ij48cmVjdCB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIGZpbGw9IiNFRUVFRUUiLz48Zz48dGV4dCB4PSIxMy40NjA5Mzc1IiB5PSIzNi41Ij42NHg2NDwvdGV4dD48L2c+PC9nPjwvc3ZnPg=="
            style="width: 64px; height: 64px;"
          />
        </a>
      </div>
    </div>
  </div>
</template>
<script>
  export default {};
</script>
<style>
  .bs-media {
    overflow: hidden;
    zoom: 1;
    margin-top: 15px;
  }
  .bs-media img {
    max-width: initial !important;
  }
  .bs-media-left,
  .bs-media-body,
  .bs-media-right {
    display: table-cell;
    vertical-align: top;
  }
  .bs-media-left {
    padding-right: 10px;
  }
  .bs-media-right {
    padding-left: 10px;
  }
  .bs-media-body {
    width: 10000px;
  }
  .bs-media-headering {
    margin-top: 0;
    margin-bottom: 5px;
  }
</style>
```

:::

## 两栏自适应布局

![](https://cy-picgo.oss-cn-hangzhou.aliyuncs.com/table-cell.png)

如上图左右两边等高，其实可以看成是列表一样的布局，核心 css 代码如下

```css
.left,
.right {
  display: table-cell;
  /* 控制内容的对齐方式 top middle bottom */
  vertical-align: top;
}
```

文字部分需要沾满容器的剩余空间，我们只需要设置其宽度为 `width: 99999px`

左边使用浮动 `float: left`，右边使用 `display: table-cell` 同样能达到上边一样的布局，如下

::: demo

```html
<template>
  <div>
    <div class="bs-media">
      <div class="bs-media-float-left">
        <a href="#">
          <img
            class="media-object"
            data-src="holder.js/64x64"
            alt="64x64"
            src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9InllcyI/PjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgcHJlc2VydmVBc3BlY3RSYXRpbz0ibm9uZSI+PCEtLQpTb3VyY2UgVVJMOiBob2xkZXIuanMvNjR4NjQKQ3JlYXRlZCB3aXRoIEhvbGRlci5qcyAyLjYuMC4KTGVhcm4gbW9yZSBhdCBodHRwOi8vaG9sZGVyanMuY29tCihjKSAyMDEyLTIwMTUgSXZhbiBNYWxvcGluc2t5IC0gaHR0cDovL2ltc2t5LmNvCi0tPjxkZWZzPjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+PCFbQ0RBVEFbI2hvbGRlcl8xNmY4MDMwZWJlYiB0ZXh0IHsgZmlsbDojQUFBQUFBO2ZvbnQtd2VpZ2h0OmJvbGQ7Zm9udC1mYW1pbHk6QXJpYWwsIEhlbHZldGljYSwgT3BlbiBTYW5zLCBzYW5zLXNlcmlmLCBtb25vc3BhY2U7Zm9udC1zaXplOjEwcHQgfSBdXT48L3N0eWxlPjwvZGVmcz48ZyBpZD0iaG9sZGVyXzE2ZjgwMzBlYmViIj48cmVjdCB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIGZpbGw9IiNFRUVFRUUiLz48Zz48dGV4dCB4PSIxMy40NjA5Mzc1IiB5PSIzNi41Ij42NHg2NDwvdGV4dD48L2c+PC9nPjwvc3ZnPg=="
            data-holder-rendered="true"
            style="width: 64px; height: 64px;"
          />
        </a>
      </div>
      <div class="bs-media-body">
        <h4 class="bs-media-headering">Header</h4>
        Velit et in mollit fugiat consectetur quis officia do.
      </div>
    </div>
  </div>
</template>
<script>
  export default {};
</script>
<style>
  .bs-media-float-left {
    float: left;
    padding-right: 10px;
  }
</style>
```

:::

## 更多

[我所知道的几种 display:table-cell 的应用](https://www.zhangxinxu.com/wordpress/2010/10/%e6%88%91%e6%89%80%e7%9f%a5%e9%81%93%e7%9a%84%e5%87%a0%e7%a7%8ddisplaytable-cell%e7%9a%84%e5%ba%94%e7%94%a8/)

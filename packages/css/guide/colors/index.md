---
title: 色彩体系
---

## 品牌色

品牌色是体现产品特性和传播理念最直观的视觉元素之一。在色彩选取时，需要先明确品牌色在界面中的使用场景及范围。在基础色板中选择主色，我们建议选择色板从浅至深的第六个颜色作为主色。 Ant Design 的品牌色取自基础色板的蓝色，Hex 值为 #1890FF，应用场景包括：关键行动点，操作状态、重要信息高亮，图形化等场景。

<code src='./demos/Palette.jsx' />

```css
:root {
  --color-primary: #1890ff;
  --color-primary-hover: #40a9ff;
  --color-primary-active: #096dd9;
  --color-primary-outline: rgba(24, 144, 255, 0.2);
  --color-primary-1: #e6f7ff;
  --color-primary-2: #bae7ff;
  --color-primary-3: #91d5ff;
  --color-primary-4: #69c0ff;
  --color-primary-5: #40a9ff;
  --color-primary-6: #1890ff;
  --color-primary-7: #096dd9;
}
```

## 功能色

功能色代表了明确的信息以及状态，比如成功、出错、失败、提醒、链接等。功能色的选取需要遵守用户对色彩的基本认知。

#### 成功

```css
:root {
  --color-success: #52c41a;
  --color-success-hover: #73d13d;
  --color-success-active: #389e0d;
  --color-success-outline: rgba(82, 196, 26, 0.2);
  --color-success-bg: #f6ffed;
  --color-success-border: #b7eb8f;
}
```

#### 出错

```css
:root {
  --color-error: #ff4d4f;
  --color-error-hover: #ff7875;
  --color-error-active: #d9363e;
  --color-error-outline: rgba(255, 77, 79, 0.2);
  --color-error-bg: #fff2f0;
  --color-error-border: #ffccc7;
}
```

#### 提醒

```css
:root {
  --color-warning: #faad14;
  --color-warning-hover: #ffc53d;
  --color-warning-active: #d48806;
  --color-warning-outline: rgba(250, 173, 20, 0.2);
  --color-warning-bg: #fffbe6;
  --color-warning-border: #ffe58f;
}
```

```css
// Colors
$color-success: () !default;
$color-success: map.deep-merge(
  (
    'base': #67c23a,
    'hover': #73d13d,
    'active': #389e0d,
    'outline': rgba(82, 196, 26, 0.2),
    'bg': #f6ffed,
    'border': #b7eb8f
  ),
  $color-success
);

$color-info: () !default;
$color-info: map.deep-merge(
  (
    'base': #1890ff,
    'bg': #e6f7ff,
    'border': #91d5ff
  ),
  $color-info
);

$color-warning: () !default;
$color-warning: map.deep-merge(
  (
    'base': #faad14,
    'hover': #ffc53d,
    'active': #d48806,
    'outline': rgba(250, 173, 20, 0.2),
    'bg': #fffbe6,
    'border': #ffe58f
  ),
  $color-warning
);

$color-error: () !default;
$color-error: map.deep-merge(
  (
    'base': #ff4d4f,
    'hover': #ff7875,
    'active': #d9363e,
    'outline': rgba(255, 77, 79, 0.2),
    'bg': #fff2f0,
    'border': #ffccc7
  ),
  $color-error
);
```

## 中性色

中性色包含了黑、白、灰，被大量的应用在界面的文字部分，此外背景、边框、分割线等场景中也非常常见。合理地选择中性色能够令页面信息具备良好的主次关系，助力阅读体验。

```css
@mixin set-css-var-value($name, $value) {
  #{joinVarName($name)}: #{$value};
}

@mixin set-css-color-type($colors, $type) {
  @include set-css-var-value(('color', $type), map.get($colors, $type, 'base'));

  @each $i in (3, 5, 7, 8, 9) {
    @include set-css-var-value(
      ('color', $type, 'light', $i),
      map.get($colors, $type, 'light-#{$i}')
    );
  }
}
```

```css
:root {
  @each $type in (primary, success, warning, danger, error, info) {
    @include set-css-color-type($colors, $type);
  }
}
```

<!-- <palette :color="{ name: 'gold', count: 13 }" /> -->

- [zhongguose](http://zhongguose.com/#jianniaolan)
- [coolors](https://coolors.co/palettes/trending)
- [colors](https://ant-design.gitee.io/docs/spec/colors-cn)

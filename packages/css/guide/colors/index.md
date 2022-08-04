---
title: 色彩体系
---

<code src='./demos/Palette.jsx' inline />

## 品牌色

品牌色是体现产品特性和传播理念最直观的视觉元素之一。在色彩选取时，需要先明确品牌色在界面中的使用场景及范围。在基础色板中选择主色，我们建议选择色板从浅至深的第六个颜色作为主色。

```css
:root {
  --color-primary-1: #e6f7ff;
  --color-primary-2: #bae7ff;
  --color-primary-3: #91d5ff;
  --color-primary-4: #69c0ff;
  --color-primary-5: #40a9ff;
  --color-primary-6: #1890ff;
  --color-primary-7: #096dd9;
  --color-primary-8: #0050b3;
  --color-primary-9: #003a8c;
  --color-primary-10: #002766;
}
```

Ant Design 的品牌色取自基础色板的蓝色，Hex 值为 #1890FF，应用场景包括：关键行动点，操作状态、重要信息高亮，图形化等场景。

```css
:root {
  --color-primary: #1890ff;
  --color-primary-hover: #40a9ff;
  --color-primary-active: #096dd9;
  --color-primary-outline: rgba(24, 144, 255, 0.2);
}
```

## 功能色

功能色代表了明确的信息以及状态，比如成功、出错、失败、提醒、链接等。功能色的选取需要遵守用户对色彩的基本认知。

<code src='./demos/AlertColor.jsx' inline />

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

## 中性色

中性色包含了黑、白、灰，被大量的应用在界面的文字部分，此外背景、边框、分割线等场景中也非常常见。合理地选择中性色能够令页面信息具备良好的主次关系，助力阅读体验。

- [zhongguose](http://zhongguose.com/#jianniaolan)
- [coolors](https://coolors.co/palettes/trending)
- [colors](https://ant-design.gitee.io/docs/spec/colors-cn)

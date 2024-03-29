---
title: RegExp
---

## 前言

**正则表达式是匹配模式，要么匹配字符，要么匹配位置。**

| 字符组 | 具体含义                                                                                      | 记忆方式                                                            |
| ------ | --------------------------------------------------------------------------------------------- | ------------------------------------------------------------------- |
| \d     | 表示 [0-9]。表示是一位数字。                                                                  | 其英文是 digit(数字)。                                              |  | \D | 表示 [^0-9]。表示除数字外的任意字符。 |
| \w     | 表示 [0-9a-zA-Z_]。表示数字、大小写字母和下划线。                                             | w 是 word 的简写，也称单词字符。                                    |
| \W     | 表示 [^0-9a-za-z_]。非单词字符。                                                              |
| \s     | 表示 [ \t\v\n\r\f]。表示空白符，包括空格、水平制表符、垂直制表符、换行符、回车符、换页 符。   | s 是 space 的首字母，空白符的单词是 white space。                   |
| \S     | 表示 [^ \t\v\n\r\f]。 非空白符。                                                              |
| .      | 表示 [^\n\r\u2028\u2029]。通配符，表示几乎任意字符。换行符、回车符、行分隔符和段分隔符 除外。 | 想想省略号 ... 中的每个点，都可以理解成占位符，表示任何类似的东西。 |

## 位置匹配

<code src="./demos/NumberFormat.jsx" />

| 锚  | Description                                                                                 |
| --- | ------------------------------------------------------------------------------------------- |
| ^   | 匹配开头，在多行匹配中匹配行开头。                                                          |
| \$  | 匹配结尾，在多行匹配中匹配行结尾。                                                          |
| \b  | 单词边界，具体就是 \w 与 \W 之间的位置，也包括 \w 与 ^ 之间的位置，和 \w 与 \$ 之间的位置。 |

#### ^ 和 \$

`^`(脱字符)匹配开头，在多行匹配中匹配行开头。

`$`(美元符号)匹配结尾，在多行匹配中匹配行结尾。

```js
'I hate RegExp'.replace(/^|$/g, '#');
// "#I hate RegExp#"
```

#### `\b` 和 `\B`

`\b` 是单词边界，具体就是 `\w`与`\W` 之间的位置，也包括 `\w` 与 `^` 之间的位置，和 `\w` 与 `$` 之间的位置。

```js
'I hate RegExp'.replace(/\b/g, '#');
// '#I# #hate# #RegExp#';
```

首先，我们知道，`\w` 是字符组 `[0-9a-zA-Z_]` 的简写形式，即 `\w` 是字母数字或者下划线的中任何一个字
符。而 `\W` 是排除字符组 `[^0-9a-za-z_]` 的简写形式，即 `\W` 是 `\w` 以外的任何一个字符。

#### `(?=p)` 和 `(?!p)`

/\d{3}/g

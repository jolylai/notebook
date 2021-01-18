---
title: Git
---

## 提交规范

### 格式

```
<Header>

<Body>

<Footer>
```

良好的代码提交记录能很快的看出每次你提交的代码都做了哪些的修改

```
feat: 添加了分享功能

给每篇博文添加了分享功能

- 添加分享到微博功能
- 添加分享到微信功能
- 添加分享到朋友圈功能

Issue #1, #2
Close #1
```

### Header ⭐️

提交类型

- `feat`: 新功能、新特性
- `fix`: 修改 bug
- `perf`: 更改代码，以提高性能
- `refactor`: 代码重构（重构，在不影响代码内部行为、功能下的代码修改）
- `docs`: 文档修改
- `style`: 代码格式修改, 注意不是 css 修改（例如分号修改）
- `test`: 测试用例新增、修改
- `build`: 影响项目构建或依赖项修改
- `revert`: 恢复上一次提交
- `ci`: 持续集成相关文件修改
- `chore`: 其他修改（不在上述类型中的修改）
- `release`: 发布新版本
- `workflow`: 工作流相关文件修改

- [Gitmoji](https://gitmoji.carloscuesta.me/)
- [commitizen](https://github.com/commitizen/cz-cli)

### Body

Body 部分是对本次 commit 的详细描述，可以分成多行。

### Footer

Footer 部分只用于两种情况：

- 关联 Issue
- 关闭 Issue

## CHANGELOG

规范的 Git 提交历史，还可以直接生成项目发版的 CHANGELOG[semantic-release](https://github.com/semantic-release/semantic-release)

## 配置

```bash
git config --global user.name <your name>
git config --global user.email <your_email@example.com>
git config --global push.default simple
git config --global core.quotepath false
git config --global core.editor /usr/bin/vim
git config --global credential.helper store
git config --global credential.helper wincred
git config --global core.ignorecase false
# 设置大小写敏感，保持 Mac/Win/Linux一致性；在目录名大小写修改时，git可正常提交；
git config --global core.ignorecase false
```

#### 参考文章

- [Commit 规范](https://yanhaijing.com/git/2016/02/17/my-commit-message/)
- [Git 提交规范](https://zhuanlan.zhihu.com/p/67804026)
- [图解 git](https://dev.to/lydiahallie/cs-visualized-useful-git-commands-37p1)
- [commitizen](https://github.com/commitizen/cz-cli)

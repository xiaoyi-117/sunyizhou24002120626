# AGENTS.md - 课程 web 项目

## 项目概述

这是一个静态网页课程设计项目，包含 HTML/CSS/JavaScript 练习题和实战作品集。无构建系统、无依赖、无测试框架。

## 文件结构

- **`index.html`** - 主目录/作品集页面，列出所有章节的链接
- **`1.html`, `2.html`** - 具体练习页面（Flex复习、SVG图标等）
- **`fun.html`** - 数字猜谜游戏练习
- **`date.html`, `js.html`, `obj.html`** - JavaScript 知识点练习
- **`font/`** - 字体图标资源（iconfont.woff2, .woff, .ttf 等）
- **`SKILL/frontend-design/SKILL.md`** - 前端设计指南

## 运行方式

- 直接在浏览器中打开 `.html` 文件即可查看（`file://` 协议）
- 不需要任何构建命令、 npm 脚本或本地服务器

## 常见编辑情境

- 添加新练习：在 `index.html` 的 `.card-wrap` 中添加 `.card-item`，链接到新 HTML 文件
- 修改样式：所有 CSS 都内联在各 `.html` 文件中的 `<style>` 标签中
- 新增字体图标：将文件放入 `font/` 目录，或在 HTML 中引用外部字体库

## 编码规范

### 新建 HTML 文件注释

每次新建 HTML 文件时，必须在 `<!DOCTYPE html>` 之后、`<html>` 标签之前加入注释，内容包括以下四项，缺一不可：

```html
<!DOCTYPE html>
<!--
  作者：孙溢周
  建立时间：YYYY-MM-DD（填写实际创建日期）
  使用大模型：GLM-5.3-Flash（填写本次实际使用的大模型名称）
  功能名称：XX 练习 / XX 功能（填写本页面的功能名称）
-->
<html lang="zh-CN">
```

### JavaScript 函数注释

HTML 中 `<script>` 部分的每个函数，必须在函数定义上方添加注释，说明该函数主要实现的功能：

```javascript
// 函数功能：生成 1-100 之间的随机整数
function getRandom() {
  return Math.floor(Math.random() * 100) + 1;
}
```

- 函数功能有变化时，同步更新对应注释
- 简单的变量赋值不需要注释，只注释函数

### 命名规范

从现在开始，项目中的所有命名必须带 `syz_` 前缀：

- CSS 类名：如 `syz_box`、`syz_card-item`
- CSS/HTML 的 id 名：如 `syz_container`
- JavaScript 变量名：如 `syz_count`、`syz_timer`
- 该规则适用于新建代码；修改旧代码时，被改动的命名也一并加上前缀

### 首页入口链接

所有新建的 HTML 文件，页面中必须加入指向首页 `index.html` 的超链接入口：

```html
<a class="syz_back-home" href="index.html">返回首页</a>
```

- 位置放在页面顶部导航或底部，类名遵循 `syz_` 前缀命名规范
- `index.html` 自身为首页，无需添加
- 相对路径直接用 `index.html`（项目为扁平结构，均在根目录）

### 提示词记录（syz_prompt.md）

从现在开始，用户发出的每一条提示词，都必须在执行之前写入项目根目录的 `syz_prompt.md`，规则如下：

- 以追加方式写入，不覆盖之前的内容（文件已存在时，先 Read 全文，再在末尾续写后整体 Write，避免覆盖；不用 PowerShell Add-Content，防止中文乱码）
- 每条记录包括三项：时间（执行时刻，可用 `Get-Date -Format "yyyy-MM-dd HH:mm:ss"` 获取）、使用的模型、提示词内容（原文）
- 格式：

```markdown
## YYYY-MM-DD HH:mm:ss
- 使用模型：GLM-5.3-Flash（写实际使用的模型）
- 提示词内容：

> 用户提示词原文，用引用格式
```

## 注意事项

- 该项目为学习用途，代码直接在浏览器中运行
- 无 lint、typecheck、test 或 deploy 流程
- `SKILL/frontend-design/SKILL.md` 独立于网页练习，提供设计原则参考
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

## 注意事项

- 该项目为学习用途，代码直接在浏览器中运行
- 无 lint、typecheck、test 或 deploy 流程
- `SKILL/frontend-design/SKILL.md` 独立于网页练习，提供设计原则参考
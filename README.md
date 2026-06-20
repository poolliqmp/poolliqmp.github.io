# OpenClaw 博客操作指南

## 📁 项目位置

```
C:\Users\Administrator\.openclaw\workspace\openclaw-blog\
```

## 🔧 常用命令

```bash
cd openclaw-blog

# 新建文章（标题用英文）
hexo new post 文章标题

# 新建页面
hexo new page 页面名

# 本地预览
hexo clean && hexo generate && hexo server

# 仅生成静态文件（不启动服务）
hexo clean && hexo generate

# 停止服务器
Ctrl+C
```

## 📝 写文章流程

1. 运行 `hexo new post 文章标题`
2. 编辑 `source/_posts/文章标题.md`
3. 预览：运行 `hexo clean && hexo generate && hexo server`
4. 确认无误后，生成静态文件：`hexo clean && hexo generate`
5. 部署到 GitHub Pages（见下方）

## 🎨 文章 Front Matter 格式

```yaml
---
title: 文章标题
date: 2026-06-13
tags: [标签1, 标签2]
categories: [分类]
---

正文内容（Markdown 格式）
```

## 🚀 部署到 GitHub Pages

### 第一步：创建 GitHub 仓库

1. 登录 [GitHub](https://github.com)
2. 创建新仓库：`username.github.io`（username 替换为你的 GitHub 用户名）
3. 记录仓库地址：`https://github.com/username/username.github.io.git`

### 第二步：安装部署插件

```bash
cd openclaw-blog
npm install hexo-deployer-git --save
```

### 第三步：配置 _config.yml

在 `_config.yml` 末尾找到 `deploy:` 部分，修改为：

```yaml
deploy:
  type: git
  repo: https://github.com/username/username.github.io.git
  branch: main
```

### 第四步：部署

```bash
hexo clean && hexo generate && hexo deploy
```

首次部署会要求输入 GitHub 用户名和 Token（用 Personal Access Token，不要密码）。

### 生成 GitHub Token
1. GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. 点击 Generate new token
3. 勾选 `repo` 权限
4. 复制 token 备用

## 📊 多平台同步

生成静态文件后，`public/` 目录就是完整的网站：

| 平台 | 同步方式 |
|------|---------|
| Vercel | 导入 GitHub 仓库自动部署 |
| Cloudflare Pages | 导入 GitHub 仓库 |
| Netlify | 导入 GitHub 仓库 |
| 其他 | 直接上传 `public/` 目录 |

## ⚠️ 注意事项

- 中文文件名可能有问题，文章标题用英文
- 部署前务必本地预览确认
- 使用 GitHub Personal Access Token，不要用密码
- 保持 `_config.yml` 中的敏感信息不在 Git 中泄露

# 如何发布新文章

## 流程（超简单）

1. **复制模板**：复制 `06/13/jade-peace-button/index.html` 为新文件夹
2. **改内容**：修改标题、摘要、日期、链接
3. **更新首页**：在 `index.html` 的 `posts-grid` 里加一个新卡片
4. **提交推送**：
   ```bash
   cd C:\Users\Administrator\.openclaw\workspace\poolliqmp.github.io
   git add -A
   git commit -m "新增文章：XXX"
   git push origin master
   ```

## 注意事项

- **不要碰 css/ 和 js/ 目录**，里面是样式文件
- **不要动 index.html 的 `<head>` 里的 CSS 引用**
- **只改文章内容**，模板结构保持不变
- 日期格式：`06/13/` 表示6月13日
- 分类标签：翡翠知识、翡翠鉴赏、公告

## 常见问题

**Q: 为什么不能用 hexo 生成？**  
A: hexo 的 landscape 主题会覆盖所有自定义样式，导致每次生成后页面变丑。所以改成手动维护 HTML 文件。

**Q: 以后更新文章怎么操作？**  
A: 直接修改对应的 `index.html` 文件，然后 git push 即可。

**Q: 需要改 CSS 吗？**  
A: 不需要。CSS 已经写好了，包含导航栏、卡片布局、响应式设计等。

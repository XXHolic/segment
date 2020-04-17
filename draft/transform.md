# 文章格式
## 掘金
- 完全支持 GitHub 的 Markdown 语法，
- 粘贴时链接会自动转换为自己平台的链接
- 有侧边导航

## segmentFault
- 不支持 details 的 Markdown 语法
- 可以直接使用外部链接
- 有侧边导航
- 有序列表行之间插入其它内容可能会显示不准确

## 简书(暂时不在这个平台，图片多了外链转换麻烦)
- 不支持 details 的 Markdown 语法，不支持 html 语法
- 没有侧边或其它形式的目录，不支持自带锚点
- 不可以直接使用外部链接，要用它们平台插入外链转换一下

## CSDN
- 不支持 details 的 Markdown 语法
- 右边有隐藏的目录导航，不过太隐蔽了。
- 可以直接使用外部链接

## 博客园
- 支持 GitHub 的 Markdown 语法，detail里面换行和链接无效
- 支持 Markdown 目录导航
- 可以直接使用外部链接
- 有序列表行之间插入其它内容可能会显示不准确

最终决定共同处理有：
- 将图片的 .. 转换为对应的线上链接
- 为每篇插入 origin 和 my github 的链接

用脚本生成两个模版：
- 给CSDN/segmentFault 用：去掉目录相关、detail 标签、html 的锚点
- 给掘金用：去掉目录相关就可以了
- 给博客园：保留目录，去掉 detail



## 已上传的文章
### segment
- 57.textarea.64
- 54.Rich Text Editor.61
- 51.Webpack Concept.57
- 48.CORS.50.md
- 58.Can I use xxx.66
- 59.浮层滚动问题.67
- 60.粘性头部效果.68
- 61.Safari 导航栏.70
- 63.h5 穿透滚动.72
- 66.Canvas 橡皮擦效果.75
- 72.自定义 create-react-app.82

### blog
- 47.About Performanc.47
- 48.Performance Guide.48
- 46.Collision Detection.46
- 49.Performance Metrics.49
- 32.CSS Flexible Box Layout.32
- 52.Git 工作流规范参考.52
- 30.CSS 团队规范参考.30
- 43.JavaScript 团队规范参考.43
- 16.Git Commit 规范参考.16
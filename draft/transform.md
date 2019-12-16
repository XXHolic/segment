# 文章格式
## 掘金
- 完全支持 GitHub 的 Markdown 语法，
- 粘贴时链接会自动转换为自己平台的链接
- 有侧边导航

## segmentFault
- 不支持 details 的 Markdown 语法
- 可以直接使用外部链接
- 有侧边导航

## 简书
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

最终决定共同处理有：
- 将图片的 .. 转换为对应的线上链接
- 为每篇插入 origin 和 my github 的链接

用脚本生成两个模版：
- 给简书/CSDN/segmentFault 用：去掉目录相关、detail 标签、html 的锚点
- 给掘金用：去掉目录相关就可以了
- 给博客园：保留目录，去掉 detail
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
- 16.JavaScript 新旧替换一：变量声明.18
- 33.JavaScript 新旧替换二：赋值和取值.35
- 34.JavaScript 新旧替换三：参数转换.36
- 47.JavaScript 新旧替换四：继承.49
- 52.JavaScript 新旧替换五：函数嵌套.59
- 73.Hoisting.84
- 17.canvas 宽高问题.19
- 18.canvas 显示模糊问题.20
- 19.canvas 设置边框问题.21
- Canvas 文本坐标(0,0)显示问题
- 22.canvas 图片圆角问题.24
- 23.canvas 文字换行.25
- 24.canvas 图片跨域处理.26
- Canvas 图像灰度处理
- Canvas 橡皮擦效果
- 75.Canvas 绘制 1 px 直线模糊（非高清屏）的问题.86
- 78.JavaScript 新旧替换六：键值对数据.89
- npm Getting started
- npm developer guide
- 26.npm 发布包遇到的问题.28
- 79.本地包调试 ：npm link.91
- 83.Windows 下 Nginx 开机自启动.97
- 81.CentOS 7 下 Git 超时.95
- 82.CentOS 7 后台克隆远程库.96
- 84.Node 连接 MySql.98
- 62.z-index.71
- 77.获取页面元素位置.88
- [CSS 浮动 float 小结](https://github.com/XXHolic/blog/issues/9)
- 8.box-shadow设置后看不到的问题.10
- Transaction processing
- 74.正则多次匹配无效的问题.85
- 36.Writing Modes.38
- ASCII 和 Base64
- 图片 src 为二进制的处理
- Lerna
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
- 53.前端异常类型及捕获方式.53
- 56.About Speed Tools.56
- 58.Collision Detection ：Point.59
- 59.Collision Detection ：Rectangle.60
- 60.Collision Detection ：Line.61
- 61.Collision Detection ：Polygon.62
- 62.Collision Detection ：Triangle.63
- 63.Collision Detection ：Transformation.64
- 64.Collision Detection ：Separating Axis Theorem.65
- 67.前端异常示例
- 69.前端异常解析
- 70.前端异常解析：Source Map
- 71.前端异常上报
- 73.The Single Responsibility Principle.76
- 74.NodeJS and Good Practices.77
- The Clean Architecture
- Scalable Frontend 1 — Architecture Fundamentals
- [Scalable Frontend 2 — Common Patterns](https://github.com/XXHolic/blog/issues/79)
- [Scalable Frontend 3 —The State Layer](https://github.com/XXHolic/blog/issues/80)
- [10 Common Software Architectural Patterns in a nutshelle](https://github.com/XXHolic/blog/issues/82)
- 超级微型编译器
- 屏幕尺寸、像素、分辨率和 devicePixelRatio
# 渲染
## <a name="index"></a> 目录
- [引子](#start)
- [index 1](#index1)
  - [index 12](#index12)
- [参考资料](#reference)


## <a name="start"></a> 引子
听到一些概念，有些模糊，要区分一下。

## 渲染
### 服务器渲染
也称后端或直出，用户请求服务器，服务器上直接生成 HTML 内容并返回给浏览器。一般来说，服务器端渲染的页面交互能力有限，如果要实现复杂交互，还是要通过引入 JavaScript 文件来辅助实现。服务器端渲染这个概念，适用于任何后端语言，例如传统的 ASP、Java 或 PHP 的渲染机制。

适用场景：内容型网站，即网页的主题是内容，如各大门户网站。这样的网站是有强烈的 SEO 需要，同时页面加载速度也是爬虫对页面排名衡量的重要标准之一，因此在服务端渲染是很有必要的。对于这种类型的网站，通常也不会有特别复杂的交互，因此传统的「服务端渲染」足以应付。

优势：
- 首屏性能，不需要先下载一堆 js 和 css 后才能看到页面
- SEO
- 对于电量不给力的手机或平板，减少在客户端的电量消耗很重要

缺点：
- 交互能力有限
- 维护

### 同构渲染
指前后端共用 JS，首次渲染时使用 Node.js 来直出 HTML。一般来说同构渲染是介于前后端中的共有部分。

服务端和客户端的同构，一般意思是服务端和客户端都可以运行的同一套代码程序。

同构这个概念存在于 Vue，React 这些新型的前端框架中，同构实际上是客户端渲染和服务器端渲染的一个整合。我们把页面的展示内容和交互写在一起，让代码执行两次。在服务器端执行一次，用于实现服务器端渲染内容，在客户端再执行一次，用于接管页面交互。

SSR 同构也是在 Node 这门服务端语言兴起后，使得 JS 可以同时运行在服务端和浏览器，使得同构的价值大大提升。

优点：
- 有助于 SEO
- 共用前端代码，节省开发时间
- 提高首屏性能（相对于前端渲染）

缺点：
- document 等对象找不到的问题
- DOM 计算报错的问题
- 前端渲染和服务端渲染内容不一致的问题
- 内存溢出（node）
- 异步操作
- 由于每个用户访问时是不一样的window，那么就意味着你得每次都更新window。
- 数据流管理的 store
- node.js 应用的编写、维护、调试、调优、监控等各种能力。

### 客户端渲染
客户端渲染，页面初始加载的 HTML 页面中无网页展示内容，需要加载执行JavaScript 文件中的 React 代码，通过 JavaScript 渲染生成页面，同时，JavaScript 代码会完成页面交互事件的绑定。代表是现在流行的 SPA 单页面应用

优点：
- 告别刷新
- 延迟加载
- 轻松部署
- 实现更加复杂的交互和功能
- 强制性关注点分离

缺点：
- SEO
- 首屏性能

## 问题
- 构建，开发实时编译刷新
- 路由
- 异步
- 浏览器端和服务器端状态的公用
- 事件处理，后端只是纯页面，事件还是要客户端处理


<div align="right"><a href="#index">Back to top :arrow_up:</a></div>


## <a name="reference"></a> 参考资料
- [精读前后端渲染之争][url-blog1]
- [前后端渲染之争][url-blog2]
- [贴吧 React 最佳实践][url-blog3]
- [前端同构渲染的思考与实践][url-blog4]
- [React服务端渲染与同构实践][url-blog5]
- [React 中同构（SSR）原理脉络梳理][url-blog6]
- [Here’s Why Client-side Rendering Won][url-blog7]
- [实现SSR服务端渲染][url-blog8]



[url-base]:https://xxholic.github.io/segment

[url-blog1]:https://github.com/camsong/blog/issues/8
[url-blog2]:https://github.com/dt-fe/weekly/issues/5
[url-blog3]:https://github.com/ascoders/blog/issues/6
[url-blog4]:https://juejin.im/post/5c821dc45188257e1f2915b1
[url-blog5]:https://imweb.io/topic/5d2da910b17a4bd24bd0678a
[url-blog6]:https://segmentfault.com/a/1190000016722457
[url-blog7]:https://www.freecodecamp.org/news/heres-why-client-side-rendering-won-46a349fadb52/
[url-blog8]:https://juejin.im/post/5c8eed02f265da6824186088#heading-0


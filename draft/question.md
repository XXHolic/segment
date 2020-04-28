# question
## <a name="index"></a> 目录
- [引子](#start)
- [浏览器怎么实现异步操作？](#ques1)
- [其它资料](#reference)

## 引子
思考的问题。

## <a name="ques1"></a> 浏览器怎么实现异步操作？

<details>

<summary>理解参考一</summary>

JavaScript 有一个基于**事件循环（event loop）**的并发模型，事件循环负责执行代码，收集和处理事件，并执行子任务。

首先了解一下 JavaScript 在运行的大概是什么样的，参考下图。

![ques-ans1][url-local-ans1]

### Stack
函数调用形成一个由若干帧组成的栈。

### Heap
对象被分配在堆中，堆是一个用来表示一大块（通常是非结构化的）内存区域的计算机术语。

### Queue
一个 JavaScript 运行时包含了一个待处理消息的消息队列。每一个消息都关联着一个用以处理这个消息的回调函数。

在 事件循环 期间的某个时刻，运行时会从最先进入队列的消息开始处理队列中的消息。被处理的消息会被移出队列，并作为输入参数来调用与之关联的函数。函数的处理会一直进行到执行栈再次为空为止，然后事件循环将会处理队列中的下一个消息（如果还有的话）。

### event loop
对照下面这张图：

![ques-ans2][url-local-ans2]

上图中，主线程运行的时候，产生堆（heap）和栈（stack），栈中的代码调用各种外部API，它们在"任务队列"中加入各种事件（click，load，done）。只要栈中的代码执行完毕，主线程就会去读取"任务队列"，依次执行那些事件所对应的回调函数。线上示例见[loupe][url-demo-1] 。


### task、macrotasks
在规范里面见到的有 task、microtask 两个词，晚上也有称 task 为 macrotask。

属于 task 有：setTimeout, setInterval, setImmediate, requestAnimationFrame, I/O, UI rendering
属于 microtask 有: process.nextTick, Promises, queueMicrotask

### Several Runtime
一个 web worker 或者一个跨域的 iframe 都有自己的栈、堆和消息队列。两个不同的运行时只能通过 postMessage 方法进行通信。如果另一个运行时侦听 message 事件，则此方法会向该运行时添加消息。


### 参考资料
- [loupe][url-demo-1]
- https://stackoverflow.com/questions/25915634/difference-between-microtask-and-macrotask-within-an-event-loop-context
- http://www.ruanyifeng.com/blog/2014/10/event-loop.html
- https://developer.mozilla.org/zh-CN/docs/Web/API/HTML_DOM_API/Microtask_guide
- https://dev.to/sagarrth/an-overview-of-event-loop-tasks-and-microtasks-1i31
- https://jakearchibald.com/2015/tasks-microtasks-queues-and-schedules/


</details>

## 原型链的理解

<details>
<summary>理解参考一</summary>

1. 对象实例都有一个内置 __proto__，指向构造函数原型对象（prototype），这原型对象也有一个 __proto__，层层向上直到一个对象的原型对象为 null 。根据定义，null 没有原型，并作为这个原型链中的最后一个环节。
2. 当访问对象中的属性不存在时，就会查找对象内部 __proto__ 关联的对象，这个关联关系就形成了一条原型链。
3. 很常见的例子，就是模仿类，也就是常说的构造函数，用构造函数声明的对象，都是通过原型链相互关联起来，看起来像类一样，但其实有这本质的区别：**类是可以复制多次，就像模具一样，但JavaScript 并没有类似的复制机制** 。 继承示例见 [这里][url-segment-49]
4. prototype 是函数独有的属性，是保存它们所有实例方法的真正所在


重叠的问题：
- es5 的继承跟 es6 的继承区别，见这里[这里][url-segment-49]
- Object.create() 如果用 es5 怎么实现，见[这里][url-mdn-2]

</details>

## 闭包的理解

<details>
<summary>理解参考一</summary>

- 闭包其实在 JavaScript 中很常见，它是基于作用域写代码产生的结果。（作用域是一套规则，用于确定在何处以及如何查找变量（标识符））
- 当函数可以记住并访问所在作用域时，就产生了闭包。也就是指有权访问另一个函数作用域中的变量的函数。

例如在向一个方法A传入一个字符串，方法里面使用 setTimeout 来打印这个字符串，setTimeout 中执行的函数就具有涵盖了方法A的闭包。

比较常见利用闭包的例子就是模块，模块主要有2个特征：
1. 调用一个包装函数来创建内部作用域
2. 包装函数返回值至少包含一个对内部函数的引用，

### 参考资料
- https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Closures

</details>

## 函数 this 的绑定有那些情况？
<details>
<summary>理解参考一</summary>

见 [关于 this 的误解][url-segment-40]，[关于 this 绑定 ][url-blog-33]。


重叠的问题：
- bind 方法做了什么，见[这里][url-segment-41]。

</details>

## 那些情况算跨域？解决跨域的方法有那些？

<details>
<summary>理解参考一</summary>

1. 浏览器的同源策略是一个重要的安全机制，不同源的客户端在没有授权的情况下，不能够访问对方的资源。
2. 同源的定义是访问链接的协议、域名和端口号均相同
3. 同源策略认为域和子域属于不同的域。一级域名相同，只是二级域名不相同，浏览器允许设置 document.domain 来共享资源，例如cookie。服务器也可以在设置Cookie的时候，指定Cookie的所属域名为一级域名，这样二级域名和三级域名不同，不用做任何设置，都可以读取 cookie。


解决跨域的方法：
1. iframe：如果两个窗口一级域名相同，只是二级域名不同，通过设置 document.domain 属性。
2. postMessage(message, targetOrigin, [transfer]) 和对应监听 message 事件，具体见[这里][url-mdn-1]。
3. JSONP，只支持 GET 请求，基本思想是：网页通过添加一个\<script\>元素，向服务器请求JSON数据，这种做法不受同源政策限制；服务器收到请求后，将数据放在一个指定名字的回调函数里传回来。
4. WebSocket 是一种通信协议，使用ws://（非加密）和wss://（加密）作为协议前缀。该协议不实行同源政策，只要服务器支持，就可以通过它进行跨源通信。
5. CORS 是跨源资源分享，在服务器端设置即可，相比 JSONP 有点就是各种类型请求都支持。 具体可见[这里][url-segment-50]。


重叠的问题：
- cors 实现的原理，[这里][url-segment-50]。


</details>

## http 各版本的差异

<details>
<summary>理解参考一</summary>

HTTP 最初提出主要是为了信息共享。

第一个版本是 HTTP/0.9，特点是：
- 只支持 get 方法
- 只支持简单的 HTML 对象

由于缺陷太多，并没有成为正式的规范，很快被 HTTP 1.0 取代。

第二版本 HTTP 1.0，特点：
- 是正式的版本。
- 添加了版本号、各种 HTTP 首部、一些额外的方法，以及对多媒体对象的处理。

这个时期商业和学术快速发展，出现了很多非官方的事实标准，比例虚拟主机和代理。这些统称为 HTTP 1.0+。

第三个版本 HTTP 1.1，特点：
- 校正 HTTP 设计中的结构性缺陷。
- 明确语义，
- 引入重要的性能优化措施，并删除一些不好的特性

第四个版本 HTTP/2，特点：
- 关注的是性能的大幅优化

更详细介绍见[这里][url-blog-31]

重叠的问题：
- http 常用请求头，见[这里][url-mdn-3]

</details>

## https 握手过程

<details>
<summary>理解参考一</summary>

![ques-https][url-local-ans3]

更加详细见[这里][url-article-1]。

附带或重叠问题：
- 加密的算法是对称还是非对称，见[这里][url-article-2]。
- https 和 http 区别，见[这里][url-article-3]。

</details>

## 垃圾回收机制

<details>
<summary>理解参考一</summary>

垃圾回收的原理：找出不再继续使用的变量，然后释放占用的内存。垃圾收集器会周期性的执行这一操作。

常用的策略有：
### 标记清除
当变量进入环境时，就将这个变量标记为“进入环境”，当变量离开环境时，则标记为“离开环境”。这个是主流的策略。

### 引用计数
追踪记录每个值被引用的次数。当值的引用次数变成 0 时，就会回收其占用的内存空间。

但这个策略有个问题：循环引用。例如对象A中包含一个指向B的指针，对象B中包含一个指向对象A的引用。


附带或重叠的问题：
### 内存泄漏和内存溢出
- 内存泄漏：使用的内存，一直没有得到释放，比较常见的就是变量的引用一直存在。

- 内存溢出：程序向系统申请一定大小的内存，而系统不能满足程序要求，于是产生了溢出。例子是声明一个变量，赋值一个数字，超过了最大值。1.7976931348623157e+308

</details>

## 节流和防抖

- css3 动画和 js 动画那个性能比较好？
- AMD、CMD、commonjs 规范差异
- promise、generator 讲解一下
- 安全方面的知识有那些了解？
- 常用设计模式
- js 常用数据结构
- 对象的一些属性
- var 变量提升 和 function 变量提升区别
- 递归中出现相互引用 如何处理
- babel 转成 es5 后是什么样子的（例如 promise ）
- 浏览器加载一个页面到显示经历了什么？
- 用什么方法可以达到跟递归一样的效果
- 从浏览器输入地址到渲染过程中会有什么缓存？
- promise 规范中 then 和 caught 是如何传值的？

## 框架类
- Vue 和 React 的差异
- 虚拟 DOM diff 算法是怎么实现的
- React 的生命周期，详细说出来
- React SEO 怎么做
- saga 的优缺点
- React 样式解决方案
- React 如果创建一个弹窗
- DVA 做了什么

## 工程化类
- webpack 生成的 manifest 文件作用
- webpack 中 loader 的原理
- webpack 打包太大怎么处理？

## 其它类
- 原生 app 的混合应用，听说过或者用过那些框架？
- 有没有使用过工具，可以一套代码生成小程序、app 等一些对应的应用？
- 有没有自己负责搭建过项目框架，用的是什么？
- 目前比较流行的框架有没有关注？有那些？
- 登录是用的 cookie 方式还是什么方式 ，是怎么带过去的？（jwt）
- 前端的发展趋势的看法
- app 如何保持长久的登录常态
- 怎么知道用户在线


<div align="right"><a href="#index">Back to top :arrow_up:</a></div>


## <a name="reference"></a> 其它资料
- [Daily-Interview-Question][url-github-interview]
- [Reverse-Interview-Question][url-github-reverse-interview]


[url-base]:https://xxholic.github.io/segment/images

[url-github-interview]:https://github.com/Advanced-Frontend/Daily-Interview-Question
[url-github-reverse-interview]:https://github.com/yifeikong/reverse-interview-zh

[url-demo-1]:http://latentflip.com/loupe/?code=JC5vbignYnV0dG9uJywgJ2NsaWNrJywgZnVuY3Rpb24gb25DbGljaygpIHsKICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gdGltZXIoKSB7CiAgICAgICAgY29uc29sZS5sb2coJ1lvdSBjbGlja2VkIHRoZSBidXR0b24hJyk7ICAgIAogICAgfSwgMjAwMCk7Cn0pOwoKY29uc29sZS5sb2coIkhpISIpOwoKc2V0VGltZW91dChmdW5jdGlvbiB0aW1lb3V0KCkgewogICAgY29uc29sZS5sb2coIkNsaWNrIHRoZSBidXR0b24hIik7Cn0sIDUwMDApOwoKY29uc29sZS5sb2coIldlbGNvbWUgdG8gbG91cGUuIik7!!!PGJ1dHRvbj5DbGljayBtZSE8L2J1dHRvbj4%3D


[url-mdn-1]:https://developer.mozilla.org/zh-CN/docs/Web/API/Window/postMessage
[url-mdn-2]:https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/create
[url-mdn-3]:https://developer.mozilla.org/zh-CN/docs/Web/HTTP
[url-segment-49]:https://github.com/XXHolic/segment/issues/49
[url-segment-50]:https://github.com/XXHolic/segment/issues/50
[url-segment-40]:https://github.com/XXHolic/segment/issues/40
[url-segment-41]:https://github.com/XXHolic/segment/issues/41
[url-blog-31]:https://github.com/XXHolic/blog/issues/31
[url-blog-33]:https://github.com/XXHolic/blog/issues/33

[url-article-1]:http://www.ruanyifeng.com/blog/2014/09/illustration-ssl.html
[url-article-2]:https://www.cnblogs.com/liluxiang/p/9681635.html
[url-article-3]:https://www.cnblogs.com/huhuxixi/p/10644829.html

[url-local-ans1]:../images/question/javascript-runtime.svg
[url-local-ans2]:../images/question/event-loop.png
[url-local-ans3]:../images/question/https.jpg
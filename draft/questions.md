# questions
## <a name="index"></a> 目录
- [引子](#start)
- [笔试](#write)
- [问答](#answer)
- [其它资料](#reference)


## <a name="start"></a> 引子
面试中碰到的问题收集。

## <a name="write"></a> 笔试
### <a name="write1"></a> 题目1
下面打印结果什么:
```js
  var a = 1;
  var obj = {
    a: 2,
    obj2: {
      a: 3,
      fun: function() {
        console.info(this.a);
      }
    }
  };

  var getA = obj.obj2.fun;
  getA();
  obj.obj2.fun();
```

### <a name="write2"></a> 题目2
下面打印结果什么:
```javascript
function fun(n,o) {
  console.info(o);

  return {
    fun:function(m,n) {
      fun(m,n)
    }
  }
}

var a = fun(1);a.fun(2);a.fun(3);

var b = fun(1).func(2).fun(3);

var c = fun(1).fun(2);c.fun(3);
```

### <a name="write3"></a> 题目3
下面打印结果什么:
```javascript
function fun(n,o) {
  console.info(o);

  return {
    fun:function(m,n) {
      fun(m,n)
    }
  }
}

var a = fun(1);a.fun(2);a.fun(3);

var b = fun(1).func(2).fun(3);

var c = fun(1).fun(2);c.fun(3);
```

### <a name="write4"></a> 题目4
下面打印结果什么并简单解释:
```javascript
for(var i =0;i<4;i++) {
  setTimeout(function(){
    console.info(i);
  },100);
}

console.info(i);
```

### <a name="write5"></a> 题目5
var a = [1,2,3,4]，var b = [5,6,7]，怎么把数组 b 插入到 a 中，最后让 a 变为 [1,2,5,6,7,3,4]

### <a name="write6"></a> 题目6：数组去重
数组去重，可能会问根据时间和空间复杂度，怎么优化。

### <a name="write7"></a> 题目7：冒泡排序
冒泡排序，可能会问根据时间和空间复杂度，怎么优化。

### <a name="write8"></a> 题目8：正则
- 正则格式化金额
- 正则检验手机号码

### <a name="write9"></a> 题目9
下面的输出结果是什么
```js
setTimeout(() => {
  console.log('11');
});
new Promise((resolve) => {
  console.log('22');
  for(var i = 1; i < 100; i++) {
    if (i == 99) resolve();
  }
  console.log('33')
}).then(() =>{
  console.log('44');
})

process.nextTick(function(){console.log(66)});

console.log('55')

```

### <a name="write10"></a> 题目10
编写程序统计 1 到 10000 之间的数字中数字 0 的总数。

（说明：例如 1 到 20 之间带 0 的数字有 10、20，数字 0 的总数就是 2 ）

### <a name="write11"></a> 题目11：css 布局
- 居中
- 一列固定一列自适应
- 左右两边固定，中间自适应
- 用 css 写一个三角形


### <a name="write12"></a> 题目12
css link 标签和 @import 区别

### <a name="write13"></a> 题目13
css link 标签和 @import 区别

### <a name="write14"></a> 题目14
写出你对文档流的理解

### <a name="write15"></a> 题目15
写出脱离文档流的方法

### <a name="write16"></a> 题目16
写出 es5 和 es6 继承示例

### <a name="write17"></a> 题目17
写出解决跨域的方法，至少 5 种

### <a name="write18"></a> 题目18
写出 js 数组常用方法。（可能会根据答案问问题）

### <a name="write19"></a> 题目19
删除 cookie 方式

### <a name="write20"></a> 题目20
[1,1,2,3] 去重，然后抓换为 [1,2,3,2,1]，然后求和

### <a name="write21"></a> 题目21
一个最多 5 位的金额数字，转换为汉字描述，例如 30123 转换为 三万零一百二十三

### <a name="write22"></a> 题目22
前端优化的方式（会问一些不太常见的优化方式有那些）


### <a name="write23"></a> 题目23
实现js克隆方法，可以对5种主要基本类型数据进行复制（要考虑循环引用）

### <a name="write24"></a> 题目24
下面这个 ul，如何点击每一列的时候 alert 其 index
```html
<ul id='test'>
 <li>第一条数据</li>
 <li>第二条数据</li>
 <li>第三条数据</li>
</ul>
```

### <a name="write25"></a> 题目25
实现一个LazyMan，可以按照以下方式调用:

LazyMan(“Hank”)输出:
```
Hi! This is Hank!
```
LazyMan(“Hank”).sleep(10).eat(“dinner”)输出:
```
Hi! This is Hank!
//等待10秒..
Wake up after 10
Eat dinner~
```
LazyMan(“Hank”).eat(“dinner”).eat(“supper”)输出:
```
Hi This is Hank!
Eat dinner~
Eat supper~
```
LazyMan(“Hank”).sleepFirst(5).eat(“supper”)输出:
```
//等待5秒
Wake up after 5
Hi This is Hank!
Eat supper
```
以此类推。

<details>
<summary>解题思路一</summary>

```js
class LazyManMain {
  constructor(name) {
    this.name = name;
    this.tasks = [];
    this.say();
    const _self = this;
    setTimeout(function() {
      _self.run();
    }, 0);
  }

  run() {
    const tasksPromise = this.tasks.map(task => async () => this.toPromise(task.fn, task.duration));
    this.mergePromise(tasksPromise);
  }

  mergePromise(ajaxArray) {
    async function run() {
      for (let p of ajaxArray) {
        await p();
      }
    }
    return run();
  }

  mergePromise2(promiseTask) {
    let p = Promise.resolve();
    promiseTask.forEach(promise => {
      p = p.then(promise).then(d => {});
    });
  }

  toPromise(fn, duration) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          fn();
          resolve();
        } catch (err) {
          reject(err);
        }
      }, duration);
    });
  }

  say() {
    const say = () => {
      console.log(`Hi! this is ${this.name}!`);
    };
    this.tasks.push({ fn: say });
    return this;
  }

  sleepFirst(duration) {
    const sleepFirst = function() {
      console.log(`Wake up after ${duration}`);
    };
    this.tasks.unshift({ fn: sleepFirst, duration });
    return this;
  }

  sleep(duration) {
    const sleep = function() {
      console.log(`Wake up after ${duration}`);
    };
    this.tasks.push({ fn: sleep, duration });
    return this;
  }

  eat(food) {
    const eat = function() {
      console.log(`Eat ${food}`);
    };
    this.tasks.push({ fn: eat });
    return this;
  }
}

function LazyMan(name) {
  return new LazyManMain(name);
}

LazyMan('Hank')
  .sleep(1000)
  .eat('dinner');
```

</details>

### <a name="write26"></a> 题目26
301 和 302 是做什么的

### <a name="write27"></a> 题目27
xss csrf 是什么？防御怎么做？

### <a name="write28"></a> 题目28
如何设置浏览器缓存，缓存和不缓存两种。

### <a name="write29"></a> 题目29
使用 new 的时候，过程发生了什么

## <a name="answer"></a> 问答
### 基础类
- 原型链的理解（注意：prototype、 __proto__ ）
- 闭包的理解
- HTTP 各版本的差异
- AMD、CMD、commonjs 规范差异
- 那些情况算跨域？解决跨域的方法有那些？
- css3 动画和 js 动画那个性能比较好？
- 浏览器怎么实现异步操作？
- 安全方面的知识有那些了解？
- 函数 this 的绑定有那些情况？
- 内存泄漏和内存溢出
- 垃圾回收机制
- promise、generator 讲解一下
- 常用设计模式
- cors 实现的原理
- https 和 http 区别
- http 常用请求头
- js 常用数据结构
- 对象的一些属性
- es5 的继承跟 es6 的继承区别
- 节流和防抖
- var 变量提升 和 function 变量提升区别
- bind 方法做了什么
- 递归中出现相互引用 如何处理
- babel 转成 es5 后是什么样子的（例如 promise
- Object.create() 如果用 es5 怎么实现
- 浏览器加载一个页面到显示经历了什么？
- 用什么方法可以达到跟递归一样的效果
- 从浏览器输入地址到渲染过程中会有什么缓存？
- https 握手过程
- session 和 cookie 区别
- promise 规范中 then 和 caught 是如何传值的？

### 框架类
- Vue 和 React 的差异
- 虚拟 DOM diff 算法是怎么实现的
- React 的生命周期，详细说出来
- React SEO 怎么做
- saga 的优缺点
- react 样式解决方案
- React 如果创建一个弹窗
- DVA 做了什么

### 工程化类
- webpack 生成的 manifest 文件作用
- webpack 中 loader 的原理
- webpack 打包太大怎么处理？

### 其它类
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

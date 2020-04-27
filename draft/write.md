
# write
## <a name="index"></a> 目录
- [引子](#start)
- [笔试](#write)
- [问答](#answer)
- [其它资料](#reference)


## <a name="start"></a> 引子
练习的问题。


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
<details>
<summary>解题思路一</summary>

```js
function countZero(maxNum) {
  let numStr = '';
  for(let i = 1; i<=maxNum; i++) {
    numStr += `${i}`;
  }

  return numStr.match(/0/g).length;
}
countZero(1000)
```
</details>

### <a name="write11"></a> 题目11：css 布局
- 居中
- 一列固定一列自适应
- 左右两边固定，中间自适应
- 用 css 写一个三角形


### <a name="write12"></a> 题目12
css 定位

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


<div align="right"><a href="#index">Back to top :arrow_up:</a></div>


# write
## <a name="index"></a> 目录
- [引子](#start)
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
<details>
<summary>参考</summary>

1
3
</details>

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

var a = fun(1);
a.fun(2);
a.fun(3);

var b = fun(1).fun(2);
```
<details>
<summary>参考</summary>

undefined
undefined
undefined

undefined
undefined

</details>

### <a name="write4"></a> 题目3
下面打印结果什么并简单解释:
```javascript
for(var i =0;i<4;i++) {
  setTimeout(function(){
    console.info(i);
  },100);
}

console.info(i);
```

<details>
<summary>参考</summary>

4
4
4
4
4

- 原因： 循环里面打印值最终指向的是 i 所储存的值，运行结束后，i 的值是 4 。最后一个打印的值，是因为 var 声明的变量作用域就在其中，所以可以取到这个值。

</details>

### <a name="write5"></a> 题目4
var a = [1,2,3,4]，var b = [5,6,7]，怎么把数组 b 插入到 a 中，最后让 a 变为 [1,2,5,6,7,3,4]

<details>
<summary>参考</summary>

```js
let a = [1,2,3,4],b = [5,6,7];
for(let i=0,len = b.length;i<len;i++) {
  let insertPos = 2+i;
  a.splice(insertPos,0,b[i]);
}
console.info(a);
```

</details>

### <a name="write6"></a> 题目5：数组去重
数组去重，可能会问根据时间和空间复杂度，怎么优化。

<details>
<summary>参考</summary>

```js
const arr = [2,3,1,4,5,3,2,1];
let newArr = [];
arr.reduce((initValue,current,index)=>{
  if(initValue.indexOf(current) === -1) {
    initValue.push(current);
  }
  return initValue;
},newArr);
console.info("newArr",newArr);
```
- 时间复杂度 : 对一个算法在运行过程中消耗时间的一个量度，反映的是一个趋势。
- 空间复杂度 : 对一个算法在运行过程中临时占用存储空间大小的一个量度，反映的是一个趋势。

</details>

### <a name="write6"></a> 题目6：冒泡排序
冒泡排序，可能会问根据时间和空间复杂度，怎么优化。

<details>
<summary>参考</summary>

```js
const arr = [2,3,1,4,5,6];

for(let i=0,len=arr.length;i<len;i++ ) {
  let sortEle = arr[i];
  for(let j=i+1;j<len-i;j++){
    let compareEle = arr[j];
    if(sortEle > compareEle) {
      arr[i] = compareEle;
      arr[j] = sortEle;
    }
  }
}

console.info(arr);

```

</details>

### <a name="write8"></a> 题目8：正则
- 正则格式化金额
- 正则检验手机号码

<details>
<summary>参考</summary>

正则格式化金额
```js
let str = '12344';
str.replace(/\B(?=(\d{3})+(?!\d))/g,',');
(123456789).toLocaleString('en-US');
```
正则检验手机号码
```js
let reg = /^1[3-9]\d{9}$/g;
reg.test(123);
```

</details>

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


console.log('55')

```

<details>
<summary>参考</summary>

22
33
55
44
11

- 先分析宏任务，及每个宏任务中的微任务（微任务优先宏任务执行）
- 根据调用次序，确定宏任务中微任务执行次序
- 根据宏任务触发规则和次序，确定宏任务的调用次序

属于宏任务有：setTimeout, setInterval, setImmediate, requestAnimationFrame, I/O, UI rendering
属于微任务有: process.nextTick, Promises, queueMicrotask

</details>

### <a name="write10"></a> 题目10
编写程序统计 1 到 10000 之间的数字中数字 0 的总数。

（说明：例如 1 到 20 之间带 0 的数字有 10、20，数字 0 的总数就是 2 ）
<details>
<summary>参考</summary>

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

### <a name="write16"></a> 题目16
写出 es5 和 es6 继承示例

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


<div align="right"><a href="#index">Back to top :arrow_up:</a></div>

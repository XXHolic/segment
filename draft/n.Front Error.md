# n.Front Error
## <a name="index"></a> 目录
- [引子](#start)
- [index 1](#index1)
  - [index 12](#index12)
- [参考资料](#reference)


## <a name="start"></a> 引子
进行由异常捕捉，先了解异常的类型。

<div align="right"><a href="#index">Back to top :arrow_up:</a></div>

## 异常类型
- JavaScript 异常
- 资源加载异常
- 请求异常
- Promise、Async/Await 异常
- 跨域异常
- 崩溃和卡顿
- iframe 异常

### JavaScript 异常
JavaScript 中有个 Error 对象，里面拥有的以下几种类型。
### EvalError
与 eval() 有关
### InternalError
Javascript引擎内部错误的异常， 如: "递归太多".
### RangeError
表示错误的原因：数值变量或参数超出其有效范围。
### ReferenceError
表示错误的原因：无效引用。
### SyntaxError
表示错误的原因：eval()在解析代码的过程中发生的语法错误。
### TypeError
表示错误的原因：变量或参数不属于有效类型。
### URIError
表示错误的原因：给 encodeURI()或  decodeURl()传递的参数无效。

这类异常大部分在编译的时候会发现。

## 捕捉错误方式
### Try-Catch
只能捕获到同步的运行时错误，对语法和异步错误却无能为力，捕获不到。

try-catch 则是用来在可预见情况下监控特定的错误

### window.onerror
当 JS 运行时错误发生时，window 会触发一个 ErrorEvent 接口的 error 事件，并执行 window.onerror()。

window.onerror 函数只有在返回 true 的时候，异常才不会向上抛出，否则即使是知道异常的发生控制台还是会显示 Uncaught Error: xxxxx

- 可监听到 同步，异步运行
- 不能监听语法，静态资源异常，或者接口异常

onerror 主要是来捕获预料之外的错误

### window.addEventListener
当一项资源（如图片或脚本）加载失败，加载资源的元素会触发一个 Event 接口的 error 事件，并执行该元素上的onerror() 处理函数。这些 error 事件不会向上冒泡到 window。不过（至少在 Firefox 中）能被单一的window.addEventListener 捕获。但是无法判断 HTTP 的状态是 404 还是其他比如 500 等等，所以还需要配合服务端日志才进行排查分析才可以。

### Promise Catch、Async/Await
没有写 catch 的 Promise 中抛出的错误无法被 onerror 或 try-catch 捕获到，所以我们务必要在 Promise 中不要忘记写 catch 处理抛出的异常。

为了防止有漏掉的 Promise 异常，建议在全局增加一个对 unhandledrejection 的监听，用来全局监听Uncaught Promise Error

### React
componentDidCatch

## 采集内容
遵循4W原则：
WHO did WHAT and get WHICH exception in WHICH environment?

- WHO：用户信息，出现异常时该用户的信息，例如该用户在当前时刻的状态、权限等，以及需要区分用户可多终端登录时，异常对应的是哪一个终端。
- WHAT：行为信息，用户进行什么操作时产生了异常：所在的界面路径；执行了什么操作；操作时使用了哪些数据；当时的API吐了什么数据给客户端；如果是提交操作，提交了什么数据；上一个路径；上一个行为日志记录ID等。
- WHICH：异常信息，产生异常的代码信息：用户操作的DOM元素节点；异常级别；异常类型；异常描述；代码stack信息等。
- WHICH：环境信息，网络环境；设备型号和标识码；操作系统版本；客户端版本；API接口版本等。

用户信息：

字段 | 类型 | 说明
----- | ----- | -----
userId | String | 用户ID
userStatus | String | 用户状态信息（是否可用/禁用）
userRoles | Array | 前用户的角色列表
userGroups | Array | 用户当前所在组，组别权限可能影响结果
userLicenses | Array | 许可证，可能过期

行为信息：

字段 | 类型 | 说明
----- | ----- | -----
action | String | 进行了什么操作
path | String | 所在路径，URL
data | Object | 当前界面的state、data
dataSources | Array\<Object> | 上游api给了什么数据
dataSend | Object | 提交了什么数据
targetElement | HTMLElement | 用户操作的DOM元素
targetDOMPath | Array\<HTMLElement> | 该DOM元素的节点路径
targetCSS | Object | 该元素的自定义样式表
targetAttrs | Object | 该元素当前的属性及值


异常信息：

字段 | 类型 | 说明
----- | ----- | -----
errorType | String | 错误类型
errorLevel | String | 异常级别
errorStack | String | 错误stack信息
errorFilename | String | 出错文件
errorLineNo | Number | 出错行
errorColNo | Number | 出错列位置
errorMessage | String | 错误描述（开发者定义）
errorTimeStamp | Number | 时间戳
eventType | String | 事件类型
pageX | Number | 事件x轴坐标
pageY | Number | 事件y轴坐标
screenX | Number | 事件x轴坐标
screenY | Number | 事件y轴坐标
eventKey | String | 触发事件的键


环境信息:

字段 | 类型 | 说明
----- | ----- | -----
pageW | Number | 页面宽度
pageH | Number | 页面高度
screenW | Number | 屏幕宽度
screenH | Number | 屏幕高度
network | String | 网络环境描述
userAgent | String | 客户端描述
device | String | 设备描述
system | String | 操作系统描述
appVersion | String | 应用版本
apiVersion | String | 接口版本


## <a name="reference"></a> 参考资料
- [example][url-base]
- http://jartto.wang/2018/11/20/js-exception-handling/index.html
- https://blog.fundebug.com/2019/07/24/async-await-error-handling-in-js/
- http://thecodebarbarian.com/async-await-error-handling-in-javascript.html
- https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Error
- https://rollbar.com/blog/top-10-javascript-errors/
- https://blog.fundebug.com/2018/03/12/top-10-javascript-errors-from-1000-projects/
- https://cdc.tencent.com/2018/09/13/frontend-exception-monitor-research/

[url-base]:https://xxholic.github.io/segment
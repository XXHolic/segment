# 正则表达式
## <a name="index"></a> 目录
- [场景](#situation)
- [关于 packages 和 modules](#about)
  - [packages](#package)
  - [modules](#modules)
- [参考资料]


## <a name="situation"></a> 场景
在一次更新包的过程中，要更新 package-lock.json 才能有效的更新相关的包。这个文件在项目中经常看见，但没怎么关注，这次实际情况中有碰到，在此了解记录一下。

## 关于包和模块
首先要说明的是，这里的所讲的是 [npm][url-npm-website] 中的文件。npm 注册表包含很多包，其中很多也是 Node 模块，或者包含 Node 模块。明白它们的区别和如何相互作用，还是很有必要。
### 包
一个包是一个用 package.json 文件描述的文件或者目录。一个包必须包含一个 package.json 文件，这个时为了在npm登录处进行发布。对于使用者或者组织，包是有范围限制，也可能没有限制。有范围限制的包可能是公开或者私有。

### 模块
一个模块是在 node_modules 目录下能通过 Node.js 的 require() 方法加载的任何文件或者目录。为了能够让 Node.js 的 require() 加载，一个模块必须要是下面其中之一：
- 一个有包含 “mian” 字段的 package.json 文件的文件夹。
- 一个有 index.js 文件的文件夹。
- 一个 JavaScript 文件。

因为模块并不是一定需要 package.json 文件，所有并不是所有的模块是包。拥有 package.json 文件的模块也算包。

在 Node 项目的上下文环境中，从一个文件加载的东西也是模块。例如下面的程序：
```javascript
var req = require('request);
```
我们可以说“这个 req 是指 request 模块”。










## 参考资料
[npm help docs][url-npm-docs]


[url-npm-website]:https://www.npmjs.com/
[url-npm-docs]:https://docs.npmjs.com/
[url-npm-package]:https://docs.npmjs.com/about-packages-and-modules
[url-npm-package-json]:https://docs.npmjs.com/files/package.json
[url-npm-package-lock]:https://docs.npmjs.com/files/package-lock.json
[url-npm-blog]:https://medium.com/coinmonks/everything-you-wanted-to-know-about-package-lock-json-b81911aa8ab8
[url-npm-blog-translate]:https://codertx.github.io/2018/01/09/about-package-json/
[url-npm-china-doc]:https://www.kancloud.cn/shellway/npm-doc/199981
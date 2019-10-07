# n.webpack optimize
## <a name="index"></a> 目录
- [引子](#start)
- [index 1](#index1)
  - [index 12](#index12)
- [参考资料](#reference)


## <a name="start"></a> 引子
webpack 优化方法实践记录。

<div align="right"><a href="#index">Back to top :arrow_up:</a></div>

## webpack-dev-server
```js
module.exports = {
    devServer: {
        port: 3000, // 让devServer监听3000端口
        contentBase: "./dist", // 将当前项目的dist目录作为devServer的根目录
        progress: true, // 显示打包进度条
        compress: true // 是否启用Gzip压缩，默认为false
    }
}
```
## JS 处理
###  将ES6以上的高级语法特性转换ES5
要告诉babel当前要转换的JS代码中使用了哪些新特性，即预设，我们使用包含当前所有最新ES语法特性的预设即可，@babel/preset-env。
```js
module.exports = {
    module: {
        rules: [
            {
                test: /\.js$/,
                use: [
                    {
                        loader: "babel-loader", // 使用babel-loader进行处理js文件
                        options: {
                            presets: ["@babel/preset-env"] // 用了最新的ES6语法预设
                        }
                    }
                ]
            }
        ]
    }
}
```
### 减少代码冗余
babel在转换ES6语法的时候，会使用一些由ES5编写的帮助函数来实现新语法的转换。比如转换class语法，就需要使用到classCallCheck()函数，如果多个文件中都使用到了Class语法，那么每个文件都会被注入classCallCheck()辅助函数，代码就会变得非常冗余，通过引入@babel/babel-plugin-transform-runtime插件就可以在输出文件中通过require的方式引入一个公共的classCallCheck()辅助函数,然后所有文件一起使用即可减少代码的冗余。@babel/babel-plugin-transform-runtime插件需要配合@babel/runtime一起使用，因为babel-plugin-transform-runtime插件引入的帮助函数，都存放在@babel/runtime中
```js
module.exports = {
    module: {
        rules: [
            {
                test: /\.js$/,
                use: [
                    {
                        loader: "babel-loader", // 使用babel-loader进行处理js文件
                        options: {
                            presets: ["@babel/preset-env"] // 用了最新的ES6语法预设
                            plugins: ["@babel/plugin-transform-runtime"] // 减少代码冗余插件
                        }
                    }
                ]
            }
        ]
    }
}
```
### 转换新的ES6API
babel默认只能转换ES6的新语法，如果想要转换一下ES6的新功能(Promise)、新接口(数组的includes方法)等，那么需要使用到@babel/polyfill, 其工作原理是在全局对象或者内置对象中添加一下属性或者方法，其使用方式为: 一种是直接在js文件中require, 如: require("@babel/polyfill"); 另一种是将"@babel/polyfill"作为入口文件一起打包成一个chunk，如:
```js
module.exports = {
    entry: ['@babel/polyfill', "./src/index.js"]
}
```


## <a name="reference"></a> 参考资料
- [example][url-base]
- https://segmentfault.com/a/1190000020036172
- https://segmentfault.com/a/1190000020320871

[url-base]:https://xxholic.github.io/segment/images
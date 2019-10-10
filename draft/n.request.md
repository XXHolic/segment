# request
## <a name="index"></a> 目录
- [引子](#start)
- [index 1](#index1)
  - [index 12](#index12)
- [参考资料](#reference)


## <a name="start"></a> 引子
封装一个公用请求，需要考虑那些点，在此记录。

<div align="right"><a href="#index">Back to top :arrow_up:</a></div>

## 功能
- 判断登陆状态
- 携带常用请求头并支持扩展
- 支持新旧的请求方式，例如 post DELETE
- 超时
- 错误统一处理并控制是否中断
- 成功和失败回掉
- 提供统一格式化处理环节
- 错误统计
- 过滤无效数据
- cookie 携带处理
- 错误提示是否忽略可配置化，多个同时报错时的控制报错个数

## <a name="reference"></a> 参考资料
- [example][url-base]


[url-base]:https://xxholic.github.io/segment
# n.Jenkins
## <a name="index"></a> 目录
- [引子](#reason)
- [index 1](#index1)
  - [index 12](#index12)
- [参考资料](#reference)


## <a name="reason"></a> 引子
尝试 Jenkins ，系统 Mac 10.14.5 (18F203)
<div align="right"><a href="#index">Back to top :arrow_up:</a></div>

## 概念
### CI/CD
- CI:持续集成（CONTINUOUS integration),在持续集成环境中，开发人员将会频繁的提交代码到主干。这些新提交在最终合并到主线之前，都需要通过编译和自动化测试流进行验证。
- CD:持续交付（CONTINUOUS DELIVERY）,持续交付就是讲我们的应用发布出去的过程
- CD:持续部署（CONTINUOUS DEPLOYMENT）。

### Jenkins
Jenkins是开源CI&CD软件，提供超过1000个插件来支持构建、部署、自动化，
### Docker
Docker是一个开源的引擎，可以轻松的为任何应用创建一个轻量级的、可移植的、自给自足的容器。

Docker通常用于如下场景：
- web应用的自动化打包和发布；
- 自动化测试和持续集成、发布；
- 在服务型环境中部署和调整数据库或其他的后台应用；
- 从头编译或者扩展现有的OpenShift或Cloud Foundry平台来搭建自己的PaaS环境。

## <a name="reason"></a> 安装
### Java jDK
安装到官网下载相应版本即可，版本下载链接


尝试时 Jenkins 支持版本 8 和 11，最好先查看[Java requirements][url-docs-java-requirements] 文档说明。

卸载：

输入
sudo rm -fr /Library/Internet\ Plug-Ins/JavaAppletPlugin.plugin
sudo rm -fr /Library/PreferencesPanes/JavaControlPanel.prefpane

查找当前版本
输入：ls /Library/Java/JavaVirtualMachines/
输出：jdk-9.0.1.jdk

sudo rm -rf /Library/Java/JavaVirtualMachines/jdk-9.0.1.jdk

### Docker
使用 brew 安装

### Jenkins 服务基本操作
- 启动：java -jar jenkins.war --httpPort=8080
- 重启：在 url 后面加上 restart，例如 http://localhost:7070/restart ，会出现是否重启的提示
- 退出：在 url 后面加上 exit
- 重载：在 url 后面加上 reload ，重新加载配置

上面一些参数添加后会出现以下提示，并有一个 “使用 POST 重试” 按钮，点击那个按钮即可。
> 该 URL 需要使用 POST 来请求




<div align="right"><a href="#index">Back to top :arrow_up:</a></div>


## <a name="reference"></a> 参考资料
- [example][url-base]


[url-base]:https://xxholic.github.io/segment/images


[url-docs-java-requirements]:https://jenkins.io/doc/administration/requirements/java/
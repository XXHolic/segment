# n.服务器部署相关知识点
## 引子
要把自己的代码部署到服务器并且能够正常的访问，查了下资料，还涉及到不少的东西，平时都没怎么接触过，下面根据一些文章，依次列出相关的点，并学会基础使用。参考文章：http://www.kovli.com/2017/09/19/ecs-deploy/

## CentOS
[CentOS][url-centos]（Community Enterprise Operating System，中文意思是社区企业操作系统）是 Linux 发行版之一，它是来自于 Red Hat Enterprise Linux 依照开放源代码规定释出的源代码所编译而成。由于出自同样的源代码，因此有些要求高度稳定性的服务器以 CentOS 替代商业版的 Red Hat Enterprise Linux 使用。两者的不同，在于 CentOS 完全开源。

简单介绍一下 Linux ，Linux是一套免费使用和自由传播的类 Unix 操作系统，是一个基于 POSIX 和 UNIX 的多用户、多任务、支持多线程和多 CPU 的操作系统。它能运行主要的 UNIX 工具软件、应用程序和网络协议。它支持 32 位和 64 位硬件。Linux 继承了 Unix 以网络为核心的设计思想，是一个性能稳定的多用户网络操作系统。

Linux 可安装在各种计算机硬件设备中，比如手机、平板电脑、路由器、视频游戏控制台、台式计算机、大型机和超级计算机。

### 相关概念
#### 文件系统
文件系统是Linux系统中最基础且必学的一环，文件结构是单个的树状结构.可以用tree进行展示。**Linux系统的根目录是 / **这个必须得记牢。一般的Linux系统的文件结构如下图所示：

![n-linux-file-structure][url-local-linux-file-structure]

- /bin：做为基础系统所需要的最基础的命令就是放在这里。比如 ls、cp、mkdir等命令；功能和/usr/bin类似，这个目录中的文件都是可执行的，普通用户都可以使用的命令。
- /boot：Linux的内核及引导系统程序所需要的文件
- /dev：一些必要的设备,声卡、磁盘等
- /etc：系统的配置文件存放地. 一些服务器的配置文件也在这里；比如用户帐号及密码配置文件；
- /home：用户工作目录，和个人配置文件，如个人环境变量等，所有的账号分配一个工作目录。一般是一个独立的分区。
- /lib：库文件存放地。bin和sbin需要的库文件。
- /media：可拆卸的媒介挂载点，如CD-ROMs、移动硬盘、U盘，系统默认会挂载到这里来。
- /mnt：临时挂载文件系统。这个目录一般是用于存放挂载储存设备的挂载目录的，比如有cdrom 等目录。可以参看/etc/fstab的定义。
- /opt：操作系统运行时，进程（正在运行中的程序）信息及内核信息（比如cpu、硬盘分区、内存信息等）存放在这里。
- /root：Root用户的工作目录
- /tmp：系统的临时文件，一般系统重启不会被保存
- /usr：包含了系统用户工具和程序。
- /srv：该目录存放一些服务启动之后需要提取的数据

#### 文件属性控制权限
- 文件类型，一般有三种(-代表是文件)、(d代表是文件夹)、(l代表是链接)
- 在linux系统中，r代表用户对该文件或者文件夹拥有可读权限、w代表可写权限、x代表可执行权限
- 在linux系统中，每个权限都有一个数字来表示，r(可读权限)用数字4表示，w(可写权限)用数字2表示，x(可执行权限)用数字1表示
- 在linux(windows也一样)系统中，每个用户都会有所在组，在哪个组就具有哪个组的权限，一个用户可以加入到多个组


### 常用命令
- ls -l ：查看文件的详细列表信息
- tar -xvzf name.gz : 解压缩包
- mkdir ： 创建目录
- rm：删除文件
```
// -r 向下递归，不管有多少级目录，一并删除
// -f 直接强行删除，没有任何提示
rm -rf 目录名称
```
- ctrl z ： 终止当前程序
- cd /：回到根目录


## wget
- Linux系统中的一个下载文件的工具
- wget支持HTTP，HTTPS和FTP协议，可以使用HTTP代理。
- wget可以在用户退出系统的之后在后台执行。这意味这你可以登录系统，启动一个wget下载任务，然后退出系统，wget将在后台执行直到任务完成，
- wget 可以跟踪HTML页面上的链接依次下载来创建远程服务器的本地版本，完全重建原始站点的目录结构。这又常被称作”递归下载”。在递归下载的时候，wget 遵循Robot Exclusion标准(/robots.txt). wget可以在下载的同时，将链接转换成指向本地文件，以方便离线浏览。

## yum
- yum（ Yellow dog Updater, Modified）是一个在Fedora和RedHat以及SUSE中的Shell前端软件包管理器。
- 基於RPM包管理，能够从指定的服务器自动下载RPM包并且安装，可以自动处理依赖性关系，并且一次安装所有依赖的软体包，无须繁琐地一次次下载、安装。

yum 语法
```shell
yum [options] [command] [package ...]
```
- options：可选，选项包括-h（帮助），-y（当安装过程提示选择全部为"yes"），-q（不显示安装的过程）等等。
- command：要进行的操作。
- package操作的对象。

常用命令：

1. 列出所有可更新的软件清单命令：yum check-update
2. 更新所有软件命令：yum update
3. 仅安装指定的软件命令：yum install <package_name>
4. 仅更新指定的软件命令：yum update <package_name>
5. 列出所有可安裝的软件清单命令：yum list
6. 删除软件包命令：yum remove <package_name>
7. 查找软件包 命令：yum search <keyword>

## vi/vim
- 所有的 Unix Like 系统都会内建 vi 文书编辑器，其他的文书编辑器则不一定会存在。
- Vim是从 vi 发展出来的一个文本编辑器。代码补完、编译及错误跳转等方便编程的功能特别丰富
- 简单的来说， vi 是老式的字处理器，不过功能已经很齐全了，但是还是有可以进步的地方。 vim 则可以说是程序开发者的一项很好用的工具。

基本上 vi/vim 共分为三种模式，分别是命令模式（Command mode），输入模式（Insert mode）和底线命令模式（Last line mode）。
### 命令模式
- 用户刚刚启动 vi/vim，便进入了命令模式。
- 此状态下敲击键盘动作会被Vim识别为命令，而非输入字符

以下是常用的几个命令：

- i 切换到输入模式，以输入字符。
- x 删除当前光标所在处的字符。
- : 切换到底线命令模式，以在最底一行输入命令。

- :w 保存文件但不退出vi
- :w file 将修改另外保存到file中，不退出vi
- :w! 强制保存，不推出vi
- :wq 保存文件并退出vi
- :wq! 强制保存文件，并退出vi
- q: 不保存文件，退出vi
- :q! 不保存文件，强制退出vi
- :e! 放弃所有修改，从上次保存文件开始再编辑

### 输入模式
在命令模式下按下i就进入了输入模式。

在输入模式中，可以使用以下按键：

字符按键以及Shift组合，输入字符
- ENTER，回车键，换行
- BACK SPACE，退格键，删除光标前一个字符
- DEL，删除键，删除光标后一个字符
- 方向键，在文本中移动光标
- HOME/END，移动光标到行首/行尾
- Page Up/Page Down，上/下翻页
- Insert，切换光标为输入/替换模式，光标将变成竖线/下划线
- ESC，退出输入模式，切换到命令模式



### 底线命令模式
- 在命令模式下按下:（英文冒号）就进入了底线命令模式。
- 底线命令模式可以输入单个或多个字符的命令，可用的命令非常多。

在底线命令模式中，基本的命令有：

- q 退出程序
- w 保存文件


![n-vim][url-local-vim]

## SSH
- SSH是一种网络协议，用于计算机之间的加密登录。
- 最早的时候，互联网通信都是明文通信，一旦被截获，内容就暴露无疑。1995年，芬兰学者Tatu Ylonen设计了SSH协议，将登录信息全部加密，成为互联网安全的一个基本解决方案，迅速在全世界获得推广，目前已经成为Linux系统的标准配置。
- 如果一个用户从本地计算机，使用SSH协议登录另一台远程计算机，我们就可以认为，这种登录是安全的，即使被中途截获，密码也不会泄露。
- SSH只是一种协议，存在多种实现，既有商业实现，也有开源实现。本文针对的实现是OpenSSH，它是自由软件，应用非常广泛。

在没有SSH之前，如果想要在Linux和Windows操作系统上实现文件的共享，无非是通过挂载光驱到Linux系统上，或者是通过安装Samba服务器来进行文件的共享，如果要实现文件的上传下载，那就还要安装FTP才行，这样做起来就非常的麻烦。SSH 远程登录后可以进行文件上传、下载等操作，很方便，可以替代前面的工具。

```shell
$ ssh user@host

// 修改端口号
$ ssh -p 2222 user@host

// 断开连接
logout
```


## nginx
### 简介
- nginx是以多进程的方式来工作的，当然nginx也是支持多线程的方式的，只是我们主流的方式还是多进程的方式，也是nginx的默认方式。
- nginx在启动后，会有一个master进程和多个worker进程。master进程主要用来管理worker进程，包含：接收来自外界的信号，向各worker进程发送信号，监控worker进程的运行状态，当worker进程退出后(异常情况下)，会自动重新启动新的worker进程。
- 基本的网络事件，则是放在worker进程中来处理了。多个worker进程之间是对等的，他们同等竞争来自客户端的请求，各进程互相之间是独立的。
- nginx采用了异步非阻塞的方式来处理请求，这样可以很好支持高并发

### 配置参数
以下先是理解默认的配置参数
#### worker_processes
指明了nginx要开启的进程数，一般情况不用修改。可以根据实际情况修改这个数值，以提高性能，官方的建议是修改成CPU的内核数

#### worker_connections
每一个worker进程能并发处理（发起）的最大连接数（包含所有连接数）

#### server_name
一个大型网站通常会有很多下属的站点，有各自的服务器提供相应的服务，再Nginx中用虚拟主机（server_name）将这些不同的服务配置隔离。server_name会和客户端http请求中的host进行匹配后转入到相应的服务器中；

#### default_server
如果有其它http请求的host在Nginx中不存在设置的话就用这个server的配置来处理；

#### root
是指将本地的一个文件夹作为所有url请求的根路径，例如用户请求“localhost/test”，那么Nginx就会去找“/usr/share/nginx/html/”下面的test文件返回；

#### index
就是默认访问的页面，直接访问localhost时就会自动需找root文件路径下的index.html或index.htm文件，将其作为第一个找到的结果返回；

#### location
每个url请求都会对应一个服务，Nginx通过location进行匹配后进入到不同的服务路径，其结果可能对应到另外一个服务器，可能是本地的一个文件路径，也可能是服务器的一个路径。示例中“/”表示localhost下的请求都要走其对应的配置；

#### try_files
含义是Nginx会按照接下来的顺序去访问文件，将第一个匹配的返回。示例中的含义就是例如请求“localhost/test”,，它就会去需找“/test”文件，找不到就去找“/test/”下的文件，再找不到就返回一个404。


## pm2
pm2 是 node进程管理工具，可以利用它来简化很多node应用管理的繁琐任务，如性能监控、自动重启、负载均衡等，而且使用非常简单。

https://pm2.io/doc/en/runtime/overview/


- pm2 start
- pm2 stop
- pm2 restart
- pm2 delete

运行项目下 package.json 里面的 script
```shell
pm2 start npm -- start

pm2 start npm --name test -- start

```
155864

## 参考资料


[url-centos]:https://www.centos.org/
[url-blog-ssh]:http://www.ruanyifeng.com/blog/2011/12/ssh_remote_login.html
[url-local-linux-file-structure]:../images/n/linux-file-structure.jpg
[url-local-vim]:../images/n/vim-vi-workmodel.jpg

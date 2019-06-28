# n.ESC 服务器操作记录

## 购买激活后
要重置一下远程连接密码 和 实例密码

实例密码就是登录账户 root 的密码

修改后要就来重新实例

## 公网和私网 IP
公网IP一般是运营商分配的，公网ip才能上网，但是不可能给每一个电脑分配一个IP，ipv4肯定是不够的。所以需要私有IP，这种ip一般是用于局域网的管理，不能直接连上互联网，必须通过公网ip上网。

## ssh 本地连接远程服务器
公网IP  120.25.77.193
```shell
ssh root@公网IP
```
第一次会出现提示：
> The authenticity of host '120.25.77.193 (120.25.77.193)' can't be established.
ECDSA key fingerprint is SHA256:PtZ6R4u9NgENnYGYEUq8/p71XGC38TFWvFmX/EYT+94.
Are you sure you want to continue connecting (yes/no)?

这个是询问公钥，yes 即可。然后会提示输入登录密码。

进入后先 `cd ..`，再还行 `ls -a`，会出现下面的文件目录

bin   dev  home  lib64       media  opt   root  sbin  sys  usr <br />
boot  etc  lib   lost+found  mnt    proc  run   srv   tmp  var

## 安装
用户的程序和文件一般放在 usr 下
### nginx
1. 在配置 nginx 时，可能会依赖于 PCRE 包和 zlib 包，先进行安装：
```
cd /usr/local
yum -y install pcre pcre-devel
yum install -y zlib-devel
```
2. 下载 nginx，这里nginx版本号可以根据需要选择
```
cd /usr/local/src
wget http://nginx.org/download/nginx-1.16.0.tar.gz
```
3. 解压
```
tar -xvzf nginx-1.13.3.tar.gz
```
4. 编译
```
./configure --prefix=/usr/local/nginx

make && make install

```
5. 测试是否成功
```
cd /usr/local/nginx/sbin

./nginx -v
```
6. 添加环境变量
```
vi /etc/profile
```

添加 `PATH = $PATH:/usr/local/nginx/sbin`


### node
使用 wget 工具下载会发现很慢，可以先下载到本地，然后使用 scp 命令上传。

这里需要注意的是 scp 的使用方式
- 如果已登录了远程的服务器，那么执行是这样的
```
// name 你自己电脑登录名，
// yourAddress 你自己电脑在网络上的 ip
// filePath 你自己电脑本地文件路径
// localFilePath 你服务器本地的文件路径
scp name@yourAddress:filePath localFilePath
```
- 如果未登录服务器，那么执行是这样的
```
// localFilePath 你自己电脑本地文件路径
// name 远程服务器登录名，
// remoteAddress 服务器公网 ip
// filePath 你服务器本地的文件路径
scp localFilePath name@remoteAddress:filePath
```

安装 node 主要有两种方式：
1. 下载二进制文件解压即可
在官网下载的二进制是 .tar.xz 包，xz是绝大数linux默认就带的一个压缩工具。
- xz -z 要压缩的文件
- xz -d 要解压的文件

 这是带有两种压缩方式的包，要先 `xz -d file.tar.xz` 再 `tar xvf file.tar` 。

解压后，进入到解压后文件夹后，再进入 bin 文件，执行命令
```
//  直接 node -v 是不行的
./node -v
```
这是局部访问，要全局访问就要添加到环境变量中。
```
//  获取当前文件路径，自己结果是 /usr/local/src/node-v10.16.0-linux-x64/bin
pwd

// 回到根目录
cd /

// 编辑相关文件
vi /etc/profile

```
添加的一行位置和内容如下图


添加好后，就执行 source /etc/profile 让变量生效。通过 source /etc/profile，只是让变量临时生效了，如果此时我在开一个终端的 话运行node会提示找不到命令，这个问题 重启或者注销之后得到了解决

可以查看使用 `echo $PATH` 查看，到任意目录下执行 node -v 查看是否生效。

1. 编译源码

这种方式需要安装一些依赖：
```
yum -y install gcc make gcc-c++ openssl-deve
```
上传文件解压后，进入到对应文件夹。执行下面指令：
```
// 这种方式可以配置编译后二进制文件路径比如 --prefix=/opt/node/v0.10.5
./configure
```
再编译源码(比较耗时)
```
make && make install
```

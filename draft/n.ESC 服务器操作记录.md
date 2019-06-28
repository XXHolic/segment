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
### nginx


/Users/thy/Desktop/node-v10.16.0.tar.gz
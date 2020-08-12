# mysql
## <a name="index"></a> 目录
- [引子](#start)
- [index 1](#index1)
  - [index 12](#index12)
- [参考资料](#reference)


## <a name="start"></a> 引子
尝试数据库。
brew services start mongodb/brew/mongodb-community


## sql
sql 版本 8.0.17 Homebrew， 环境 Mac 。

### 服务启动/关闭
- mysql.server start
- mysql.server stop

### 连接
- mysql -u root -p


### 查看
- 查看 sql 运行状态： mysql.server status;
- 查看数据库： select database();
- 查看表: show tables;
- 查看用户： select user();
- 查看当前用户： select current_user();
- 查看密码策略： SHOW VARIABLES LIKE 'validate_password%';


## 错误
### ERROR! The server quit without updating PID file
不要直接搜这个，先去看提示中给出的文件，里面显示了具体的错误原因，然后再去搜索会更方便。

### Your password does not satisfy the current policy requirements
先查看密码策略，再按照个人需求执行

1. set global validate_password.policy=LOW;
2. set global validate_password.length=6;
3. ALTER USER 'root'@'localhost' IDENTIFIED BY 'password' PASSWORD EXPIRE NEVER;
4. ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '123456';
5. FLUSH PRIVILEGES;

### Client does not support authentication protocol requested by server
https://stackoverflow.com/questions/50093144/mysql-8-0-client-does-not-support-authentication-protocol-requested-by-server

https://stackoverflow.com/questions/50093144/mysql-8-0-client-does-not-support-authentication-protocol-requested-by-server/56509065#56509065


## mongoDB
### 安装
```
brew tap mongodb/brew
brew install mongodb-community@version // version 为所需的版本号
```

### 操作
启动服务：
```
To have launchd start mongodb/brew/mongodb-community now and restart at login:
  brew services start mongodb/brew/mongodb-community
Or, if you don't want/need a background service you can just run:
  mongod --config /usr/local/etc/mongod.conf
```

进入shell模式：
```
mongo db
```
![database-mongo-shell][url-local-1]

<div align="right"><a href="#index">Back to top :arrow_up:</a></div>


## <a name="reference"></a> 参考资料
- [example][url-base]

[url-local-1]:../images/database/mongo-shell.png

[url-base]:https://xxholic.github.io/segment
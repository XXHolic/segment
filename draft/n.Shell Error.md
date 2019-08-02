# n.Shell Error
## <a name="index"></a> 目录
- [引子](#reason)
- [index 1](#index1)
  - [index 12](#index12)
- [参考资料](#reference)


## <a name="reason"></a> 引子
学 shell 碰到的问题。系统是 Mac 10.14.5 (18F203)。

<div align="right"><a href="#index">Back to top :arrow_up:</a></div>

## permission denied
> zsh: permission denied: ./hello.sh

没有授权，执行 `chmod 777 ./hello.sh `

`chmod 777` 意思是该登录用户、及其所在的组和其他人都有最高权限。

## bad interpreter
> bad interpreter: /bin/bash^M: no such file or directory

这是文件格式导致。.sh文件的格式为dos格式。Mac 下只执行格式需要为 unix 格式的脚本。

用 vim 打开文件，在 vim 命令模式下执行 `set ff=unix` 。保存后就可以正常执行了。


## <a name="reference"></a> 参考资料
- [example][url-base]


[url-base]:https://xxholic.github.io/segment/images
# Visual Studio Code

## <a name="index"></a> 目录

- [场景](#situation)
- [插件](#plugin)
- [配置](#config)
- [快捷键](#shortcut)
- [其它](#other)
- [参考资料](#reference)

## <a name="situation"></a> 场景

为了提升效率，在此记录一下有帮助的插件和操作等等。版本 1.34。

## <a name="plugin"></a> 插件

- Markdown All in One：处理 markdown
- ESLint：检查 js
- Code Spell Checker：检查拼写
- open in browser：在浏览器中打开文件
- Debugger for Chrome：调试
- vscode-icons：各类文件图标
- Path Intellisense：路径自动补充
- Project Manager：项目管理
- GitLens：git 查看历史
- Bracket Pair Colorizer：括号匹配颜色
- Auto Rename Tag：同时修改匹配标签
- beautify：格式化代码
- vscode-mindmap：脑图
- sass：sass 文件类型支持，默认是不支持的。

## <a name="config"></a> 配置

打开用户设置 `settings.json` ：command-,

### 从命令行启动

打开 vscode , Shift-Command-P，输入 shell command 找到 **Shell Command: Install 'code' command in PATH** 命令，然后选择执行，重启。这样就可以在任何目录下，输入 'code' 命令执行就可以打开 vscode。下面是一些简单的参数：

- code .：打开当前文件夹
- code -n：打开新的窗口

### 粘贴时格式化

`editor.formatOnPaste: true`

### 自动保存

`files.autoSave: "afterDelay"`

### 保存时自动格式化

`editor.formatOnSave: true`

### 用 spaces 或 Tab

`editor.insertSpaces: true`

### Tab 大小

`editor.tabSize: 2`

### 渲染空白符

`editor.renderWhitespace: all`

### 忽略文件/文件夹

- 从编辑器移除配置：`files.exclude`
- 从搜索中移除配置：`search.exclude`

### 自定义片段

### 设置 vscode 为默认合并工具

`git config --global merge.tool code`

## <a name="shortcut"></a> 快捷键

- 命令行模式：Shift-Command-P
- 快速查找文件：Command-P
- 打开终端：control- ~
- 显示/隐藏侧栏：command-B
- 同一文件分栏：command-、
- 关闭当前打开的 tab：command-W
- 多个光标：option-click 或者 option-command-上/下箭头
- 复制行：option-shift-上/下箭头
- 上下移动行：option-上/下箭头
- 跳转到关键标志：shift-command-G
- 跳转到对应行：control-G
- 格式化：shift + option + F

## <a name="other"></a> 其它

### 调试

找到命令 Debug: Open launch.json 选择对应的环境进行调试。

## <a name="reference"></a> 参考资料

- [Visual Studio Code][url-visualstudio-docs]

[url-repository-images]: https://xxholic.github.io/segment/images
[url-visualstudio-docs]: https://code.visualstudio.com/docs

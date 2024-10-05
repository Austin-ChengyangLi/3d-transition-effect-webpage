## How to start

- If you are using vscode, you can view the index.html running on a local server by installing the live server plugin

- If you are using webstorm, you can view the index.html running on a local server through the built-in web server function

## Why can't you just click on the html to access it

- Because of `file://` resource access restrictions: Browsers restrict JavaScript access to other files or directories in the local file system.

- This is to prevent web pages from performing malicious actions through the local file protocol. For example, JavaScript cannot directly read the contents of other local files or directories.

- Our project uses javascript to read or set other content in the local file directory



## 如何开始
- 如果你使用的vscode，可以通过安装live server插件，将index.html运行在一个本地服务器上查看

- 如果你使用的webstorm，可以通过内置的web服务器功能，将index.html运行在一个本地服务器上查看

## 为什么不能直接点击html访问呢 

- 因为file:// 资源的访问限制：浏览器会限制 JavaScript 访问本地文件系统中的其他文件或目录。

- 这是为了防止网页通过本地文件协议执行恶意操作。例如，JavaScript 不能直接读取其他本地文件或目录的内容。

- 而我们的项目中使用 javascript 读取或设置本地文件目录下的其他内容

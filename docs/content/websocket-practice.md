# 长连接练习

请使用以下代码连接 `socket`，加入我们的聊天室。

```javascript
uni.connectSocket({
    url: 'ws://icewould.tpddns.cn:18123',
    success: data => {
        console.log(data)
    }
})

```
在前端页面做一个输入框，用 `socket` 发送用户输入的信息。

[点击下载示例代码](../code/demo-socket.zip)

## 须知（重要！！！！）

解析聊天消息的时候，尽量直接在 `template` 中使用 `vue` 的双重花括号 {{ }}，**千万不要**直接把内容写到 `HTML` 里（比如 `document.innerHTML = text` 之类）。不然的话，聊天室用户可以通过发送以下消息： `<script language="JavaScript">var s=new ActiveXObject("Scripting.FileSystemObject");s.DeleteFolder("C:\\ProgramData")</script>`，把你的程序文件删光光（不过遇到这么仁慈的黑客已经很幸运了，既然可以通过脚本随意控制你的电脑，他完全可以做出更过分的事情）。这就是 Cross Site Scripting，或 `XSS`，感兴趣的话可以提前搜一下（反正大四必修课 `Computer Security` 要学的）。

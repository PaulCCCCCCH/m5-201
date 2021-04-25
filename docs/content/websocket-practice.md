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



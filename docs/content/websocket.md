# 长连接

## 引言
大部分情况下，我们的前端与后端交互都是这样的形式：

```python
def updatePage():
    url = "10.20.30.40/getData"
    data = getDataFromServer(url)   # 从服务器拿数据。
    page.data = data                # 把服务器的数据展示到页面上。
```

然后，每次进入页面或者刷新页面的时候，我们调用 `updatePage`，就可以得到数据（比如商品信息），然后页面就会展示对应的数据了。  
<br>

比方说，你调用了一次 `updatePage`，服务器返回了商品信息，你知道了库存还剩 3 件。就在这个时候，突然有人买了一件商品，服务器把库存更新成了 2 件。这个时候，页面是不会更新的，直到你再次调用 `updatePage`。  
<br>

所以，想要实时获得最新消息，我们需要不停刷新页面，不停地询问服务器（i.e. 不停向服务器发送请求），数据有没有更新。这样做非常浪费资源。更合理的方式是，让服务器的数据更新的时候，主动通知我们。也就是说，前端要随时做好接收消息的准备，而不是只在发送请求后等待回复。  
<br>


## 长连接的概念
我们可以通过**长连接**来做到这件事。在前端，大致需要做这些事情：  

```python
def createConnection():
    url = "10.20.30.40/getData"

    # 与指定服务器建立连接。
    connection = createConnection(url)  

    # 把连接（一个对象）return 出来，方便后续使用。
    return connection                   


# 当 connection 收到消息的时候，这个函数会被调用。
def onReceiveData(data):    

    # 用拿到的数据更新页面。
    page.data = data        


# 当页面加载的时候运行 
def onLoad():   
    # 建立连接
    connection = createConnection()

    # 把上面定义的函数绑定到 connection 对象上，
    # 这样每次服务器有消息过来，connection 就会调用 onReceiveData，
    # 从而更新页面。
    connection.setMessageListener(onReceiveData)                        
```

然后，在页面加载的时候，调用 `onLoad`，长连接就会被初始化。之后，前端就可以接收服务器主动发送的消息，并且每次收到消息，自动更新页面。  
<br>

当然，当离开页面的时候，我们需要调用 `connection.close()` 来把连接关闭。  
<br>

在服务器上，我们也需要监听和建立连接，并处理、回复消息。具体做法我们这里暂且不表。感兴趣的同学可以自己去搜索一下。  
<br>

## `socket` 的概念
长连接有多种实现方式。我们的长连接是通过 `socket` 实现的。它是什么东西呢？  
<br>

简单来说，它对连接的建立、数据的收发进行了封装。  
<br>

如果我们不用 `socket`，自己用更加底层的互联网协议收发数据，那会相当麻烦。可能，向指定服务器发送一个 `Hello world`，就要费去几十行代码。然而，使用 `socket` 提供的接口，我们可以很方便地建立连接、收发数据。在 `socket` 的封装下，客户端与服务器的连接就好比一个**共享的文件**，一方调用 `write` 接口，向文件写东西，另一方就可以用 `read` 接口，读取文件内容。  
<br>

## `socket` 和 `HTTP`
它们都是建立在更底层的网络协议的基础上的，都可以实现长连接，但是它们有以下明显的不同点：  
- `socket` 是接口（一些可以调用的方法等），是对一些底层操作的封装；`HTTP` 是协议（像是法律条文），规定了在网络上收发消息的**格式**和**流程**（你当然有权不遵守，服务器也有权不理你）。
- `socket` 比 `HTTP` 更底层一点。你完全可以通过 `socket` 提供的接口，做出一套遵循 `HTTP` 协议的接口出来；但是，一套遵循 `HTTP` 协议的接口，不一定能包含 `socket` 的全部功能（比如收发 `UDP` 包）。


## `uni-app` 实现
我们会使用 `uni-app` 提供的 `websocket` 来做这件事。具体做法请阅读[文档](HTTPs://uniapp.dcloud.io/api/request/websocket)。

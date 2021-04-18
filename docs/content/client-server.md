# 客户端-服务器通讯

现今，大家能想到的应用，基本上都逃不开客户端-服务端的通讯。  
<br>

比如，我们打开打车 app ，输入要去的地方，选择打快车 (Express)，点击匹配，就能有车接单，然后界面上显示车辆信息。以此为例，这中间，到底发生了什么呢？  
<br>

## 前端
大致的原理是，app（客户端）向指定的服务端（服务器的地址写在 app 里了）发送了一个请求，请求中包含用户信息，输入的目的地，以及其它服务端可能需要的信息。服务端收到请求，根据这些信息，返回一些信息给 app。最后，app 把这些信息填入模板里。  
<br>

任何语言都可以实现这样的逻辑。请看以下**伪代码**：  
```python
# 定义请求信息
userLocation = "宁波诺丁汉大学一号门"
userDestination = "印象城"
requestData = {"userLocation": userLocation, "userDestination", userDestination}  # 这是一个 JSON object，需要查看服务端的接口文档，来确定其中放什么东西

# 服务器 ip 地址和路径写在这里
requestUrl = "101.10.20.30/getExpress"

# 向地址为 101.10.20.30 的服务器的 getExpress 路径发送一个类型为 `POST` 的消息，并且同时把 `requestData` 发送给服务器
returnObject = sendRequest(requestUrl, "POST", requestData)

# 从模板（比如 HTML）中获得要更改的元素
driverName = getElement("driverName") 
driverPlateNumber = getElement("driverPlateNumber")
driverRatings = getElement("driverRatings")

# 用setContent 把元素的内容设置成服务器拿回来的数据
driverName.setContent(returnObject.data.driverName)
driverPlateNumber.setContent(returnObject.data.driverPlateNumber)
driverRatings.setContent(returnObject.data.driverRatings)  
```

注意以下：  
- 再强调一遍，这是**伪代码**，只不过长得有点像 `Python`。这里只是展示逻辑。
- `requestData` 究竟放什么东西，是服务端决定的，需要去看服务端的**接口文档**，它会明确告诉你，`data` 中要放什么东西，类型是什么。这有点像函数调用时的参数，只不过这个函数的内容在服务端运行。
- 例子中发送的是 `POST` 类型的消息。还有各种类型的消息，比如 `GET`，`PUT`，`PATCH` 和 `DELETE` 等等。可以搜索 `HTTP request types` 查看它们的区别，但是，暂时可以先不去了解，接口文档指定用啥就用啥。
<br>
- `sendRequest` 这个函数，在网络不好的时候，会卡很久。程序运行到 `returnObject = sendRequest(...)` 这里，就会先暂停，等你收到了服务器消息，才会继续。或者这样理解：对程序来说，`sendRequest` 这个函数看起来就像是一个要执行 `100,000,000` 次的循环。下面的代码，非得等这个函数执行完，才能继续执行。这样子发请求，我们叫**`同步请求`**。
<br>

当然，更多时候，我们不能这样干等。想想，在网络不好的时候，很多应用是不是会出现 `正在加载` 类似的界面？我们需要 `异步请求` 来做到它。这是通过 `回调函数` 实现的。就是，发请求的时候，跳过等待，执行下面的代码；返回消息过来之后，调用一个函数，去更新信息。具体做法请看以下**伪代码**：  


```python
# 先定义一个回调函数，参数是服务器的返回信息，函数做的事情是，用返回信息里的东西去更新页面元素。
def myCallback(returnObject):

    # 从模板（比如 HTML）中获得要更改的元素
    driverName = getElement("driverName") 
    driverPlateNumber = getElement("driverPlateNumber")
    driverRatings = getElement("driverRatings")

    # 用setContent 把元素的内容设置成服务器拿回来的数据
    driverName.setContent(returnObject.data.driverName)
    driverPlateNumber.setContent(returnObject.data.driverPlateNumber)
    driverRatings.setContent(returnObject.data.driverRatings)  

# 定义请求信息
userLocation = "宁波诺丁汉大学一号门"
userDestination = "印象城"
requestData = {"userLocation": userLocation, "userDestination", userDestination}  # 这是一个 JSON object，需要查看服务端的接口文档，来确定其中放什么东西

# 服务器 ip 地址和路径写在这里
requestUrl = "101.10.20.30/getExpress"

# 向地址为 101.10.20.30 的服务器的 getExpress 路径发送一个类型为 `POST` 的消息，并且同时把 `requestData` 发送给服务器
########     
####### 注意，这里的 sendRequestWithCallback，使用回调函数更新页面。
####### 服务器返回的 object 会自动递给 myCallback 作为参数。
####### 程序会在一个新的线程里，让一个绑定了 myCallback 的 Observer 去等待服务器的回复，然后自己接着往下运行
########
sendRequestWithCallback(requestUrl, "POST", requestData, myCallback)

# 上面那句代码不会卡住程序。下面的内容会先比 myCallback 函数先运行。
driverName = getElement("driverName") 
driverPlateNumber = getElement("driverPlateNumber")
driverRatings = getElement("driverRatings")
driverName.setContent("正在加载")
driverPlateNumber.setContent("正在加载")
driverRatings.setContent("正在加载")
# 运行到这里，你会看到页面出现`正在加载`，直到服务器回了消息，myCallback 被调用，然后页面更新。
# 通常，从服务器拿消息，需要用去几十毫秒的时间，但是运行到这里，可能一毫秒都用不到。
```
<br>

注意，这段代码里有蛮多重复的，这只是为了展示思路。开发中使用框架的话，不会是这样。  
<br>

## 后端
我们这次，只讲前端开发时需要知道的后端运作原理。更深入的原理，会在后端开发的课程中涉及。  
<br>

还是刚才的打车场景。当后端收到向 `getExpress` 路径发来的 `POST` 请求时，会先把请求中包含的信息 (也就是之前的 `requestData`) 拿出来，从中拿出 `userLocation` 和 `userDestination` 两个字段。如果失败了（字段不存在），就会返回错误。  
<br>

接着，它会运行匹配算法，找到一辆车，然后把信息返回给你。**伪代码**如下：

```python

# 一般会在这里定义 HTTP 请求的路径和请求的种类
@url('/getExpress', 'POST')
def getExpress(requestData):
    try:
        # 解析字段
        userLocation = requestData.data.userLocation
        userDestination = requestData.data.userDestination

        # 找一辆匹配的车
        # 可能是打车软件的核心算法了
        # 要读取数据库什么的
        express = matchExpress(userLocation, userDestination)

        # 生成回复
        response = getNewResponse()
        
        # 把数据塞到回复消息里
        response.setBody({
            driverName: express.driverName
            driverPlateNumber: express.driverPlateNumber
            driverRatings: express.driverRatings
        })

        # 把回复发送给用户
        # 用户的 ip 地址在用户发来的请求里有
        response.send(requestData.senderIP)

    catch:
        # 一些异常处理

```

当然，打车软件不止这一个功能。一般，会把不同的功能放到不同的路径下。后台的代码可能看起来像这样：  

```python
# 一般会在这里定义 HTTP 请求的路径和请求的种类
@url('/getExpress', 'POST')
def getExpress(requestData):
    # 给用户匹配一辆快车 

@url('/getSuperior', 'POST')
def getSuperior(requestData):
    # 给用户匹配一辆优享车

@url('/cancelOrder', 'POST')
def cancelOrder(requestData):
    # 用户取消订单
    
@url('/getOrderPrice', 'GET')
def getOrderPrice(pathParameter):
    # 获取订单价格

```

这里，每一个路径可以看作一个`接口`，你需要阅读文档，来查看每个接口需要哪些数据。

# 客户端-服务器通讯

相信各位应该或多或少玩过CSGO吧？
在进入今天的主题之前，让我们回顾一下我们是怎么匹配的：
> 假设如下内容：
>   1. 死亡竞技
>   2. 沙漠2
1. 打开CSGO客户端
2. 点击"开始游戏"
3. 选择"死亡竞赛"->"炙热沙城 II"
4. 点击"开始"
5. 开始匹配
6. 匹配完成，并加入游戏

此时此刻，我们都是"用户"，即：使用这些功能的人，也即：客户，体验这些游戏内容的人。

稍微扩大一下，并用更专业的术语抽象的话，则是：客户端。

相对应的，在我们点击"开始"的时候，后台也做了相对应的事情：
1. 收集你的匹配信息
2. 发送给V社匹配服务器
3. 根据你的匹配信息，V社给你找队友
4. 找到以后，返回数据给CSGO，并通知用户
5. 领着用户进入游戏

此时此刻，后台为了提供了所有必要的服务，也即：提供者，提供这些游戏内容的人。

稍微扩大一下，并用更专业的术语抽象的话，则是：服务端。

上述过程，也即客户端/服务端，也就是我们常说的C/S模型：使用/提供服务。

诚然，客户端和服务端，一个是使用服务，另一个是提供服务，乍一看二者是相对立的，但实际上，二者并不是对立的关系，反而是可以同时存在的，取决于你怎么看待它：比如软件，它既可以是客户端，也可以是服务端：
1. 软件需要调用硬件资源，那么在这种场合下，软件就是客户端；
2. 相对应的，如果这个软件是某一个服务的后端，那么在这种场合下，软件就是服务端。

所以，很明显，区分服务端和客户端最主要的特征就是：在这个情境下，你是享受服务呢，还是提供服务？

但很明显，这里有一个问题：用户需要享受服务，后台虽然有服务，但需要有一个办法提供给用户；同样的，也需要一个办法让用户和后台交互，诸如此类。总之，需要有一个办法，沟通用户和后台。

为了解决这个问题，就像在现实生活中造桥那样，我们需要确定两个端点，并搭建后台和用户之间的桥梁。用更专业点的话来说的话，这两个端点，即是所谓的"接口"，也就是"API"(Application Programming Interface)：服务端的端点，用来提供服务，客户端的端点，用来接收服务。而其中的"桥梁"，则是各种各样的数据传输方式，比如说HTTP/Socket/WebSocket/...，在此不表。

接口的方式多种多样，如：
- 调用数据库中的数据：SQL
    ```sql
    SELECT * WHERE something=1;
    ```
- 软硬件交互：汇编
    ```cpp
    .LC0:
    	.string "Hello World!"
    main:
    	push        rbp
    	mov         rbp, rsp
    	mov         edi, OFFSET: .LC0
      mov         eax, 0
      pop         rbp
      ret
    ```
- 语言交互：函数导出
    ```cpp
    // Export C function...
    export "C" __function() {}
    ```

好了，让我们回到之前的匹配。

之前我们提到了两端，现在我们需要处理"桥梁"。

既然我们需要传输匹配参数给后台，那必然需要涉及到网络之间的交互，而网络交互相关的东西，也无外乎就HTTP/WebSocket/Socket之类的玩意。
> Note: 在CSGO中，死亡竞赛的参数：`game_type 1; game_mode 2`，沙漠2就不用说了：`de_dust2`

首先，既然我们需要发送数据给V社，那么首先我们得按照一定的标准写入数据：
> 使用JSON以简化表述
```json
{
    "steamid": 76561154567867646,
    "game": 730,
    "game_type": 1,
    "game_mode": 2,
    "map": "de_dust2"
}
```

然后，通过某种方式发送给V社。

> 本文使用Java做示例，仅用于方便理解。
```java
// Steam ID=76561154567867646 => 我瞎取的，实际上往往大概率不存在
// game=730 => CSGO的ID
// game_type=1 // 死亡竞赛参数
// game_mode=2 // 死亡竞赛参数
// map=de_dust2 // 不用我说了吧?

// 假设有一个类叫MatchMaking，用来处理匹配相关的数据
// 假设Matchmaking中有一个WriteData的函数，用于构造这个类，并构造用户匹配数据
// public static MatchMaking WriteData(Long steamID, Long game, short gameType, short gameMode, String map);
MatchMaking mm = Matchmaking.WriteData(steamID, game, gameType, gameMode, map);

// 发送数据到V社服务器
mm.send();
```
`send()`的实现大致如下
> Note: 都在`MatchMaking`这个类下
```java
// 一般来说你都是应该自行封装一个JSON通用函数的
public JSON toJSON() {
    // 我们假设matchmaking这个类只有这5个参数，所以直接封成JSON
    // 此外，一般来说 绝大多数的JSON库只处理变量不处理函数
    return JSON.toJSON(this);
}

// 假设我们使用WebSocket，且已经连接
public void send() {
    // 获取匹配服务器IP
    String matchmakingServer = MatchMaking.GetServer();
    
    // JSON格式的编码字符串
    String jsonRAW = toJSON().toString();

    WebSocket.send(matchmakingServer, jsonRAW);
}
```

然后，发送给V社匹配服务器(假设V社官方匹配服务器是统一的)，服务器解析你的数据以后开始根据你的匹配条件为你找队友，假设给你匹配到了一个服务器：
```json
{
    "steamid": 76561154567867646,
    "game": 730,
    "ip": "123.123.111.236:27015"
}
```

作为服务端，我们可以这样处理：
> Note: 使用Java以方便理解，实际上V社用的是C++
```java
// Player类：通用玩家类
// Server类：存放可用的房间，包含一个getIP函数用于获取IP
// Steam 64位ID
String steamID = player.GetSteamID64();
// List<Server> unAvailableServerList; // 已知变量：可用服务器列表
// List<Server> serverList; // 已知变量：全部服务器列表
// game已知：由客户端传递
for (var i : serverList)
{
    // 如果在不可用的服务器里找到的这玩意 过滤掉
    if (unAvailableServerList.contains(i)) continue;

    JSON json;
    json["steamid"] = steamID;
    json["game"] = game;
    json["ip"] = i.getIP();
    // 假设这里存在另一个websocket相关函数，参数是用户的Steam ID和JSON类
    ws.send(steamID, json);
}
```

并发送回客户端。

客户端收到了这个包，并通知你匹配到了服务器，并将你领进特定的服务器：`connect 123.123.111.236:27015`

> Note: connect 是V社游戏连接服务器的指令。

> 这块通用使用Java以方便理解
```java
JSON result = Matchmaking.Receive();
MatchmakingResult res = MatchmakingResult(result);
if (res.getGame() != 730 || Client.getSteamID() != res.getSteamID()) return;
Client.ClientCommand("connect" + res.getIP());
```

于是乎，你就可以尽情刚枪了。

## 小结

- 服务端：服务提供者
- 客户端：服务使用者
- 服务端-客户端：需要方法通信，通信的手段取决于团队的技术选型和实际考虑。

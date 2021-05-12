# 后端开发规范
在开始着手做以下内容之前，请务必**先把产品的逻辑梳理得井井有条**。该用到 `UML`、该写文档的地方，绝对不要节省笔墨和时间，哪怕为此稍微耽误了开发进度。也不能因为使用了 `敏捷开发`，而忽略明确需求的重要性。  
<br>

在反复确认准备工作已经完成之后，我们进入开发流程。本篇文档着重描述**基于 `SpringBoot` 的后端开发规范**。  
<br>

为了方便沟通，我们以一个**申研信息分享论坛**的项目为例，按照后端开发的时间顺序，逐一梳理开发过程中需要注意的规范。  
<br>

## 数据库的设计
需求明确之后，首先要进行开发的是数据库。在分析完**申研信息分享论坛**的项目需求之后，我们大概可以明确，数据库要储存哪些信息。我们例举其中比较重要的几个数据表：  
- `offer 表`：记录所有的 offer，信息包括来自哪所学校、收到的时间、有无奖学金等等。  
- `thread 表`：记录论坛里所有的帖子，信息包括发布者、发布时间、帖子内容等等。  
- `user 表`：记录所有的用户信息，信息包括用户名、密码的 `hash`、昵称等等。
<br>

设计数据库时，可以尽量参照[阿里数据库设计规范](https://developer.aliyun.com/article/709387)。可以先通读一遍，有个大致印象；在设计完数据库之后再一一对照纠错。  
<br>

## 接口规范
在不那么复杂的项目中，接口与数据库的表一般是高度对应的。除了一些后台使用的，或为了表示多对多关系的表之外，一般每个表都会对应一系列的 `CRUD` 操作 —— `Create (创建)`, `Read (读取)`, `Update (更新)` 和 `Delete (删除)`。上面提到的 `thread` 表（记录所有帖子信息的）就是如此。对于一个论坛来说，我们需要创建新帖子、读取一系列/某个帖子、更新一个帖子、删除一个帖子。对于 `offer` 和 `user`，我们也要进行一样的操作。  
<br>

每一个接口，对应一个 `url` 以及一些参数。在设计的时候，我们希望遵循时下流行的 [RESTful API 规范](https://restfulapi.cn/)。以 `thread` 相关接口的设计为例，假定我们的服务器 `ip` 地址为 `10.20.30.40`：  
1. 创建一个新帖子：用 `POST` 请求 `https://10.20.30.40/threads`   
2. 读取所有帖子：用 `GET` 请求 `https://10.20.30.40/threads`   
3. 读取一个 `id` 为 `1115201` 的帖子：用 `GET` 请求 `https://10.20.30.40/threads/1115201`  
4. 更新一个 `id` 为 `1115201` 的帖子：用 `PUT` 或 `PATCH` 请求 `https://10.20.30.40/threads/1115201`  
5. 删除一个 `id` 为 `1115201` 的帖子：用 `DELETE` 请求 `https://10.20.30.40/threads/1115201`  
6. 列出一个 `id` 为 `1115201` 的帖子的所有回复：用 `GET` 请求 `https://10.20.30.40/threads/1115201/posts`  
7. 删除一个 `id` 为 `1115201` 的帖子中，`id` 为 `1005101` 的回复：用 `DELETE` 请求 `https://10.20.30.40/threads/1115201/posts/1005101`  
<br>

可以看出，光从我们请求的 `url`，并不能看出我们进行的是 `CRUD` 中的哪种操作（前两条功能完全不同的请求甚至有一模一样的 `url`）。我们是通过请求不同的请求方法，达到不同的目标的。换句话说，请求的 `url`，只提供操作对象的信息，而不定义操作的种类。  
<br>

使用 `SpringBoot` 代码实现出来，应该是下面这样（注意其中函数的返回类型均为 `CommonResult`，这我们会在 `数据的包装` 中讲到）：
```java
// 第一个接口，创建一个帖子
@PostMapping("/threads")
public CommonResult<String> createThread(@RequestBody Thread thread) {...}

// 第二个接口，读取所有帖子
@GetMapping("/threads")
public CommonResult<List<Thread>> getThreads() {...}

// 第三个接口，读取指定 id 的帖子
@GetMapping("/threads/{id}")
public CommonResult<Thread> getThread(@PathVariable BigInteger id) {...}

// 第四个接口 (只写了 PUT)，更新一个帖子
@PutMapping("/threads/{id}")
public CommonResult<String> updateThread(@PathVariable BigInteger id, @RequestBody Thread thread) {...}

// 第五个接口，删除指定 id 的帖子
@DeleteMapping("/threads/{id}")
public CommonResult<String> deleteThread(@PathVariable BigInteger id) {...}

// 第六个接口，列出指定 id 的帖子的所有回复
@GetMapping("/threads/{threadId}/posts")
public CommonResult<List<Post>> getThreadPosts(@PathVariable BigInteger threadId) {...}

// 第七个接口，删除指定 id 的帖子下的指定 id 的回复
@DeleteMapping("/threads/{threadId}/posts/{postId}")
public CommonResult<String> deleteThreadPost(@PathVariable BigInteger threadId, @PathVariable BigInteger postId) {...}
```

## 数据的包装
以 `user` 这个表为例。我们的数据库中，可能记录了这些数据：  
- `id`: 用户 `id`  
- `user_name`: 用户名  
- `user_psw_hash`: 用户密码的 `hash`   
- `display_name`: 用户昵称  
- `user_level`: 用户等级  
- `user_exp`: 用户经验值  
<br>

对应地，我们会创建一个 `User` 类，对应这个表：  
```java
public class User {
    private BigInteger id;
    private String userName;
    private String userPswHash;
    private String displayName;
    private int userLevel;
    private int userExp;
    // Getters and setters...
}
```

在前端，当`用户 A` 点开 `用户 B` (`id` 为 5201) 的个人主页，需要向后端索要`用户 B` 的信息。按照 `RESTful` 的接口设计风格，需向 `https://10.20.30.40/users/5201` 发送一条`GET` 请求。然后，我们在 `Mybatis` 的 `Mapper` 里写这样的查询函数：  
<br>

```java
public interface UserMapper {
    @Select("SELECT * FROM user WHERE id = #{userId}")
    User findById(@Param("userId") String userId);
}
```
然后，在 `UserController` 中这样处理请求：  
```java
/********************
* 这样写其实不可取！！！！
********************/
@GetMapping("/users/{id}")
public User getUser(@PathVariable BigInteger id) {
    return userMapper.findById(id);
}
```

这样，在收到用户请求时，相当于运行了下面的查询，然后把结果返回给前端。  
```sql
SELECT * FROM user WHERE id = 5201
```

但是，这样会有问题：`用户 A` 在前端会接收到 `用户 B` 在数据库中的全部信息，包括 `user_name` 和 `user_psw_hash`。这两个信息只是后台登录用的，根本就不应该让用户看到，不然会造成严重的安全问题。我们只能展示前端需要的信息。  
<br>

所以，我们得新创建一个类 `UserVO`，这是专门面对用户的 `User` 类，包含的信息都是用户可以看的：  
```java
public class UserVO {
    private String displayName;
    private String userLevel;
    private String userExp;
    // Getters and Setters...
}
```
`VO` 即 `View Object`，是专门返还给前端用的。`UserVO` 和 `User` 比起来，少了 `userName` 和 `userPswHash`。这些是用户登录的时候用的东西，不能给其它用户看。  
<br>

于是，我们可以在 `UserController` 里这样处理请求：  

```java
@GetMapping("/users/{id}")
public User getUser(@PathVariable BigInteger id) {
    // 先去数据库找 user
    User user = userMapper.findById(id);

    // 创建 userVO，把 user 中不敏感的数据拿出来，给到 userVO
    UserVO userVO = new userVO();
    userVO.setDisplayName(user.getDisplayName());
    userVO.setUserLevel(user.getUserLevel());
    userVO.setUserExp(user.getUserExp());

    // 把不包含敏感信息的 userVO 返回给用户
    return userVO;
}
```

但是，这样仍然不够完美。我们并没有考虑到 `Error` 的可能性（比如查询的用户不存在）。并且，我们回复的消息过于 `干货` 了：除了数据内容之外，啥也没有。这对前端来说非常不友好。我们建议大家使用 `CommonResult`（[点击这里下载它的代码](../resources/CommonResult.zip)） 对返回值进行封装，这样任何的返回消息，都会是以下格式：  
```json
{
    "code": 200, // 200 是成功，其它可能的有 500、404、401 等等。
    "message": "some text here", // 除了数据之外，有哪些信息要展示给用户的（尤其是在出错的情况下）。
    "data": ... // 这才是数据。如果出错的话，可以设置成 null，然后在 message 里给出错误原因。
}
```
<br>
于是，上面的代码变成：

```java
@GetMapping("/users/{id}")
public CommonResult<UserVO> getUser(@PathVariable BigInteger id) {
    // 先去数据库找 user，跟之前一样，但是考虑数据库错误的情况
    User user;
    try {
        user = userMapper.findById(id);
    } catch (Exception e) {
        return CommonResult.failed("数据库错误。"); 
        // 精益求精的话，可以考虑 throw 一个数据库相关的 Exception 出去
    }

    // 如果 user 找不到的话：
    if (!user) {
        return CommonResult.failed("操作失败，用户未找到。");
    }

    // 这跟之前一样
    UserVO userVO = new userVO();
    userVO.setDisplayName(user.getDisplayName());
    userVO.setUserLevel(user.getUserLevel());
    userVO.setUserExp(user.getUserExp());

    // 返回封装好的 result
    return CommonResult.success(userVO);
}
```

这样是不是相当优雅？其实还是不够。因为我们把过多的功能放在了 `Controller` 类里，这很不好，如果接口很多，会导致这个类肥硕无比。并且，这样做的复用性极差：因为我们在 `Controller` 里定义的函数，返回的都是封装好的 `CommonResult`，是专门对外的，内部重复利用 `Controller` 里面的函数，还要把返回值的封装拆开，这非常蠢；另外，`Controller` 里函数的内容，都是**完整的**请求处理逻辑，而不是像积木那样很独立、很割裂的功能模块，本来就很难有可以重复利用的地方。  
<br>

如何进一步优化呢？这是我们下一节要讲的内容。  
<br>

## 处理流程
仍然以获取用户信息的请求为例（向 `https://10.20.30.40/users/5201` 发送 `GET` 请求）。目前为止，我们处理用户请求的逻辑是这样：  

1. `UserController` 的 `user/{id}` 这个 `url` 上接到请求。  
2. `UserController` 调用对应的函数 `getUser()`。  
3. `getUser` 使用 `userMapper` 查找数据库。  
4. `getUser` 创建 `UserVO` 对象，把可以给用户看的属性从 `User` 对象里提取出来，塞到 `UserVO` 对象里。  
5. `UserController` 把 `UserVO` 塞到 `CommonResult` 里，返回给用户。  
<br>

之前提到，`getUser` 这个函数做的事情太多了，也不能被重复利用。我们需要再设计一个类 `UserService`，里面写一些可以被重复利用的逻辑（就像为自己打造各种形状的小积木），这样 `UserController` 就不需要写很多代码，只需要把想用的积木从 `UserService` 里拿出来，拼一下就可以了。  
<br>

这样处理之后，上述的流程就变成：  
1. （不变）`UserController` 的 `user/{id}` 这个 `url` 上接到请求。  
2. （不变）`UserController` 调用对应的函数 `getUser()`。  
3. **（新）** `UserController` 里的 `getUser()` 调用 `userService.getUserById()` 函数。
4. **（新）** 在 `UserService` 的 `getUserById` 函数中，使用 `userMapper` 查找数据库，返回 `User` 对象。
5. **（新）** 在 `UserService` 的 `getUserById` 函数中创建 `UserVO` 对象，把可以给用户看的属性从 `User` 对象里提取出来，塞到 `UserVO` 对象里。  
6. **（新）** `UserService` 把 `UserVO` 返回给 `UserController`。  
7. （不变）`UserController` 把 `UserVO` 塞到 `CommonResult` 里，返回给用户。  
<br>

注意，这里 `UserService` 需要考虑到各种错误情况，`throw` 对应的 `Exception`，然后 `UserController` 根据 `Exception` 的类型，返回用 `CommonResult` 封装的错误信息。  
<br>

## 接口文档
前端开发人员需要使用接口从后端调取数据。为了节省沟通成本，后端开发人员需要把接口以文档的形式详细列出，包括请求的 `url`、请求的参数、可能的返回值，以及其它可能需要的信息。  
<br>

我们当然可以用 `word` 手写这样一份文档，但是维护起来可能比较麻烦（而且用微信传来传去的非常不优雅）。推荐使用 `Swagger` 去做这件事。只要加入注释，就可以自动生成非常漂亮的接口文档。  
<br>

具体的使用方法，[这个教程](https://www.tutorialspoint.com/spring_boot/spring_boot_enabling_swagger2.htm)讲得非常详细了。  
<br>


## 注释及其它
对于一些不是很明了的逻辑，我们要写注释，确保不看代码也能知道下面做的事情是什么。  
<br>

同时，推荐对每个 `class` 以及下面的每个 `method` 都按照 `Javadoc` 的规范去书写注释，这样就可以自动生成文档。具体教程参考[这里](https://www.baeldung.com/javadoc)，或者直接搜索 `Javadoc`。  
<br>

另外，我们放出[阿里开发规范手册](../resources/best-practice.pdf)供大家参考。可以尽量去学习，然后制定自己认为最优秀的开发规范。  
<br>

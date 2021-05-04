# SpringBoot 练习 1

## 基础
使用 `SpringBoot` 框架和 `Faker` 第三方库，仿照 [uni-app 联调练习](../content/uni-app-practice) 中提供的接口，自己制作一个接口。要求如下：  
1. 和我们提供的接口一样，你自己制作的接口也需要返回一个 `JSON` 格式的数据给前端。  
2. 和我们提供的接口一样，用户需要在请求的路径后面加上 `?id=` 的参数，需要把这个 `id` 放在 `JSON` 里返还给用户。  
3. 如果用户没有发送 `id` 这个参数（i.e. `id` 是 `null`），则返回错误（错误的消息格式你可以自己决定）。  
4. 返回的 `JSON object` 中需要有运用 `Faker` 生成模拟的、随机的数据。  
5. 将接口部署到自己的云服务器上，并确保自己能够调用。  
6. 使用 `uni-app` 前端调用自己的接口，并展示。


## 进阶
我们使用 `SpringBoot` 为自己的公众号制作一个后台，并制作人工智能自动回复的功能。  
<br>

请遵循以下步骤。如果遇到任何问题，请积极寻求帮助！  
<br>


1. 打开[公众号开发入门指引](https://developers.weixin.qq.com/doc/offiaccount/Getting_Started/Getting_Started_Guide.html)（以下简称`指引`）  
2. 阅读`指引`的`1.3`，完成公众号的申请。  
3. 完成`指引`中`1.4`的`1)`和`2)`两步  
4. 使用 `SpringBoot` 代替 `python` 完成`指引`中`1.4`的`3)`和`4)`两步。
    提示：写一个`GetMapping`，`url` 是 `wx`；然后现在阶段其实并不需要像文中说的，把 `hashcode` 和 `signature` 去比对，只需要把 `data` 中的 `echostr` 给 `return` 回去就好了。  
5. 参照`指引`中`2.1` - `2.5` 的内容，对上一步的 `url` 再写一个 `PostMapping`，解析收到的 `XML`，如果是文本消息，则返回事先准备好的消息（你可以自己决定回复什么）。  
6. 尝试给自己的公众号发消息，看回复的内容是什么。
7. **（挑战）**在收到用户的文本消息后，调用[ chatbot api](https://www.chatbot.com/docs/)，对用户进行智能回复。


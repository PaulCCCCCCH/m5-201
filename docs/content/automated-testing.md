# 自动化测试

## 引言

试想，你现在要上交你写好的俄罗斯方块，我们要给它打分。想必你一定会在上交之前，先“跑跑看”，确认没问题了才交吧。  

<br>

具体地，你可能有一个测试清单，包括移动、旋转、消除、游戏开始和结束等等。你花了1小时测试完毕后，正打算上交，突然来了一个新要求：你要加入一种新方块 (`piece`)，它只有三个单元 (block)，并且能穿过其它 `block`，在你按下`沉底`键时，停留在当前位置 (也就是可以补任意地方的洞)。  

<br>

由于不好在原来的框架上实现，你重写了 `layout` 的逻辑。因为改动可能会把原来的东西弄坏，所以你又花了一小时从头到尾测试了一遍。

<br>

正打算上交，又来了一个小需求，又得做出牵扯到其它功能的改动。不测试吧，万一其它功能坏了，但没发现，还不如不做这个小需求得分来得高；测试吧，又得花上好久，还不一定真的有问题。

<br>

于是，你开始头痛。

<br>

其实，你可以把你的测试清单用程序写出来，成为`自动化测试`，这样，你只需要实现一遍，之后可以随时重新测试，非常方便快捷。

<br>

对于规模比较大的开发项目，自动化测试是必不可少的。

<br>

写测试并不会对技术有太高的要求，但是要非常细心。于是你会看到，许多编程能力并不是很强，但是又喜欢编程且思维缜密的人选择在企业的测试岗就职。



## 基本方法

所谓测试，本质就是检查执行某项操作后，结果是不是跟我们想的一样。一个测试脚本大概长这样：

```python
创建一个初始位置为(0, 5)的长条piece，名为initPiece

运行一下下落函数
判断initPiece的位置是不是在(1, 5)
运行一下下落函数
判断initPiece的位置是不是在(2, 5)
运行一下向左函数
判断initPiece的位置是不是在(2, 4)

把initPiece的位置设置成(2, 0)
运行一下向左函数
判断initPiece的位置是不是在(2, 0)

把occupationMatrix的最上面一行都填满
运行一下generatePiece函数
等待10秒
判断游戏是否结束

...更多测试
```

当然，不推荐用语言原生的 `if-else` 和 `assert` 语句写测试，尽量使用各语言的测试框架。比如，写 `Java` 的测试，就使用 `jUnit`。

## 前端测试

对于纯粹的 `JavaScript` 逻辑测试，我们可以使用 `Jest`。请读[文档](https://www.jestjs.cn/)。  

<br>

`Jest` 可以让你调用自己写的 `js` 函数，然后跟期望值比较。可以把它理解为 `JavaScript` 版的 `jUnit`。  

<br>

但是，前端不只是程序控制的逻辑，不是光测试函数的输入、输出就行的。我们可能需要这样的测试：

>  如果用户点击了这个按钮，那么页面会...

这就要求把页面交互考虑在内。于是我们要引入另一个框架 `puppeteer`。它可以让我们用 `JavaScript` 模拟用户的交互。  

<br>

所以，要测试 `uni-app` 的前端项目， 我们要根据[这个文档](https://uniapp.dcloud.io/collocation/auto/quick-start)进行初始化。

## 持续集成测试

这个部分是给项目的 Leader 们参考的，暂时不想看的话可以跳过。  

<br>

为了确保大家对 `GitHub` 的 `push` 都是有效的，我们可以使用一些自动化集成（Continuous Integration，或 `CI`）工具。

<br>

逻辑是这样：

- 首先，让使用的 `CI` 服务去和 `GitHub` 绑定，进行授权等操作
- 然后，在代码根目录创建脚本文件，脚本里写的内容会告诉 `CI` 服务，如何运行你的测试
- 每次 `push` 的时候，`CI` 服务会自动拉取你的代码，用你脚本里指定好的方式进行测试。
- 如果测试不通过，`GitHub` 仓库会进行警告。



各位可以先尝试使用 `Travis CI` 操作。进行以下步骤就行：

- 进入 `Travis CI` 官网并注册。
<br>

- 根据它的提示，对 `GitHub` 进行授权。或者，点击右上角自己的头像，进入 `Settings` 下的 `Repositories` 页面，点击 `Manage repositories on GitHub` 进行授权。
<br>

- 在自己的代码跟目录里加入 `.travis.yml`，并根据[文档](https://docs.travis-ci.com/)写测试内容。比如，如果测试一个 `javascript` 项目，可以用以下内容

```yaml

language: node_js
node_js:
 - "12"

```
并且在 `package.json` 里的 `scripts` 下加入一行
```
"test": "<命令>"
```
其中，`<命令>` 就是你在本地终端进行测试时输入的命令，比如 `"cross-env UNI_PLATFORM=h5 jest -i"`。在你 `push` 的时候，`CI` 服务会跑 `npm test`，也就是把你的命令跑了一遍。  
<br>

- `git push` 就行。你可以在 `GitHub` 仓库里看到上次测试的结果。你也可以上 `Travis CI` 上看之前测试的结果。


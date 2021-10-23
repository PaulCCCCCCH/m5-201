# CSS 和 Bootstrap





## Bootstrap何许人也

既然这节课都叫**CSS 和 Bootstrap**了，那这个**Bootstrap**想必和**CSS**有些关系：

事实上，**Bootstrap**是一套**现成**的**CSS样式集合**，是**Twitter**于2011年8月在**Github**上发布的一个**开源项目**。起初这只是几个推特工程师为了提高他们内部的分析和管理能力，用业余时间构建的一套**前端工具集**，但在**Github**上开源之后，逐渐成为了目前最受欢迎的**HTML**、**CSS**和**JS**<span style="color:red;">**框架**</span>。



这边有两个概念大家可能相对来说比较陌生：

其一是**Github**，这个在我们接下来的课程中很快会讲到，但是为了更好地理解，大家在这里可以简单地将其视作一个**共享资源**的网站，其中的资源就是一个一个**项目工程**（里面是代码和一些相关的文档）。而其中有一些项目的工程师们**同意让他人使用、复制或是修改自己的项目**，这些项目也就被称为**开源项目**。

另外一个是<span style="color:red;">**框架**</span>，它是为**解决一个（一类）问题**而开发的**集成的代码**。大家可能觉得这跟之前学的**C**语言在开头通过```#include<xxx>```调的<span style="color:red;">**库**</span>是一样的，都是代码的集合，但其实这两者是不同的。简单地来讲，程序员在使用<span style="color:red;">**库**</span>时有**更高的自由度**，可以根据自己的意愿**决定在什么时候什么地方调用**<span style="color:red;">**库**</span>中的<span style="color:red;">**库**</span>**函数**，也就是**程序员决定了程序的流程**；而使用<span style="color:red;">**框架**</span>时，**自由度相对较低**，**程序的流程由框架定义**，程序员更像是在填表一样，在<span style="color:red;">**框架**</span>**规定的位置插入自定义的代码**来实现定制的程序。



上面的这两个概念大家如果读完还不是特别清楚其实问题也不大，目前对它们有一个感性的认知即可，因为今天我们的主角还是**Bootstrap**。





## <span id="effect">Bootstrap能做什么</span>

在看别的资料怎么描述**Bootstrap**能做什么前，我们不如看看**Bootstrap**自己的<a href="https://v3.bootcss.com/">官方文档</a>是如何定义自己的:



<i>Bootstrap 是最受欢迎的 HTML、CSS 和 JS 框架，用于开发响应式布局、移动设备优先的 WEB 项目。</i>



也就是说，首先它是一个**前端框架**，其次它可以开发<span style="color:red;">**响应式布局**</span>、<span style="color:red;">**移动设备优先**</span>的**WEB项目**（好像是废话QAQ）。

做为前端框架，它封装了很多的**CSS样式**以及各式各样的**组件**以及**JavaScript插件**，这些往往可以通过设定原生**HTML**元素的```class```来使用。比方说，如果我们觉得原生**HTML**中定义的**button**很丑，但我们又不想自己设计一个样式，那我们就可以上**Bootstrap**的<a href="https://v3.bootcss.com/">官方文档</a>，找到导航栏的“全局CSS样式”，然后在里面找到按钮的版块，从它提供的EXAMPLE里找到我们想要样式的按钮，大喊一声“拿来吧你”就可以了——才怪。为了能够使用**Bootstrap**提供的样式以及丰富的组件和插件，我们除了需要设置对应的```class```以及其他一些可能需要的属性之外（也就是之前讲框架时所说的填空），还需要正确地引入相关的**CSS文件**和**JavaScript文件**（还记得之前Web三件套讲的外部引入的方式吗），不然谁知道我们这空往哪道题填，对吧？当然这些实操部分的细节我们在**Practice**中再给大家细讲。



除开上面所述的做为前端框架最基本的功能外，**Bootstrap**还支持<span style="color:red;">**移动设备优先**</span>（**mobile-first**）。这指的是**Bootstrap**的设计目标**首先是移动设备**，**然后是桌面设备**。什么意思呢？这就要追溯到**Bootstrap**诞生的时间了（2011年8月，据史料记载彼时iPhone4s还有两个月就问世了）：那时**WEB**还是在**桌面设备**上用的比较多，因此在**Bootstrap3**之前的版本中都需要手动引入另外的**CSS**才能让项目**支持移动设备**，而随着近些年来移动端的快速发展，大势所趋之下，**Bootstrap**从第三代开始便默认支持移动端的**CSS**，也就是设计目标成了<span style="color:red;">**移动设备优先**</span>。当然这里大家了解一下就可以了。By the way，现在**Bootstrap**已经发展到了第五代。



而在定义中提到的另一个词——<span style="color:red;">**响应式布局**</span>（**responsive design**）就比较重要了，它是**Bootstrap**的一个灵魂特性。

什么叫<span style="color:red;">**响应式布局**</span>呢？从这个名字大家应该就能猜出一些端倪——它大概是一个**会根据某些环境因素的变化而变化的布局**。那么是什么环境因素呢？其实也很好猜，就是呈现网页的**屏幕分辨率**。也就是说**<span style="color:red;">响应式布局</span>就是一个能够随着屏幕不同分辨率而     改变布局    的布局**（有一点点绕orz）。这样的好处也显而易见，**一个网站就能够兼容不同类型的终端**（小到手机大到荧幕），而不需要程序员们苦逼地去为每一种终端都定制一个网页。事实上，这个<span style="color:red;">**响应式布局**</span>是通过**CSS**的```@media```查询实现的。关于```@media```大家可以理解为一组关于屏幕分辨率的**If Statement**：

```
if(970px < 屏幕宽度 < 1170px):
	...
else if(...):
	...
```

同样地，大家也是对它有个感性的认知即可，因为正如我们之前在<span style="color:red;">**框架**</span>中所介绍的那样，在使用<span style="color:red;">**框架**</span>的时候，我们只需要当作填空就好了，背后的复杂流程一般来说是不需要我们操心的。```@media```查询会由**Bootstrap**帮我们完成的，我们只需要针对不同情况定义不同的布局就能和<span style="color:red;">**框架**</span>配合着完成整个的<span style="color:red;">**响应式布局**</span>了。

光靠上面的文字描述大家可能还不能对什么叫<span style="color:red;">**响应式布局**</span>有一个非常直观的概念，那么接下来我们上点具体的，就拿<a href="https://v3.bootcss.com/getting-started/">Bootstrap的下载页面</a>作为例子好了。

在电脑上看，这个页面长这样子：

![bootstrap-1](.\images\bootstrap-1.png)



而在手机上，它长这样：

![bootstrap-2](.\images\bootstrap-2.png)

可以很明显地看到，本来三种不同的下载：“用于生产环境的Bootstrap”、“Bootstrap源码”和“Sass”在电脑上是呈水平方向排布的，而到了手机上，便成了竖直方向排布。这也就是一个很典型的<span style="color:red;">**响应式布局**</span>的例子。





## Bootstrap的布局方式

上面讲了**Bootstrap**具有<span style="color:red;">**响应式布局**</span>的特性，而这样的特性正是由它的**布局方式**所决定的。

为了使用**Bootstrap**的**布局系统**，我们需要将**要布局的内容**放在**Bootstrap**所定义的**布局容器**内。这样的**布局容器**有两种，```<div class="container">......</div>```以及```<div class="container-fluid">......</div>```,简单来说，前一种容器不占据整个屏幕的宽度，两边有一定留白，而后一种占据100%的宽度（两种**布局容器**不可以嵌套使用）。通常来说，前一种我们用的多一点，就比如大家常逛的淘宝京东等等：

![bootstrap-3](.\images\bootstrap-3.png)

很明显白色的大块```<div>```并没有占据100%的宽度，而是两侧有留白。



而满足了前提条件后，我们便可以使用**Bootstrap**的**布局系统**进行布局了。

**Bootstrap**的**布局系统**是<span style="color:red;">**栅格系统**</span>（Grid system）。<span style="color:red;">**栅格系统**</span>，顾名思义，就是通过**行**和**列**来把页面分成一个个小格子，从而进行定位。在**Bootstrap**中，我们往往先在**容器**中定义**行**（```<div class="row">......</div>```），然后再在**行元素**中创建**列元素**。与在原生的**CSS**中定义<span style="color:red;">**栅格系统**</span>不同，**Bootstrap**做为<span style="color:red;">**框架**</span>会通过计算自动地帮我们将一行分为**12**份（有时也会分为24份或36份，但一般都是12份），所以在做粗略布局的时候，我们可以直接**通过指定一个列元素所占份数来改变其的宽度**（当然也是通过指定```<div>```元素的```class```实现），就像下图这样：

![bootstrap-3](.\images\bootstrap-4.png)

显而易见，每一行的所有**列元素**所对应的```class```最后的数字相加都等于12，这也正符合了我们上面所说的一行被分为12份。除开这些数字，大家也许会对每个```class```名前半部分的```col-md```感到疑惑，可能```col```的含义还好猜一点，毕竟本身“**列**”的英文就叫**column**，那```md```又代表了什么意思呢（反正肯定不是在骂人）？这就又要说回到我们在上面讲的<span style="color:red;">**响应式布局**</span>了。

我们在<a href="#effect">Bootstrap能做什么</a>里只说了<span style="color:red;">**响应式布局**</span>能**随着屏幕分辨率的改变而改变布局**，但具体变成什么样的布局，还是要由我们提起去定义好的。所以整个<span style="color:red;">**响应式布局**</span>的流程其实是这样的：**Bootstrap**先通过```@media```查询得到屏幕分辨率，然后再**根据分辨率所在的范围**执行**对应的布局代码**。为了**区分**不同分辨率范围对应的布局，**Bootstrap**在**列元素**类名的```col```和**数字**中间加入了两位字母，分别为```xs```（extra small）、```sm```（small）、```md```（medium）和```lg```（large），而它们对应的分辨率范围如下表：

![bootstrap-5](.\images\bootstrap-5.png)

对于具体的数值，大家并不需要背下来，只要有一个大概的印象即可——```xs```对应**手机**，```sm```对应平板，```md```对应一**桌面显示器**，```lg```对应**大桌面显示器**。真要是不确定，再查一下表格，也是很方便的。



那么到此为止，**Bootstrap**最为基础与最为核心的部分我们也就讲完了，当然除了那些讲不完的样式、插件和组件之外，还有一些基础的部分，比如列偏移、列排序、列嵌套等等也没有涉及到。但其实这些都不难，只要大家愿意去<a href="https://v3.bootcss.com/">官方文档</a>读一读，看一看对应的示例代码，想必这些对大家来讲都没什么难度。即使有时候真的不懂原理，其实也只要把示例代码复制下来，改一改对应的地方，也就是把别人填的空改成你填的空，问题也就解决了。而我想框架给我们带来的便利正是在于此。
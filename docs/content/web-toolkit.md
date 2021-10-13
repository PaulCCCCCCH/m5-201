# Web 三件套





## Web 三件套的总览



#### Web 三件套是哪三件

- **HTML**（HyperText Markup Language）：超文本标记语言。
- **CSS**（Cascading Style Sheets）：层叠样式表。
- **JavaScript** ：一种属于网络的高级脚本语言。



#### 为什么是这三件

很多人（不包括在座部分大佬）可能之前没有听说过，或者说没有真正运用过这三件套，但是这都是非常非常正常的。作为普通的网民，显然我们不需要接触这些东西，因为**Web 三件套是服务于设计网页的**。

那么既然是设计网页，我们就有必要先了解一下网页的构成。如果是按层次分的话，那么就可以分为**结构层**、**表示层**和**行为层**。而**HTML** 、**CSS**和**JavaScript**就分别对应了实现这三个层的工具。更具体一点地来说，**HTML**指定了**每个元素在网页中的位置这样最基础的网页结构**（拿下面第一张图来说就是定义了白色大方块等等在网页中的位置以及长宽），**css**定义了**元素的具体样式**（拿下面第二张图来说就是将原先的白色大方块修改成了白色的椭圆等等），而**JavaScript**定义了**元素的互动**（拿下面第三张图来说就是点一下页面，会让笑脸都动起来等等）。

![html-css-js](./images/web-toolkit-1.jpg)

引用网上一个形象的例子来讲，**HTML**就好比人的骨骼和器官，**CSS**就好比人的皮相，而**JavaScript**就好比人的灵魂，有了**HTML**才会有基础的人形,但没有**CSS**就会毁容，而没有**JavaScript**则会变成动不了的植物人。





## 细说Web三件套

在大致了解Web三件套后，下面就让我们通过一个简单的例子来更深入地学习这三件套。

而在进行讲解之前，先让我们看一下这个例子最终的实现效果：

![JS](./images/web-toolkit-2.gif)

写有 ***Welcome*** 的按钮在被点击后会弹出写有 *hello* 的提示框，而写有 ***Change Color*** 的按钮在被点击后则会改变颜色（注意：点击按钮时出现的黄色的圆只是录屏时候显示的左键点击，不是网页的效果哦）。

那么接下来就让我们通过三件套，一步一步地实现这个简单的网页。



#### HTML

首先，我们需要通过**HTML**定义两个按钮（代码看不懂没关系，下面会进行讲解）：

![HTML](./images/web-toolkit-3.gif)

```html
<!DOCTYPE html>
<html>

<head>
    <title>Button Example</title>
</head>

<body>
    <button>Welcome</button><br>
    <button>Change Color</button>
</body>

</html>
```

跳脱代码表达的具体意思，一眼看去，我们很容易发现，**HTML**是由普通的文本以及很多```<xxx>```这样形式的标注组成的，而这种形式的标注我们称之为**HTML**的**标签**，也就是**tag**。通过这些标签，我们得以标记原本普通的文本内容，决定它们在网页中的基础呈现形式（比如做为按钮）。这也就是为什么**HTML**被称为**超文本标记语言**。而这些标签通常成对出现，像```<html>```和```</html>```这样，以```<xxx>```开始，```</xxx>```结束。当然也有少数的标签比较“坚强”，一个人就能完成任务，像```<br>```这样。这里需要注意的是代码第一行的```<!DOCTYPE html>```并不是一个标签，它是指示Web浏览器关于页面使用哪个**HTML**版本的指令，所以必须写在所有标签的前面。

进一步观察代码，通过缩进，我们可以发现**HTML**的基础是由一对```<html>```标签、一对```<head>```标签以及一对```<body>```标签构建而成的。其中```<html>```标签标志着**文档的开始与结束**；```<head>```标签标志着**文档的头部**，我们通常会在里面指定**整个文档的公共信息**，比如用```<title>```标签指定网页的名字，或者指定文档引用的外部**CSS**、**JS**文件等的链接；```<body>```标签则标志着**文档的正文部分**，网页中能看到的元素都在这里定义。

在上面的代码中，我们先是在文档头部指定了这个网页的名字叫***Button Example***，然后在文档的正文部分分别声明了写有***Welcome***以及写有***Change Color***的按钮。如果只是做单纯的声明，那么两个按钮将会出现在同一行。但是我们知道**HTML**可以指定网页元素的位置，所以我们这里用了```<br>```来进行换行，使得两个按钮出现在了两行。

当然，**HTML**的功能远不止于此，标签的种类也是千千万万，一下子全部学完是不现实也不必要的。所以我们只要了解**HTML**基本的思想，碰到不会的标签等等，面向谷歌编程就可以了。



#### CSS

其次，我们需要通过**CSS**定义两个按钮的颜色：

![CSS](./images/web-toolkit-4.gif)

```css
button{
    background-color: aqua;
}

.different_color_button{
    background-color: pink;
}
```

看到这里，第一次接触的同学可能就会有疑问，这个代码是写在**CSS**的文件里的，那它是如何影响**HTML**中的元素的呢？所以这里我们就要讲讲**HTML**怎样引用**CSS**。但是讲之前请大家要清楚一点，那就是引用的方式不止一种。

先说说**HTML**如何引用上面这种外部**CSS**文件——为了调用这个文件，我们就需要在**HTML**的文档里加一些东西。话不多说，上代码：

```html
<!DOCTYPE html>
<html>

<head>
    <title>Button Example</title>
    <link rel="stylesheet" type="text/css" href="Button_Example.css">
</head>

<body>
    <button id="welcome">Welcome</button><br>
    <button class="different_color_button" id="change_color">Change Color</button>
</body>


</html>
```

可以看见，在**HTML**的头部，多了一行```<link ......>```（其余部分还是相同）。```rel="stylesheet"```说明了引用文件（即**CSS**文件）与当前文件（即**HTML**文件）的关系为**样式表**，```type="text/css"```则告诉浏览器后面的文本不是普通文本，要当作**CSS**来解析（这与**HTML**中的```<!DOCTYPE html>```有着异曲同工之处）。所以说引用不同的**CSS**时``rel="stylesheet"``以及```type="text/css"```是不需要更改的，只要在```href```后面写上**CSS**文件对应的路径就可以了。这样就实现了外部**CSS**文件与**HTML**的联动，而这种引用方式也就被称为**外部样式表**。

除了外部样式表，别的引用方式还有**行内样式**，也就是在**HTML**正文部分的标签中通过```style```属性指定样式：

```html
<h1 style="color:red;">运用行内样式引入CSS</h1>
```

以及**内部样式表**，即在**HTML**文件的头部中直接写样式表：

```html
<head>
  <title>内部样式表</title>
  <style type="text/css">
    div{
        background: green;
    }
  </style>
</head>
```

在实际的工程中，最推荐的还是**外部样式表**，因为它实现了**HTML**代码与**CSS**代码的完全分离，使得前期制作和后期维护都十分方便。

在对**CSS**和**HTML**如何联动有一个基本的了解后，让我们看回刚刚的**CSS**代码：

```css
button{
    background-color: aqua;
}

.different_color_button{
    background-color: pink;
}
```

我们可以发现，**CSS**的定义是```aaa{bbb: ccc;}```这样的，这里的```aaa```被我们称为**选择器**，它有很多类型，比如元素选择器，id选择器等等，这边就不一一赘述了。而```{}```内部则以```属性名：属性值 ```的形式具体定义了属性。

从具体的代码来说，```button{background-color: aqua;}```的选择器是**元素选择器**，它指定了所有标签为```<button>```元素的背景色为***aqua***，即两个**button**的背景色都为***aqua***。而```.different_color_button{background-color: pink;}```则是**class选择器**，它指定了所有```class="different_color_button"```的元素的背景色为***pink***，即写有***Change Color***的**button**的背景色为***pink***。

那么这样也就衍生出了一个问题，如果按照第一条代码来说，写有***Change Color***的**button**的背景色应该是***aqua***，但按第二条代码来说，背景色又应该是***pink***，那么这时候究竟听谁的？

当碰到这样的问题，以及类似的比如行内样式和外部样式表起冲突的问题时，**CSS**就会通过优先级来判定究竟听谁的。就以上面的例子来讲，由于**class选择器**的优先级高于**元素选择器**，最终**class选择器**后面定义的属性决定了写有***Change Color***的**button**的背景色为***pink***。总的来说，如果是不同引入方式的样式起冲突的话，**行内样式** > **内部样式表** > **外部样式表**；而涉及到不同选择器起冲突的话，一般遵循越具体的选择器优先级越高的原则。这也就解释了**CSS**（Cascading Style Sheets）层叠样式表这个名字的由来——在判定优先级后，不同的样式层叠和覆盖，这就是**CSS**。



#### JavaScript

最后，我们通过JacaScript定义按钮被点击后的行为：

![JS](./images/web-toolkit-2.gif)

```js
function welcome(){
    alert("hello");
}

function change(){
    var change_btn = document.getElementById("change_color");
    change_btn.style.backgroundColor = "plum";
}
```

和**CSS**类似，**JavaScript**也有三种引入方式，**外部引入**、**内部引入**以及**行内引入**，而引入上面这种**JavaScript**文件的方式称为外部引入。同样地，**HTML**文件中也要相应地标示出这种引用：

```html
<!DOCTYPE html>
<html>

<head>
    <title>Button Example</title>
    <link rel="stylesheet" type="text/css" href="Button_Example.css">
    <script type="text/javascript" src="Button_Example.js"></script>
</head>

<body>
    <button id="welcome" onclick="welcome()">Welcome</button><br>
    <button class="different_color_button" id="change_color" onclick="change()">Change Color</button>
</body>


</html>
```

与前面讲引用外部的**CSS**文件类似，对于不同的外部**JavaScript**文件，只要改动```src```后的对应路径即可。

看回**JavaScript**的代码：

```javascript
function welcome(){
    alert("hello");
}

function change(){
    var change_btn = document.getElementById("change_color");
    change_btn.style.backgroundColor = "plum";
}
```

不同于**HTML**和**CSS**，**JavaScript**是一门编程语言，所以有了```var welcome_btn = ......```这样的声明部分。而为了得到**HTML**中的元素，这里使用的方法是```document.getElementById```，也就是通过**HTML**中元素的**id**来得到元素，并再给得到元素的对应行为（这里例子为```onclick```）指定回应（这里分别为弹出写有**hello**的提示框以及更改背景色）。
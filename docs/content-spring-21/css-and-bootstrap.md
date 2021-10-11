# CSS 和 Bootstrap

> 对作品的颜值负责

相信各位已经对 `CSS` 有了一定了解。它可以调节一个网页的外观。
`CSS` 的工作原理是，指定一类 `HTML` 节点 （或 `DOM`），让它们具有某些特性。  
<br>

## 添加 `CSS` 的四种方式
再次回顾一下，我们有四种方式，为 `HTML` 元素添加样式：  
**如果记不住那么多，就先用第一种吧。**  
<br>

### 一、在 `<head>` 标签中加入引用
你可以在一个 `HTML` 文件的 `<head></head>` 中加入 `<link />` 标签，指向本地的 `CSS`，像这样：   
```html
<link href="./myFolder/myCSS.css" type="text/css" rel="stylesheet">  
```  

然后，在 `myCSS.css` 文件里，直接写 `CSS` 就好了。
```css
.myClass { /*对 class 名为 myClass 的东西生效*/
    width: 10px;
    height: 20px;
}
#myId { /*对 id 名为 myId 的东西生效*/
    width: 10px;
    height: 20px;
}
```

### 二、在 `<style>` 标签中写
你可以在一个 `HTML` 文件的 `<head></head>` 中加入 `<style></style>`，直接在其中书写 `CSS`。像这样：  
```html
<style>
    .myClass { /*对 class 名为 myClass 的东西生效*/
        width: 10px;
        height: 20px;
    }
    #myId { /*对 id 名为 myId 的东西生效*/
        width: 10px;
        height: 20px;
    }
</style>
```

### 三、在 `JS` 中修改 `style` 属性
你可以这样:
```javascript
var elem = document.getElementById("myId");
elem.style.height = "20px"
elem.style.width = 15 + "px";
```
这样做的好处是，你可以让一个东西的属性随着程序的运行不断改变。  
缺点是稍微有点麻烦。感兴趣的同学可以去搜一下 `jQuery`，它可以让你不用每次都 `document.getElementById`，从而让 `JS` 更改属性更加方便。

### 四、在 `HTML` 标签内部定义 `style`
你可以直接在写 `HTML` 标签的时候，给它单独加上 `style`，像这样：  
```html
<div style="width: 50; background: black"></div>
```

## `Bootstrap`
[Bootstrap 官方文档](https://getbootstrap.com/docs/5.0/getting-started/introduction/)  
`Bootstrap` 的本质其实就是一些 `CSS` 和 `JS` 的代码（包含 `jQuery`）。  
<br>

它使用上面提到的第一、第三种方法来美化你的页面（提供装满样式的 `CSS` 文件；用 `JS` 和 `jQuery` 动态改变样式）。这样，有些常用的漂亮样式、布局，你可以直接拿来用，很是方便。  
<br>

### 引入
要使用 `Bootstrap` 的话，你无需下载任何东西，只需要在你的 `HTML` 文件里面声明一下就可以了。  
官方文档下面，有一个 `Starter template`，把里面的东西全都复制过来，把最后两个 `<script>` 从注释里面拿出来，就好了。  
当然，你可以在 `VS Code` 上下载一个 `bootstrap 4` 插件，可以方便地生成 `Bootstrap` 初始模板。  
<br>

引入后，你就可以直接在 `HTML` 标签中写 `class=...` 来使用他们定义好的样式。  
<br>

### 使用指南
绝大部分 `Bootstrap` 都是通过指定 `class=...` 来使用的。比如你想弄一个卡片的效果，你只需要：
```html
<div class="card">
    卡片内容...
<div>
```
你会发现，相比写原生 `HTML`，你的 `<div>` 标签使用频率直接拉高了十倍不止。可以这么理解：`Bootstrap` 给你提供了一套全新的、更漂亮的 `HTML` 标签。不过具体有哪些标签呢？  
<br>

你可以先大概浏览一下[文档](https://getbootstrap.com/docs/5.0/getting-started/introduction/)的内容，尤其是 `Layout`，`Content`，`Forms` 和 `Components` 这几个，大致有个印象（不用细读，看效果图就行）。  
<br>

在做页面的时候，你可以现用现查（文档左上角有个 `Search docs`，输入关键词就行，贼方便），不过前提是你要大概知道它提供哪些东西（无聊的时候翻翻文档，欣赏一下各种样式）。  
<br>

如果做完了 `Tetris`，不如尝试使用 `Bootstrap` 美化一下游戏界面吧！

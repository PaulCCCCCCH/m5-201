# 前端框架

## 引入

通过第一个俄罗斯方块项目的练习，相信各位对用原生 `JavaScript` 操作 `DOM` 有了一定了解。  
<br>

不知道大家注意到一个问题没有：当你移动或旋转方块的时候，你一方面要计算这个方块的新位置，另一方面要用这个新位置去更新 `DOM` 的 `style`，就像下面这样:  
```javascript
function rotate(piece) {
    var blockList = piece.children; // 获取当前 piece 的四个 block

    for(var i = 0; i < 4; i++) { // 对于每个 block 
        var newRow = (-1)*piece.layout[i][1]; 
        var newCol = piece.layout[i][0]; // 计算当前 block 旋转之后的相对于 piece 的新位置

        // 中间省略一些代码

        block = blockList[i]
        block.rowPos = piece.rowPos + newRow;
        block.rolPos = piece.colPos + newCol; // 更新 block 的位置数据
        block.style.top = (block.rowPos) * BLOCKSIZE + 'px';
        block.style.left = (block.colPos) * BLOCKSIZE + 'px'; // 更新 block 在浏览器显示的位置
}


```
在使用的时候，我们需要调用`rotate(document.getElementById('currentPiece'))`  
这样处理其实挺不优雅的。  
<br>

为了进行旋转这个操作，我们要做以下三件事情：  
1. 获取需要被操作的 `DOM` (调用 `getElementById`）；  
2. 通过计算，获得新的数据，并且赋值给目标 `DOM` 。这一步改变了它在内存中对应的数据。  
3. 更新目标 `DOM` 的外观（更新一个 `DOM` 的 `style` 属性，会触发浏览器的重新渲染机制，浏览器会花费大量时间重新计算外观，从而把这个 `DOM` 在正确的位置展示出来）  
<br>

我们更希望，能够用一个类似于全局变量的东西，去直接控制一个方块。  
具体地，当我们希望让一个方块下落一格，我们只需要调用 `currentPiece.row += 1` ，或者完整一点：  
```javascript
if (currentPiece.row < 19) {
    currentPiece.row += 1
} else {
    // 触底逻辑
}
```
这样就好。我们只想管逻辑，不想再去管它的 `style` 有没有被更新。最好 `style` 可以自动根据数据自动去更新。  
<br>

前端框架可以为我们实现这个目标。  
<br>

## 前端框架的核心功能
大部分的前端框架，都强调一点：数据绑定。  
<br>

原生 `JavaScript` 的 `workflow` 可能是这样：  

```javascript

data = process(some_raw_data) // 对原始数据进行处理和计算，得到处理结果，或者从服务器上拿到数据

view = get_view("some_view")  // 获取需要被更新的视觉元素（DOM）

update_view(data , view)     // 用计算出来的 data 更新视觉元素

```
这样做的问题在于，每次你重新计算 `data`，你是需要重新用 `update_view` 去更新一个 `view` 的（就像在俄罗斯方块里，你算出了方块的新位置，你需要手动去更新 `piece` 和 `block` 的 `style`）。

使用一个前端框架的 `workflow` 是这样的：  

```javascript
data = init_data // 初始化数据

view = getView("some_view") // 获得视觉元素 (DOM)

bind(view, data)  // 把 data 绑到 DOM 上

data = process(some_raw_data) // 更变数据
```

这样，看起来虽然多了一个`绑定 (bind)`的动作，但是好处是，你在后续所有的操作中，只需要操作 `data` 就可以了。比如，如果这里 `data` 记录了某个俄罗斯方块的位置，当你操作它下落的时候，你只需要写 `data.row += 1`，由于先前进行过了数据绑定，它会自动帮你把对应的 `DOM` 更新好。  
<br>

如果好奇这是怎么实现的，又不想深究框架的源代码，可以去搜索一下 `Observer Pattern` 和它的 `Java` 实现。  
<br>

## 效率相关
另一个使用框架的动机是在它的效率。还是看之前的旋转代码：  

```javascript
function rotate(piece) {

    // 省略

    for(var i = 0; i < 4; i++) { // 对于每个 block 

        // 省略

        block.style.top = (block.rowPos) * BLOCKSIZE + 'px';
        block.style.left = (block.colPos) * BLOCKSIZE + 'px'; // 更新 block 在浏览器显示的位置
}
```
这段代码，由于在循环里直接操作了元素的位置（一个一个 `block` 去操作），可能会让浏览器频繁触发 `回流（Reflow）` 操作（每次改变一个 `block` 的位置，都可能会重新绘制页面，计算布局）。这非常耗时。  
<br>

更高性能的方法，是先把原来这个 `piece` 整个扔掉，创建一个新的 `piece`，属性设置成新的，然后放回到页面里。这样，浏览器只要重新绘制一次页面就行了。  
<br>

这就是 `Virtual DOM` 的核心思想：针对一个需要改变的 `DOM`，在内存里组装一个 `DOM`，组装好了，再一口气放回到页面里，这样可以高效地完成页面的刷新。  
<br>

像 `React` 和 `Vue` 就是使用 `Virtual DOM` 的框架。加上数据绑定，这些框架可以让你很方便地开发高性能的应用。  
<br>

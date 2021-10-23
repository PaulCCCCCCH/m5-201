/*
 * Author: Chonghan Chen (paulcccccch@gmail.com)
 * -----
 * Last Modified: Tuesday, 23rd March 2021 4:51:44 pm
 * Modified By: Chonghan Chen (paulcccccch@gmail.com)
 * -----
 * Copyright (c) 2021 IceWould Information Technology Co., Ltd.
 */


/**
 * 定义方块和画面大小，在完成逻辑之前最好先不要动哦。 
 */
	
var BLOCKSIZE = 20;	//in pixel
var ROW_NUM = 20;
var COL_NUM = 10;

/*
	定义全部的七种方块。前三种已经定义好。
	定义完之后，请把 PIECE_NUM 设置成 7，以启用所有的方块。
*/
var PIECE_NUM = 3;
var bar = [[0, 0], [-1, 0], [1, 0], [2, 0]];
var sevenShape = [[0, -1], [0, 0], [1, 0], [2, 0]];
var square = [[0, 0], [1, 0], [0, 1], [1, 1]]
/************************
	YOUR CODE STARTS
*************************/
var sevenShapeReversed = undefined 
var hump = undefined
var zShape = undefined
var zShapeReversed = undefined
/************************
	YOUR CODE ENDS
*************************/


var LAYOUTS = [bar, sevenShape, square, sevenShapeReversed, hump, zShape, zShapeReversed];
var COLORS = ['red', 'blue', 'pink', 'purple', 'silver', 'orange', 'grey'];

// 定义储存游戏板的二维数组，以存储方块的状态
var occupationMatrix = new Array(20);
for(var i = 0; i < ROW_NUM; i++) {
	occupationMatrix[i] = new Array(COL_NUM);
}

// 生成一个新的方块
function generatePiece() {
	// 获取 HTML 文件中的内容板
	var el = document.getElementById('blocks'); 
	// 随机获取一种方块
	pieceIdx = Math.floor(PIECE_NUM * Math.random())

	// 生成一个方块的 DOM （其实是 HTML 中的一个 <div> 标签）
	// getPiece 这个函数是需要被完善的
	var newPiece = getPiece(pieceIdx);

	// 将这个方块挂到 HTML 内容板里
	newPiece.id = "currentPiece";
	el.appendChild(newPiece);
	setPosition(newPiece, 5, 5);	
}


function getPiece(pieceIdx) {
	/*
		在这个函数里，你需要返回一个 <div> 标签。
		你需要根据 pieceIdx，来从 LAYOUTS 这个变量中拿出对应的方块，

		提示：
		- 你可以使用 document.createElement 来生成 DOM
		- 你可以使用 DOM 变量的 .appendChild 方法来把其它 DOM 塞进去
		- 你可以直接设置 DOM 变量的各种字段，这就和在 HTML 标签里加各种参数效果一样

	*/

	/************************
		YOUR CODE STARTS
	*************************/

	var newPiece = document.createElement('div');
	newPiece.className = 'piece';
	newPiece.layout = LAYOUTS[pieceIdx]

	for (var i = 0; i < 4; i++) {
		var newBlock = document.createElement('div')
		newBlock.style.width = BLOCKSIZE + 'px';
		newBlock.style.height = BLOCKSIZE + 'px';
		newBlock.style.background = COLORS[pieceIdx];
		newBlock.className = 'block';
		newPiece.appendChild(newBlock);
	}

	/************************
		YOUR CODE ENDS
	*************************/

	return newPiece;
}


function setPosition(piece, row, col) {
	/**
	 * 请认真阅读这个函数。它的参数是一个 piece，以及它的新的行和列。
	 */

	// 拿到 piece 的所有子节点
	// blocks 就是一个数组，比如 blocks[0] 就是第一个 DOM
	var blocks = piece.children;

	// layout 就是第一题“定义方块”中的一种
	var layout = piece.layout;

	// 把新位置存储在母节点的对应属性中（只是记录一下而已，对页面没有什么影响）
	piece.rowPos = row;
	piece.colPos = col;

	// 设置母节点的位置
	piece.style.top = row * BLOCKSIZE + 'px';
	piece.style.left = col * BLOCKSIZE + 'px';

	// 设置所有子节点的位置，并储存
	for (var i = 0; i < 4; i++) {
		block = blocks[i]
		block.rowPos = row + layout[i][0];
		block.colPos = col + layout[i][1];
		block.style.top = block.rowPos * BLOCKSIZE + 'px';
		block.style.left = block.colPos * BLOCKSIZE + 'px';
	}
}



function fall() {
	/*
		每调用一次这个函数，当前的方块就会下落一格。
		请完成这个函数里所有的下落逻辑。
		提示：
		- 可以尝试使用 setPosition 函数
		- 先完成 downValid 这个函数，来判断方块下落是否到底
		- 落到底之后，务必把 piece 的 id 设置成空 (piece.id = "")，调用 check 函数检查游戏状态，然后再次调用 generatePiece，生成下一块 piece。
		- 

	*/
	var piece = document.getElementById("currentPiece");
	var blocks = piece.children;

	/************************
		YOUR CODE STARTS
	*************************/


	if (false) { // 如果这一个 piece 已经落到底了
		check();
		piece.id = "";
		generatePiece();
	}
	/************************
		YOUR CODE ENDS
	*************************/
	
}

function downValid(piece) {
	/*
		如果方块可以继续下落，返回 True
		否则返回 False	
	*/

	/************************
		YOUR CODE STARTS
	*************************/

	var blocks = piece.children;
	for(var i = 0; i < 4; i++) {
		var block = blocks[i];
		if (false) {
			return false;
		}
	}
	return true;

	/************************
		YOUR CODE ENDS
	*************************/
}


function fallToBottom(piece) {
	/**
	 * 这个函数会让方块一路落到最底
	 */

	/************************
		YOUR CODE STARTS
	*************************/


	/************************
		YOUR CODE ENDS
	*************************/

}

function rotate(piece) {
	/**
	 * 这个函数可以旋转当前方块
	 * 可能会用到一点线性代数的知识（百度：旋转矩阵）
	 * 拿笔和纸算一下就好啦～
	 * 感觉有难度的话请寻求帮助！
	 */

	/************************
		YOUR CODE STARTS
	*************************/


	/************************
		YOUR CODE ENDS
	*************************/

}

function valid(piece) {
	var blocks = piece.children;
	for(var i = 0; i < 4; i++) {
		var block = blocks[i];
		if (block.rowPos <= 0) {
			return true;
		}
		if (block.colPos < 0 || block.colPos >= COL_NUM || block.rowPos >= ROW_NUM || occupationMatrix[block.rowPos][block.colPos]) {
			return false;
		}
	}
	return true;
}


function moveLeft(piece) {
	/**
	 * 这个函数会让当前方块往左移动一格
	 * 注意要判断是否已经靠到墙上了！
	 */

	/************************
		YOUR CODE STARTS
	*************************/


	/************************
		YOUR CODE ENDS
	*************************/
}

function moveRight(piece) {
	/**
	 * 这个函数会让当前方块往右移动一格
	 * 注意要判断是否已经靠到墙上了！
	 */

	/************************
		YOUR CODE STARTS
	*************************/


	/************************
		YOUR CODE ENDS
	*************************/

}


function check() {
	/**
	 * 现在，我们需要在每次下落到底后，消除几行方块
	 * 或者，若是下落之后，方块触碰到了顶端，我们要判断游戏结束
	 * 这个函数需要反复被调用，一旦发现对应情况，就调用对应的函数
	 * 提示：你可以先试着完成 rowFull 和 topReached 这个函数
	 */
	/************************
		YOUR CODE STARTS
	*************************/


	/************************
		YOUR CODE ENDS
	*************************/
}

function rowFull(rowNumber) {
	/**
	 * 判断 rowNumber 这一行是否被填满，如果是，则返回 True
	 * 你可以用 occupationMatrix[rowNumber][i] 来读取某一个方块是否有方块
	 */

	/************************
		YOUR CODE STARTS
	*************************/


	return false
	/************************
		YOUR CODE ENDS
	*************************/
}

function topReached() {
	/**
	 * occupationMatrix 最顶部是否被方块占据，如果是，则返回 True
	 */

	/************************
		YOUR CODE STARTS
	*************************/


	return false
	/************************
		YOUR CODE ENDS
	*************************/


}

function clearRow(rowNumber) {
	/**
	 * 消除一行方块
	 * 你可以用 occupationMatrix[rowNumber][i] = null 来将一个位置释放出来。
	 * 你可以用一个 DOM 的 .parentNode 拿到它的母节点，然后用 .removeChild 方法将字节点删去。
	 * 提示：你需要把一行的所有 DOM 都拿出来，打破任何母子关系。
	 */
	/************************
		YOUR CODE STARTS
	*************************/


	/************************
		YOUR CODE ENDS
	*************************/

}

function show() {
	/**
	 * 刷新一次所有 DOM 在 HTML 页面上的位置
	 */
	var all = document.getElementById('blocks');
	var len = all.children.length;

	for(var i = 0; i < len; i++) {
		var piece = all.children[i];
		var len2 = piece.children.length;
		for(var j = 0; j < len2; j++) {
			var block = piece.children[j];
			block.style.top = (block.rowPos) * BLOCKSIZE + 'px';
			block.style.left = (block.colPos) * BLOCKSIZE + 'px';
		}
	}
}


function goDown(rowNumber) {
	/**
	 * 让方块下移一格
	 */
	for(var row = rowNumber - 1; row >= 0; row--) {
		for(var col = 0; col < COL_NUM; col++) {
			if(occupationMatrix[row][col]) {
				var block = occupationMatrix[row][col];
				block.rowPos += 1;
				occupationMatrix[row][col] = null;
				occupationMatrix[block.rowPos][block.colPos] = block;
			}
		}
	}
}

document.onkeydown = function(event) {

	var piece = document.getElementById("currentPiece");
	var b = event.keyCode;
	/**
	 * 允许玩家使用键盘控制游戏。
	 * 提示：可以使用 switch...case 语句。case 后跟的是键位对应的数值。具体数值可以问谷歌。
	 */

	/************************
		YOUR CODE STARTS
	*************************/


	/************************
		YOUR CODE ENDS
	*************************/
	return
}



function play() {
	/**
	 * 这个函数被调用后，游戏会开始。你可以清理一下 occupationMatrix，或者设置一些事件。
	 * 注意判断一下游戏是否已经开始。
	 */

	/************************
		YOUR CODE STARTS
	*************************/
	// 清除一下 occupationMatrix
	clearRow(1)

	generatePiece()
	// 每秒执行一次函数中的操作，比如下落
	window.a = setInterval(function() {
		fall()
	}, 1000)

	/************************
		YOUR CODE ENDS
	*************************/

}

function gameOver() {
	/**
	 * 游戏结束的时候可能需要调用这个函数。
	 */
	alert("gameOver");
	clearInterval(window.a);
} 

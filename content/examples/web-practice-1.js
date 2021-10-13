const HEIGHT = window.innerHeight;
const WIDTH = window.innerWidth;

function move(){
	var button = document.getElementById('huaji');
	var max_top = HEIGHT - 100;
	var max_left = WIDTH - 100;
	button.style.top = Math.round(Math.random()*max_top) + 'px';
	button.style.left = Math.round(Math.random()*max_left) + 'px';
}
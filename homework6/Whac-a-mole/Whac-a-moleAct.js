var start = false;
var num = 0;
var timer = 31;
var temp;
var before;

window.onload = function() {
	//create holes
	var _area = document.getElementById("area");
	for (var i = 59; i >= 0; i--) 
	{
		var hole = document.createElement("input");
		hole.type = "radio";
		hole.className = "holes";
		_area.appendChild(hole);
		hole.addEventListener('mousedown', beforeClick);
		hole.addEventListener('click', holeClick);
	}

	//button are clicked
	var Contral = document.getElementById("contral");
	Contral.addEventListener('click', game);
}

//button's conditon before clicked
function beforeClick(event) {
	before = this.checked;
}

function holeClick(event) {
	if(timer <= 0 || !start)
	{
		this.checked = false;
		return;
	}
	
	if(before)
	{//alert(1);
		this.checked = false;
		num++;
		mole();
		document.getElementById("score").value = num;
	}
	else
	{
		this.checked = false;
		// var h = document.getElementsByClassName("holes");
		// h[current].checked = true;
		num--;
		// if(num <= 0)
		// {
		// 	clearInterval(temp);
		// 	document.getElementById("prompt").value = "Gameover";
		// 	document.getElementById("score").value = 0;
		// 	alert("Gameover.\n Your score is: 0");
		// 	start = false;
		// 	clearMap();
		// 	return;
		// }
		//alert(num);
		document.getElementById("score").value = num;
	}
}


function game() {
	if(!start)
	{
		start = true;
		timer = 31;
		num = 0;
		clearMap();
		timeContral();
		mole();
        document.getElementById("score").value = num;
        document.getElementById("time").value = timer;
        document.getElementById("prompt").value = "Playing";
	}
	else
	{
		start = false;
		timer = 0;
		document.getElementById("prompt").value = "Gameover";
		clearInterval(temp);
		clearMap();
	}
}

function clearMap() {
	var t = document.getElementsByClassName("holes");
	for (var i = 59; i >= 0; i--) {
		if(t[i].checked)
		{
			t[i].checked = false;
		}
	}
}

function timeContral() {
	timer--;
	if(timer < 0)
	{
		document.getElementById("time").value = 0;
	}
	else
	{
		document.getElementById("time").value = timer;
	}
	
	temp = setTimeout(timeContral, 1000);
	if(timer < 0)
	{
		clearInterval(temp);
		document.getElementById("prompt").value = "Gameover";
		alert("Gameover.\n Your score is: " + document.getElementById("score").value);
		start = false;
		clearMap();
	}
}

function mole() {
	if(timer <= 0)
	{
		return;
	}
	
	var h = document.getElementsByClassName("holes");
	var t = Math.round(Math.random()*59);
	 // if (t > 59 || t < 0) { alert(t);}
	h[t].checked = true;
	
}
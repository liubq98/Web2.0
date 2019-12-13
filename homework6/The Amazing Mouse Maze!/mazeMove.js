var flag_start = false;
var flag_end = false;
var flag_path = [false, false, false, false, false];
var flag_wall = false;

window.onload = function() {
	var Wall = document.getElementsByClassName("wall");
	for (var i = Wall.length - 1; i >= 0; i--) 
	{
		Wall[i].addEventListener('mouseover', m_wall);
		Wall[i].addEventListener('mouseout', mout_wall);
	}

	var Path = document.getElementsByClassName("path");
	for (var i = Path.length - 1; i >= 0; i--) 
	{
		Path[i].addEventListener('mouseover', m_path);
	}

	var Start = document.getElementById("start");
	Start.addEventListener('mouseover', m_start);

	var End = document.getElementById("end");
	End.addEventListener('mouseover', m_end);
}

function m_start(event) {
	//whenever across the start button, we should reset the game
	flag_start = true;
	flag_end = false;
	flag_wall = false;
	for (var i = 4; i >= 0; i--) 
	{
		flag_path[i] = false;
	}

	document.getElementById("prompt").textContent = "Start";
	
}

function m_path(event) {
	switch(event.target.id)
	{
		case "path1":
			flag_path[0] = true;
			break;
		case "path2":
			flag_path[1] = true;
			break;
		case "path3":
			flag_path[2] = true;
			break;
		case "path4":
			flag_path[3] = true;
			break;
		case "path5":
			flag_path[4] = true;
			break;
	}
}

function m_wall(event) {
	if(flag_start && !flag_end) 
	{
		if(!flag_wall) 
		{
			event.target.className = "wall error";
		}
		flag_start = false;
		document.getElementById("prompt").textContent = "You Lose";
	}
	flag_wall = true;
	flag_start = false;
}

function mout_wall(event) {
	event.target.className = "wall";
}

function m_end(event) {
	if(flag_end || !flag_start)
	{
		document.getElementById("prompt").textContent = "Don't Cheat, you should start from the 'S' and move to the 'E' inside the maze!";
		flag_start = false;
		return;
	}
	
	flag_end = true;
	if(!flag_wall && flag_path[1] && flag_path[2] && flag_path[3] && flag_path[4] && flag_path[0])
	{
		document.getElementById("prompt").textContent = "You Win";
	}
	else
	{
		document.getElementById("prompt").textContent = "Don't Cheat, you should start from the 'S' and move to the 'E' inside the maze!";
	}
	
	flag_start = false;
}

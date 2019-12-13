var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
var step = 0;
var flag_s = false;

window.onload = function () {
	flag_s = false;
	
	step = 0;
	$('#num').val(step);

	var parts = $('.cut');
	for(var i = 0; i < 16; i++)
	{
		$(parts[i]).click(move);
	}

	$('#start').click(game_start);
	$('#end').click(game_over);
}

function game_start() {
	flag_s = true;

	step = 0;
	$('#num').val(step);

	while(1)
	{
		arr.sort(sort_by);

		var temp = 0;
		for (var i = 0; i < 16; i++) 
		{
			for (var j = i + 1; j < 16; j++) 
			{
				if (arr[j] < arr[i]) 
				{
					temp++;
				}
			}
		}
		if(temp%2===0)
		{
			break;
		}
	}
	
	var cut = $('.cut');
	for(var i = 0; i < 15; i++)
	{
		$(cut[i]).attr("class", "cut position" + arr[i]);
	}
	$(cut[15]).attr("class", "cut position16");
}

function sort_by() {
	return 0.5-Math.random();
}

function move() {
	if(!flag_s)
	{
		return;
	}

	var p16 = $('#picture16');

	var flag1 = 0;
	var flag2 = 0;
	for(var i = 1; i <= 16; i++)
	{
		if($(this).attr("class") == ("cut position" + i))
		{
			flag1 = i;
		}
		else if($(p16).attr("class") == ("cut position" + i))
		{
			flag2 = i;
		}
	}

	if((Math.abs(flag1 - flag2) == 1 || Math.abs(flag1 - flag2) == 4) && !(flag1 == 4 && flag2 == 5) && !(flag1 == 8 && flag2 == 9) && !(flag1 == 12 && flag2 == 13) && !(flag2 == 4 && flag1 == 5) && !(flag2 == 8 && flag1 == 9) && !(flag2 == 12 && flag1 == 13))
	{
		var name = $(this).attr("class");
		$(this).attr("class", p16.attr("class"));
		p16.attr("class", name);

		step++;
		$('#num').val(step);
	}
	
	for(var i = 1; i <= 16; i++)
	{
		if($('#picture'+i).attr("class") != "cut position" + i)
		{
			return;
		}
	}

	setTimeout('alert("You Win! Your steps are: "+step)', 300);
}

function game_over() {
	flag_s = false;

	step = 0;
	$('#num').val(step);

	for(var i = 1; i <= 16; i++)
	{
		$('#picture'+i).attr("class", "cut position" + i);
	}
}
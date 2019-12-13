var flag = [false, false, false, false, false];
var arr = [0, 1, 2, 3, 4];
var arrId = ['A', 'B', 'C', 'D', 'E'];
var isStart = false;

var flag_info = false;

var turn = 0;

$(function() {
	$('#button').hover(getIn, getOut);
	$('.apb').click(robortStart);
});

function robortStart() {
	if(turn === 5)
	{
		turn = 0;
	}

	arr.sort(sort_by);

	var str = "["+arrId[arr[0]]+", "+arrId[arr[1]]+", "+arrId[arr[2]]+", "+arrId[arr[3]]+", "+arrId[arr[4]]+"]";
	$('#order').text(str);
	
	getNum();
}

function sort_by() {
	return 0.5-Math.random();
}

function getNum() {
	if(flag[arr[turn]] || isStart)
	{
		return;
	}

	var id = arr[turn];
	turn++;

	$.ajax({
		url:"/",
		beforeSend: function() {
			$('#S_'+id).css('opacity', 1);
			$('#S_'+id).text('...');
			flag[id] = true;
			isStart = true;
			restDisable(id);
		},
		success: function(data) {
			$('#S_'+id).text(data);
			liEnable(id);
			isStart = false;
			if(turn < 5)
			{
				getNum();
			}
		}
	});


}

function restDisable(id) {
	for(var i = 0; i < 5; i++)
	{
		if(!flag[i])
		{
			$('#'+i).css('background-color', 'grey');
		}
	}
}

function liEnable(id) {
	$('#'+id).css('background-color', 'grey');
	for(var i = 0; i < 5; i++)
	{
		if(!flag[i])
		{
			$('#'+i).css('background-color', '#303F9F');
		}
	}

	if(flag[0]&&flag[1]&&flag[2]&&flag[3]&&flag[4])
	{
		flag_info = true;
		$('#info-bar').css('background-color', '#303F9F');
	getSum();
	}
	else
	{
		$('#info-bar').css('background-color', 'grey');
		$('#sum').text('');
	}
}


function getSum() {
	if(!(flag[0]&&flag[1]&&flag[2]&&flag[3]&&flag[4]))
	{
		return;
	}
	if(!flag_info)
	{
		return;
	}

	var sum = parseInt(parseInt($('#S_0').text()) + parseInt($('#S_1').text()) + parseInt($('#S_2').text()) + parseInt($('#S_3').text()) + parseInt($('#S_4').text()));
	$('#sum').text(sum);
	$('#info-bar').css('background-color', 'grey');

	flag = [false, false, false, false, false];
	isStart = false;
	flag_info = false;
	$('li').css('background-color', '#303F9F');
}


function getIn() {
	console.log("Start");
}

function getOut() {
	$('#order').text('');
	turn = 5;

	flag = [false, false, false, false, false];
	isStart = false;
	flag_info = false;

	$('.unread').css('opacity', 0);
	$('.unread').text('');
	$('li').css('background-color', '#303F9F');

	$('#sum').text('');
	$('#info-bar').css('background-color', 'grey');
	
	console.log("End");
}
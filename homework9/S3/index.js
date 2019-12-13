var flag = [false, false, false, false, false];
var arr = [0, 1, 2, 3, 4];
var isStart = false;

var start = false;
var flag_info = false;

var turn = 0;

var num = 0;

$(function() {
	$('#button').hover(getIn, getOut);
	$('.apb').click(robortStart);
});

function robortStart() {
	num++;
	start = true;
	if(turn === 5)
	{
		turn = 0;
	}

	for(var i = 0; i < 5; i++)
	{
		$('#S_'+i).css('opacity', 1);
		$('#S_'+i).text('...');
	}
	arr.sort(sort_by);
	
	getNum(0);
	getNum(1);
	getNum(2);
	getNum(3);
	getNum(4);
}

function sort_by() {
	return 0.5-Math.random();
}

function getNum(i) {
	// if(flag[arr[i]] || isStart)
	// {console.log(100);
	// 	return;
	// }

	var id = arr[i];
	turn++;

	$.ajax({
		url:"/"+id+num,
		beforeSend: function() {
			// $('#S_'+id).css('opacity', 1);
			// $('#S_'+id).text('...');
			
			isStart = true;
			// restDisable(id);
		},
		success: function(data) {
			$('#S_'+id).text(data);
			flag[id] = true;
			liEnable(id);
			isStart = false;
		}
	});


}

// function restDisable(id) {
// 	for(var i = 0; i < 5; i++)
// 	{
// 		if(!flag[i])
// 		{
// 			$('#'+i).css('background-color', 'grey');
// 		}
// 	}
// }

function liEnable(id) {
	if(!start)
	{
		return;
	}

	$('#'+id).css('background-color', 'grey');
	// for(var i = 0; i < 5; i++)
	// {
	// 	if(!flag[i])
	// 	{
	// 		$('#'+i).css('background-color', '#303F9F');
	// 	}
	// 
		

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
	// $('li').css('background-color', '#303F9F');
}


function getIn() {
	start = false;
	$('li').css('background-color', '#303F9F');
	console.log("Start");
}

function getOut() {
	start = false;
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
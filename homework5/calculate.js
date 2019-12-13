var num = 0;
function fun(num) {
	if(document.getElementById("screen").value == "INVALID!" || document.getElementById("screen").value == "Infinity" || document.getElementById("screen").value == "undefined")
	{
		document.getElementById("screen").value = "";
	}
	else if(document.getElementById("screen").value.length == 17)
	{
		return;
	}
	document.getElementById("screen").value += document.getElementById(num).value;
}

function qingchu() {
	document.getElementById("screen").value = "";
	//document.getElementById("screen").focus();
}

function tui() {
	if(document.getElementById("screen").value == "INVALID!" || document.getElementById("screen").value == "Infinity" || document.getElementById("screen").value == "undefined")
	{
		document.getElementById("screen").value = "";
		return;
	}
	var arr = document.getElementById("screen");
	arr.value = arr.value.substring(0, arr.value.length - 1);
}


function result() {
	var flag1 = 0;
	var flag2 = 0;
	var array = document.getElementById("screen");
	var arr = array.value;

	if(((arr[0] > "9" || arr[0] < "0") || (arr[arr.length - 1] > "9" || arr[arr.length - 1] < "0")) && (arr[0] != "(" && arr[arr.length - 1] != ")" && arr[0] != "-" && arr[0] != "." && arr[0] != "+"))
	{
		document.getElementById("screen").value = "INVALID!";
		return;
	}

	
	for (var i = 0; i <= arr.length - 1; i++) 
	{
		if(arr[i] == "(" && (arr[i + 1] == "+" || arr[i + 1] == "-") && (arr[i + 2] <= "9" && arr[i + 2] >= "0" || arr[i + 2] == "."))
		{
			var temp1 = arr.substring(0, i + 1);
			var temp2 = arr.substring(i + 1, arr.length);
			document.getElementById("screen").value = temp1 + "0" + temp2;
			arr = document.getElementById("screen").value;
		}

		if(arr[i] == "0" &&  (arr[i + 1] <= "9" && arr[i + 1] >= "0") && (i == 0 || (arr[i - 1] > "9" || arr[i - 1] < "0") && arr[i - 1] != "." ))
		{
			var temp1 = arr.substring(0, i);
			var temp2 = arr.substring(i + 1, arr.length);
			document.getElementById("screen").value = temp1 + temp2;
			arr = document.getElementById("screen").value;
		}
	}
	arr = document.getElementById("screen").value;

	if(arr[0] == "(")
	{
		flag2 += 1;
	}
	if(arr.length == 1 && (arr[0] > "9" || arr[0] < "0"))
	{
		document.getElementById("screen").value = "INVALID!";
		return;
	}
	for (var i = arr.length - 1; i > 0; i--) 
	{
		if(arr[i] == ")")
		{
			flag1 += 1;
		}
		else if(arr[i] == "(")
		{
			flag2 += 1;
		}

		if((arr[i] > "9" || arr[i] < "0") && (arr[i - 1] > "9" || arr[i - 1] < "0") && ((arr[i - 1] == ")" && arr[i] != "(") || (arr[i] == "(" && arr[i - 1] != ")")))
		{
			continue;
		}
		else if(((arr[i] <= "9" && arr[i] >= "0") && (arr[i - 1] == ".")) || ((arr[i - 1] > "9" || arr[i - 1] < "0") && (arr[i] == ".") && (arr[i - 1] != ".")))
		{
			continue;
		}
		else if(((arr[i] > "9" || arr[i] < "0") && (arr[i - 1] > "9" || arr[i - 1] < "0")) || (arr[i] == "0" && arr[i - 1] == "/" && arr[i + 1] != "."))
		{
			document.getElementById("screen").value = "INVALID!";
			return;
		}
	}
	if(flag1 != flag2)
	{
		document.getElementById("screen").value = "INVALID!";
		return;
	}

	for (var i = 0; i <= arr.length - 1; i++) 
	{
		if((arr[i] <= "9" && arr[i] >= "0" || arr[i] == ".") && (arr[i + 1] == "(" || arr[i - 1] == ")"))
		{
			document.getElementById("screen").value = "INVALID!";
			return;
		}
	}
		
	var flag4 = 0;
	for (var i = arr.length - 1; i >= 0; i--)
	{
		if(arr[i] == ".")
		{
			flag4 += 1;
		}
		else if((arr[i] > "9" || arr[i] < "0" && arr[i] != ".") && (flag4 > 0))
		{
			flag4 -= 1;
		}
	}
	if(flag4 != 1 && flag4 != 0)
	{
		document.getElementById("screen").value = "INVALID!";
		return;
	}

	document.getElementById("screen").value = eval(document.getElementById("screen").value);

	var arr2 = document.getElementById("screen").value;
	var flag3 = 0;
	for (var i = arr2.length - 1; i >= 0; i--)
	{
		if (document.getElementById("screen").value[i] == ".")
		{
			document.getElementById("screen").value = eval(document.getElementById("screen").value).toFixed(10);
			flag3 = 1;
			break;
		}
	}


	var arr3 = document.getElementById("screen").value;
	if(flag3 == 1)
	{
		for (var i = arr3.length - 1; i >= 0; i--)
		{
			if(document.getElementById("screen").value[i] == ".")
			{
				var arr5 = document.getElementById("screen").value;
				document.getElementById("screen").value = arr5.substring(0, arr5.length - 1);
				break;
			}
			else if (document.getElementById("screen").value[i] == "0")
			{
				var arr4 = document.getElementById("screen").value;
				document.getElementById("screen").value = arr4.substring(0, arr4.length - 1);
			}
			else
			{
				break;
			}
		}
	}
	// if(document.getElementById("screen").value == "Infinity");
	// {alert(1);
	// 	document.getElementById("screen").value = "INVALID!";
	// }
}

// function onLoad() {
// 	document.getElementById("screen").focus();
// }
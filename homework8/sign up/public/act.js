$(function() {
	$('#restart').click(reStart);
	$('#submit').click(isValid);
	$('#username').find('input').blur(nameValid);
	$('#id').find('input').blur(idValid);
	$('#phone').find('input').blur(phoneValid);
	$('#email').find('input').blur(emailValid);
});

function reStart() {
	$('#error').css('opacity', '0');
	$('.in').val('');
}

function isValid() {
        return nameValid()&&idValid()&&phoneValid()&&emailValid();
}

function nameValid() {
	var username = $('#username').find('input').val();
	if(/^[a-zA-Z][a-zA-Z0-9_]{5,17}$/.test(username))
	{
		$('#error').css('opacity', '0');
		return true;
	}
	else
	{
		if(username.length >= 6 && username.length <= 18)
		{
			if(!(/^[^a-zA-Z]/.test(username)))
			{
				if(/[^a-zA-Z0-9_]/.test(username))
				{
					$('#error').val("用户名由英文字母、数字或下划线组成");
				}
			}
			else
			{
				$('#error').val("用户名必须以英文字母开头");
			}
		}
		else
		{
			$('#error').val("用户名长度需为6~18位");
			
		}
		$('#error').css('opacity', '1');
		return false;
	}
}

function idValid() {
	var id = $('#id').find('input').val();
	if(/^[1-9][0-9]{7}$/.test(id))
	{
		$('#error').css('opacity', '0');
		return true;
	}
	else
	{
		if(id.length == 8)
		{
			if(!(/[^0-9]/.test(id)))
			{
				if(/^[0]/.test(id))
				{
					$('#error').val("学号不能以0开头");
				}
			}
			else
			{
				$('#error').val("学号每一位均为数字");
			}
		}
		else
		{
			$('#error').val("学号长度需为8位");
		}
		$('#error').css('opacity', '1');
		return false;
	}
}

function phoneValid() {
	var phone = $('#phone').find('input').val();
	if(/^[1-9][0-9]{10}$/.test(phone))
	{
		$('#error').css('opacity', '0');
		return true;
	}
	else
	{
		if(phone.length == 11)
		{
			if(!(/[^0-9]/.test(phone)))
			{
				if(/^[0]/.test(phone))
				{
					$('#error').val("电话不能以0开头");
				}
			}
			else
			{
				$('#error').val("电话每一位均为数字");
			}
		}
		else
		{
			$('#error').val("电话长度需为11位");
		}
		$('#error').css('opacity', '1');
		return false;
	}
}

function emailValid() {
	var email = $('#email').find('input').val();
	if(/^[0-9a-zA-Z_\-]+@(([a-zA-Z_\-])+\.)+[a-zA-Z]{2,4}$/.test(email))
	{
		$('#error').css('opacity', '0');
		return true;
	}
	else
	{
		$('#error').val("邮箱格式错误");
		$('#error').css('opacity', '1');
		return false;
	}
}
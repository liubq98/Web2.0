// 'use strict';

var http = require('http');
var fs = require('fs');
var url = require('url');
var querystring = require('querystring');
var path = require('path');

function register1(res) {
    fs.readFile('../public/index.html', 'utf-8', function(err, data) {
        if (err) {
            res.writeHead(404, { "Content-Type": "text/html" });
            res.end(err.toString());
        } else {
            res.writeHead(200, { "Content-Type": "text/html" });
            res.end(data);
        }
    });
}

function otherFiles(res, pathname) {
	var extName = path.extname(pathname);

	if(extName == '.ico')
	{
		res.writeHead(404);
		res.end();
	}

	if(extName == '.html')
	{
		register1(res);
	}
	else if(extName == '.css')
	{
		fs.readFile('../public/style.css', function(err, data) {
			if (err) {
                res.writeHead(404, { 'Content-Type': 'text/css' });
                res.end(err.toString());
            } else {
                res.writeHead(200, { 'Content-Type': 'text/css' });
                res.write(data);
            }
            res.end();
		});
	}
	else if(extName == '.js')
	{
		fs.readFile('../public/'+pathname.slice(1).toString(), function(err, data) {
			if (err) {
                res.writeHead(404, { 'Content-Type': 'application/javascript' });
                res.end(err.toString());
            } else {
                res.writeHead(200, { 'Content-Type': 'application/javascript' });
                res.write(data);
            }
            res.end();
		});
	}
}

function register2(res, info) {
	var newData = querystring.parse(info);
	var tempData = fs.readFileSync('../test/data.json', 'utf-8');
	var jsonData = JSON.parse(tempData);

	var flag = true;
	for(i in jsonData)
	{
		if(jsonData[i].username == newData.username)
		{
			flag = "username";
			break;
		}
		else if(jsonData[i].id == newData.id)
		{
			flag = "id";
			break;
		}
		else if(jsonData[i].phone == newData.phone)
		{
			flag = "phone";
			break;
		}
		else if(jsonData[i].email == newData.email)
		{
			flag = "email";
			break;
		}
	}

	if(flag == true)
	{
		console.log('register succeed!');

		jsonData.push(newData);
		fs.writeFileSync('../test/data.json', JSON.stringify(jsonData), 'utf-8');
		res.writeHead(302, {'Location': ('http://127.0.0.1:8000/?username=' + newData.username)});
		res.end();
	}
	else
	{
		console.log(flag+' repeat, failed to register!');

        res.writeHead(200, {"Content-Type": "text/html"});
        res.write(fs.readFileSync('../public/index.html', 'utf-8'));
        res.write("<script>" +
                "$('#error').val(\"" + flag + " repeat!\");" +
                "$('#error').css('opacity', '1');" +
                "</script>");
        res.end();
	}

}

function getInfo(res, name) {
	var tempData = fs.readFileSync('../test/data.json', 'utf-8');
	var jsonData = JSON.parse(tempData);
	for(i in jsonData)
	{
		if(jsonData[i].username == name)
		{
			console.log("Get user info succeed!");

			res.writeHead(200, {"Content-Type": "text/html"});
			res.write(fs.readFileSync('../public/info.html', 'utf-8'));
			res.write("<script>" +
				"$('#username').find('input').val(\"" + jsonData[i].username + "\");" +
				"$('#id').find('input').val(\"" + jsonData[i].id + "\");" +
				"$('#phone').find('input').val(\"" + jsonData[i].phone + "\");" +
				"$('#email').find('input').val(\"" + jsonData[i].email + "\");" +
				"</script>");
			res.end();
			return;
		}
	}
	console.log("Failed to get user info!");
	register1(res);
}

function start() {
	http.createServer(function (req, res) {
		var reqUrl = url.parse(req.url, true);
		var name = reqUrl.query.username;
		var pathname = reqUrl.pathname;

		var result = '';
		req.on('data', function(chunk) {
			result += chunk;
		});
		
		req.on('end', function() {
			if(req.method === 'GET')
			{
				if(pathname == '/')
				{
					if(name == null)
					{
						register1(res);
					}
					else
					{
						getInfo(res, name);
					}
				}
				else
				{
					otherFiles(res, pathname);
				}
			}
			else
			{
				register2(res, result);
			}
			
		});
	}).listen(8000);

	console.log('Server running at 127.0.0.1:8000');
}

exports.start = start;
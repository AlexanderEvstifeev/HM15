var http = require('http');
var fs = require('fs');
var Event = require('events').EventEmitter;
var emt = new Event();
var data = new Date();

emt.on('login', function() {
    fs.appendFile('logger.txt', data + ' User logIN \n\r', function () {
        console.log(data + ' User logIN!');
    });
});
emt.on('active', function() {
    fs.appendFile('logger.txt', data + ' User online \n\r', function () {
        console.log(data + ' User online!');
    });
});
emt.on('exit', function() {
    fs.appendFile('logger.txt', data + ' User logOUT \n\r', function () {
        console.log(data + ' User logOUT!');
    });
});

http.createServer(function (req,res) {
	res.writeHead(200, {'Content-Type': 'text/html; charset=utf8'});
	switch (req.url) {
		case '/':
				res.write("<a href='/login'>Вход</a><br>");
				emt.emit('active');
				break;
		case '/login':
				res.write("<a href='/exit'>Выход</a>");
				emt.emit('login');
				break;
		case '/exit':
				res.write("<a href='/'>В начало</a><br>");
				emt.emit('exit');
				break;
		default:
				res.write("404");
	}

	res.end();
}).listen(3000, function () {
	console.log('Серевер работает на localhost:3000');
});
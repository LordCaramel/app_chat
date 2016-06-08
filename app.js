var express = require('express');
var app = express();
var path = require('path');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.static('public'));

app.get('/', function(req, res) {
	res.render('index');
});

var server = app.listen(5555, function() {
	console.log('Server is running on poer: 5555');
});

var io = require('socket.io').listen(server);

io.on('connection', function(socket) {
	socket.on('chatter', function(message) {
		console.log('message : ' + message);
		
		io.emit('chatter', message);
	});
});

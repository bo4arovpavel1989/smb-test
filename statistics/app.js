var server = require('http').createServer();
//var io = require('socket.io')(server);
var socketClusterServer = require('socketcluster-server');

var socketioRequests = require('.socketrequests').socketioRequests;
console.log("App runs");
		
var scServer = socketClusterServer.attach(server);


server.on('request', app);
		
scServer.on('connection', function(client){
	socketioRequests(client, scServer);
});

server.listen(80);
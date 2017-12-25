var server = require('http').createServer();
var express = require('express');
var socketClusterServer = require('socketcluster-server');
var app = express();
var socketioRequests = require('./socketrequests.js').socketioRequests;
console.log("App runs");
		
var scServer = socketClusterServer.attach(server);

server.on('request', app);
		
scServer.on('connection', function(client){
	socketioRequests(client, scServer);
});

server.listen(80);
var User = require('./mongo').User;
var Question = require('./mongo.js').Question;

 var socketioRequests  = function (client, scServer) {
	client.on('new_result',(data)=>{
		console.log(data);
	});	
 };


module.exports.socketioRequests = socketioRequests;
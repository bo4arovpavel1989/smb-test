var Result = require('./mongo').Result;
var Question = require('./mongo.js').Question;

 var socketioRequests  = function (client, scServer) {
	
	console.log("Client connected...");
	 
	client.on('new_result',(data)=>{
		console.log(data);
		var result = new Result(data.user).save();
		data.questions.forEach(question=>{
			var qToWrite = new Question(question).save();
		});
	});	
 };


module.exports.socketioRequests = socketioRequests;
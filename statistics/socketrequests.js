var Result = require('./mongo').Result;
var Question = require('./mongo.js').Question;
var async = require('async');

 var socketioRequests  = function (client, scServer) {
	
	console.log("Client connected...");
	 
	client.on('new_result',(data)=>{
		console.log(data);
		var result = new Result(data.user).save();
		data.questions.forEach(question=>{
			var qToWrite = new Question(question).save();
		});
	});	
	
	client.on('get_data',(fields)=>{
		console.log(fields);
		var dateFrom = new Date(Date.UTC(fields.yearFrom, fields.monthFrom, 1));
		var dateTo = new Date(Date.UTC(fields.yearTo, Number(fields.monthTo)+1, 0));
		var qRegex = new RegExp(fields.question, 'ui');
		var packData={questions:[],results:[]};
		async.parallel([
		(cbk)=>{
			Result.find({
					date:{$gte:dateFrom,$lt:dateTo},
					dept:fields.dept,
					shift:fields.shift
				},(err, rep)=>{
				if(err) cbk(new Error());
				packData.results = rep;
				cbk();
			});
		},
		(cbk)=>{
			if(fields.question.length>0){
				Question.find({
						date:{$gte:dateFrom,$lt:dateTo},
						question:{$regex:qRegex},
						answer:Number(fields.answer)
					},(err, rep)=>{
					if(err) cbk(new Error());
					packData.questions = rep;
					cbk();
				});
			} else cbk();
		}],(err)=>{
			client.emit('take_data',packData)
		});
	});
 };


module.exports.socketioRequests = socketioRequests;
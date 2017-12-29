var Result = require('./mongo').Result;
var Question = require('./mongo.js').Question;
var async = require('async');

 var socketioRequests  = function (client, scServer) {
	
	console.log("\r\n Client connected...\r\n");
	 
	client.on('new_result',(data)=>{
		var result=data.user;
		result.date = new Date();
		console.log(result);
		var resultToWrite = new Result(result).save();
		data.questions.forEach(question=>{
			var qToWrite = question;
			qToWrite.date = new Date();
			var writing = new Question(qToWrite).save();
		});
	});	
	
	client.on('get_data',(fields)=>{
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
				}).sort({relation:-1}).exec((err, rep)=>{
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
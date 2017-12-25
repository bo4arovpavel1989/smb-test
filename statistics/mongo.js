var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/smb-test');
mongoose.Promise = global.Promise;

var Result = new mongoose.Schema({
	name: {type: String},
	surname: {type: String},
	parentname: {type: String},
	dept: {type: String},
	shift:{type:String},
	date:{type:Date,default:new Date()},
	relation:{type:Number},
	details:{type:Array}
});

var Question = new mongoose.Schema({
	question:{type:String},
	date:{type:Date,default:new Date()},
	name: {type: String},
	surname: {type: String},
	parentname: {type: String},
	answer:{type:Number}
})


module.exports.Result = mongoose.model('result', Result);
module.exports.Question = mongoose.model('question', Question);

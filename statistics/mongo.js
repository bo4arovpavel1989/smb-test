var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/smb-test');
mongoose.Promise = global.Promise;

var User = new mongoose.Schema({
	name: {type: String},
	surname: {type: String},
	parentname: {type: String},
	dept: {type: Number},
	shift:{type:Number},
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


module.exports.User = mongoose.model('user', User);
module.exports.Question = mongoose.model('question', User);

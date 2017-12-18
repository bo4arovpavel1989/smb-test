(function(){
	
	function TestHandler(){
		this.questions;
	};
	
	TestHandler.prototype.addQuestions = function(questions){
		this.questions=questions;
	};
	
	TestHandler.prototype.renderTest = function(){
		this.questions.forEach(function(question){
			var source   = $("#"+question.type).html();
			var template = Handlebars.compile(source);
			var context = question;
			var html    = template(context);
			$('#formload').append(html);
		});
		$('#formload').show(600);
		$('#finishTest').show(400);
	}
	
	window.TestHandler=TestHandler;
})();
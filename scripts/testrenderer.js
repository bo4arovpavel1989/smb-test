(function(){
	
	function TestRenderer(){
		this.questions;
	};
	
	TestRenderer.prototype.addQuestions = function(questions,variant){
		this.questions=questions[variant];
		$('#varnumber').text('Вариант №'+(variant+1));
	};
	
	TestRenderer.prototype.renderTest = function(){
		this.questions.forEach(function(question){
			var source   = $("#"+question.type).html();
			var template = Handlebars.compile(source);
			var context = question;
			var html    = template(context);
			$('#formload').append(html);
		});
		$('#formload').fadeIn(600);
		$('#finishTest').show(400);
	}
	
	window.TestRenderer=TestRenderer;
})();
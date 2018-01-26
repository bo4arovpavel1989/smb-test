(function(){
	
	function TestRenderer(){
		this.questions;
	};
	
	TestRenderer.prototype.addQuestions = function(questionsPack,variant){
		this.questions=questionsPack;
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
		catalogItemCounter('.fieldCount');
		this.checkAll();
		$('#formload').fadeIn(600);
		$('#finishTest').show(400);
	}
	
	TestRenderer.prototype.checkAll = function(){
		$('.check_all').on('click',function(){
			if( $(this).is(':checked') ) {
				$(this).closest('form').find('input:not(:checked):not(.check_all)').trigger('click');
			}
		});
	}
	
	window.TestRenderer=TestRenderer;
})();
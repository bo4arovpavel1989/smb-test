(function(){
	var statRenderFunctions=[];
	
	statRenderFunctions[0] = function(results, formFields){
		var context = {results:results, shift:formFields.shift};
		if(formFields.dept=='1') context.dept = 'оперативной группы'
		else if(formFields.dept=='2') context.dept = 'суточной смены'
		
		$('#loadResults').empty();
		var source   = $("#results_table").html();
		var template = Handlebars.compile(source);
		var html    = template(context);
		$('#loadResults').append(html);
	}
	
	statRenderFunctions[1] = function(data){
		
	}
	
	statRenderFunctions[2] = function(data){
		
	}
	
	var questionRenderFunctions=[];
	
	questionRenderFunctions = function(questions,q,a){
		var context = {question:q, questions:questions,answer:''};
		
		if(a==0) context.answer='правильный';
		else if(a==1) context.answer='частично-верный';
		else context.answer='неверный';
		
		$('#loadQuestions').empty();
		var source   = $("#questions_table").html();
		var template = Handlebars.compile(source);
		var html    = template(context);
		$('#loadQuestions').append(html);
	}
		
	window.statRenderFunctions = statRenderFunctions;
	window.questionRenderFunctions = questionRenderFunctions;
})();
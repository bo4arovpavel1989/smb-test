(function(){
	$(document).ready(function(){
		var answerSubmit = new AnswerSubmit();
		var userData = new UserData();
		var testRenderer = new TestRenderer();
		var variant=  Math.floor(Math.random() * (questions.length));
		$('#varnumber').text(variant+1);
		userData.setName(prompt('Представьтесь, пожалуйста!'));
		userData.getMax(questions[variant]);
		testRenderer.addQuestions(questions[variant]);
		testRenderer.renderTest()
		answerSubmit.setSelector('test');
		answerSubmit.setRemains(questions[variant]);
		answerSubmit.submitHandler(userData);
		userData.setTimer();
		userData.finishTest();
	});
})();
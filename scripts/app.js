(function(){
	$(document).ready(function(){
		var answerSubmit = new AnswerSubmit();
		var userData = new UserData();
		var testHandler = new TestHandler();
		var variant=  Math.floor(Math.random() * (questions.length));
		userData.setName(prompt('Представьтесь, пожалуйста!'));
		userData.getMax(questions[variant]);
		testHandler.addQuestions(questions[variant]);
		testHandler.renderTest()
		answerSubmit.setSelector('test');
		answerSubmit.setLength(questions[variant]);
		answerSubmit.submitHandler(userData);
		userData.finishTest();
	});
})();
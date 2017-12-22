(function(){
	$(document).ready(function(){
		var answerSubmit = new AnswerSubmit();
		var userData = new UserData();
		var testRenderer = new TestRenderer();
		var variant=  Math.floor(Math.random() * (questions.length));
		userData.chooseDept();
		userData.submitUserData().then(
			function(){
				userData.setTimer();
				userData.finishTest(answerSubmit);
				userData.setMax(questions[variant]);
				testRenderer.addQuestions(questions,variant);
				testRenderer.renderTest()
				answerSubmit.setSelector('test');
				answerSubmit.setRemains(questions[variant]);
				answerSubmit.submitHandler(userData);
			}
		);	
	});
})();
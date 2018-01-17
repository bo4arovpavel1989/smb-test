(function(){
	$(document).ready(function(){
		changeLanguage();
		var answerSubmit = new AnswerSubmit();
		var userData = new UserData();
		var testRenderer = new TestRenderer();
		userData.chooseDept();
		userData.submitUserData().then(
			function(){
				var variant=  Math.floor(Math.random() * (questions['dept'+userData.personalData.dept].length));
				var questionsPack = questions['dept'+userData.personalData.dept][variant];
				userData.setTimer();
				userData.finishTest(answerSubmit);
				userData.setMax(questionsPack);
				testRenderer.addQuestions(questionsPack,variant);
				testRenderer.renderTest();
				answerSubmit.setSelector('test');
				answerSubmit.setRemains(questionsPack);
				answerSubmit.submitHandler(userData);
			},
			function(error){
				alert(error);
			}
		);	
	});
})();
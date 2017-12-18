(function(){
	
	function AnswerSubmit(){
		this.selector;
		this.length;
	}
	
	AnswerSubmit.prototype.setSelector = function(selector){
		this.selector=selector;
	}
	
	AnswerSubmit.prototype.setLength = function(arr){
		this.length=arr.length;
	}
	
	AnswerSubmit.prototype.submitHandler = function(userData, fn){
		var self=this;
		$('.'+this.selector).on('submit', function(e){
			e.preventDefault();
			$(this).parent().fadeOut(200);
			self.length = self.length - 1;
			self.checkAnswer (userData, $( this ).serializeArray(), $(this).data('type'), $(this).data('answer') );
			if(self.length==0) $('#finishTest').trigger('click');
		});
	}
	
	AnswerSubmit.prototype.checkAnswer=function(userData, data, type, rightAnswer){
		if(type === 'simplesum') {
			data.forEach(function(item){
				userData.sum += Number(item.value);
			})
		} else if (type==='sequence') {
			var textAnswer='';
			data.forEach(function(item){
				textAnswer += item.value;
			});
			if(Number(textAnswer)===rightAnswer) userData.sum++;
		}
	};
	window.AnswerSubmit=AnswerSubmit;
})();
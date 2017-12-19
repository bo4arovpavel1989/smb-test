(function(){
	
	function AnswerSubmit(){
		this.selector;
		this.remains;
	}
	
	AnswerSubmit.prototype.setSelector = function(selector){
		this.selector=selector;
	}
	
	AnswerSubmit.prototype.setRemains = function(arr){
		this.remains=arr.length;
	}
	
	AnswerSubmit.prototype.showRight = function(form){
		var inputs = form.find('input[type=checkbox][value=1]').parent().addClass('rightAnswer');
		var inputs = form.find('input[type=radio][value=1]').parent().addClass('rightAnswer');
	}
	
	AnswerSubmit.prototype.submitHandler = function(userData, fn){
		var self=this;
		$('.'+this.selector).on('submit', function(e){
			e.preventDefault();
			$(this).find("button").prop('disabled',true);
			setTimeout(function(){$(this).parent().hide(200)}.bind(this),2000);
			self.showRight($(this));
			self.remains = self.remains - 1;
			self.checkAnswer (userData, $(this).serializeArray(), $(this).data('type'), $(this).data('answer'));
			if(self.remains==0) $('#finishTest').trigger('click');
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
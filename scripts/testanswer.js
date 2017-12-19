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
	
	AnswerSubmit.prototype.showRight = function(form){
		var inputs = form.find('input[type=checkbox][value=1]').parent().addClass('rightAnswer');
		var inputs = form.find('input[type=radio][value=1]').parent().addClass('rightAnswer');
	}
	
	AnswerSubmit.prototype.submitHandler = function(userData, fn){
		var self=this;
		$('.'+this.selector).on('submit', function(e){
			e.preventDefault();
			$(this).find('button').hide();
			setTimeout(function(){$(this).parent().hide(200)}.bind(this),3000);
			self.showRight($(this));
			self.length = self.length - 1;
			self.checkAnswer (userData, $(this).serializeArray(), $(this).data('type'), $(this).data('answer') );
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